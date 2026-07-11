from database.connection import connect
from services import category_services, transaction_type_services, saving_goal_services
from services import finance_utils

# -----------------------
# Main Public Functions
# Included in Routes
# -----------------------

# -------- GET --------

def get_transactions():
    
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            t.id,
            t.title,
            t.transaction_date,
            t.amount,
            tt.transaction_type,
            c.category
        FROM transactions t
        JOIN transaction_types tt
            ON t.transaction_type_id = tt.id
        JOIN categories c
            ON t.category_id = c.id
        ORDER BY t.transaction_date DESC
        """)
    
    columns = [col[0] for col in cur.description]
    transactions = [
        dict(zip(columns, row))
        for row in cur.fetchall()
    ]
    cur.close()
    conn.close()

    return transactions, 200

def get_transaction(transaction_id):
    
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            t.id,
            t.title,
            t.transaction_date,
            t.amount,
            tt.transaction_type,
            c.category
        FROM transactions t
        JOIN transaction_types tt
            ON t.transaction_type_id = tt.id
        JOIN categories c
            ON t.category_id = c.id
        WHERE t.id = %s
        """,
        (transaction_id,)
        )
    
    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()

        return {
            "success": False,
            "error": "Transaction not found"
        }, 404

    columns = [col[0] for col in cur.description]
    transaction = dict(zip(columns, row))

    cur.close()
    conn.close()

    return transaction, 200

# -------- POST --------


def create_transaction(data):

    conn = connect()
    cur = conn.cursor()

    create_response = create_transaction_nc(cur, data)

    if not create_response["success"] :
        
        conn.rollback()
        cur.close()
        conn.close()

        return create_response, 400
    
    conn.commit()

    cur.close()
    conn.close()

    return create_response, 201


def create_savings_transfer(data):
    
    conn = connect()
    cur = conn.cursor()

    transaction_response = create_transaction_nc(cur, data)
    
    if not transaction_response["success"]:
        conn.rollback()
        cur.close()
        conn.close()
        return transaction_response, 400
    
    transaction_id = transaction_response["transaction_id"]
    savings_goal_id = data["savings_goal_id"]

    transaction_amount = finance_utils.get_signed_decimal(data["transaction_type"], data["amount"])

    update_goal_response = saving_goal_services.change_saving_amount_nc(cur, savings_goal_id, transaction_amount)

    if not update_goal_response["success"]:
        conn.rollback()
        cur.close()
        conn.close()
        return update_goal_response, 400      

    link_transfer_response = create_transfer_link_nc(cur, transaction_id, savings_goal_id)  

    if not link_transfer_response["success"]:
        conn.rollback()
        cur.close()
        conn.close()
        return link_transfer_response, 400 

    conn.commit()

    cur.close()
    conn.close()

    return transaction_response, 201

# -------- DELETE --------

       
def delete_transaction(transaction_id):
    
    transaction, transaction_status = get_transaction(transaction_id)
    savings_goal_id = get_savings_goal_id(transaction_id)

    if transaction_status != 200:
        return transaction, transaction_status

    conn = connect()
    cur = conn.cursor()


    delete_response = delete_transaction_nc(cur, transaction_id)

    if not delete_response["success"]:
        conn.rollback()

        cur.close()
        conn.close()

        return delete_response, 400

    
    if not savings_goal_id :
        conn.commit()

        cur.close()
        conn.close()
         
        return {
        "success" : True,
        "message" : "Transaction deleted"
        }, 200
    
    transaction_amount = finance_utils.get_signed_decimal(transaction["transaction_type"], transaction["amount"])
    undo_transaction_amount = -transaction_amount

    update_goal_response = saving_goal_services.change_saving_amount_nc(cur, savings_goal_id, undo_transaction_amount)

    if not update_goal_response["success"] :
        conn.rollback()

        cur.close()
        conn.close()

        return update_goal_response, 400
    
    delete_link_response = delete_transfer_link_nc(cur, transaction_id)

    if not delete_link_response["success"] : 
        conn.rollback()

        cur.close()
        conn.close()

        return update_goal_response, 400
    
    conn.commit()
    
    cur.close()
    conn.close()

    return {
        "success" : True,
        "message" : "Transaction deleted"
        }, 200

       


# -----------------------
# Helper Functions
# No Commit - Used by service functions
# -----------------------

# -------- NO COMMIT --------

def create_transaction_nc(cur, data):


    validation_response = verify_transaction_data(data)

    if not validation_response["success"]:
        return validation_response
    
    category_id = validation_response["category_id"]
    transaction_type_id = validation_response["transaction_type_id"]

    cur.execute(
    """
    INSERT INTO transactions
    (
        title,
        transaction_date,
        amount,
        transaction_type_id,
        category_id
    )
    VALUES (%s,%s,%s,%s,%s)
    RETURNING id
    """,
    (
        data["title"],
        data["transaction_date"],
        data["amount"],
        transaction_type_id,
        category_id
    )
    
    )

    response = cur.fetchone()

    if not response: 
        return {
            "success" : False,
            "error": "Transaction insert failed"
        }

    return {
        "success" : True,
        "transaction_id" : response[0]
    }

def create_transfer_link_nc(cur, transaction_id, savings_goal_id):
    
    cur.execute(
        """
        INSERT INTO savings_transfers
        (
            transaction_id,
            savings_goal_id
        )
        VALUES (%s,%s)
        RETURNING transaction_id
        """,
        (
            transaction_id,
            savings_goal_id
        )
    )

    response = cur.fetchone()

    if not response:
        return {
            "success" : False,
            "error" : "Transfer could not be added to Savings Goal."
        }
    
    return {
        "success" : True,
        "transaction_id" : response[0]
    }

def delete_transaction_nc(cur, transaction_id):
    
    cur.execute(
        """
        DELETE FROM transactions
        WHERE id = %s
        """,
        (transaction_id,)
    )

    if cur.rowcount == 0:
    
        return {
        "success" : False,
        "error" : "Transaction not found"
        }
    return {
        "success" : True,
        "deleted" : transaction_id
    }

def delete_transfer_link_nc(cur, transaction_id):
    
    cur.execute(
        """
        DELETE FROM savings_transfers
        WHERE transaction_id = %s
        """,
        (transaction_id,)
    )

    if cur.rowcount == 0:
        return {
        "success" : False,
        "error" : "Transfer Link not found"
        }

    return {
        "success" : True,
        "message" : "Transfer Link deleted"
        }

# ------- VERIFY --------

def get_savings_transfers(savings_goal_id) :

    transactions = []
    
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            transaction_id
        FROM savings_transfers
        WHERE savings_goal_id = %s
        """,
        (savings_goal_id,)
        )
    
    rows = cur.fetchall()

    cur.close()
    conn.close()

    for row in rows:
        transaction, status = get_transaction(row[0])

        if status == 200:
            transactions.append(transaction)

    return transactions, 200
    
def get_savings_transfer_id(transaction_id) :
    
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id
        FROM savings_transfers
        WHERE transaction_id = %s
        """,
        (transaction_id,)
        )
    
    row = cur.fetchone()
    
    cur.close()
    conn.close()

    if not row:
        return False
    
    return row[0]

def verify_transaction_data(data):
    fields = [
        "title",
        "transaction_date",
        "amount",
        "transaction_type",
        "category"
    ]

    for field in fields:
        if field not in data or data[field] == "" or data[field] is None:
            return {
                "success" : False,
                "error" : f"{field} is required"
            }
    
    category_id = category_services.get_category_id(data['category'])

    if category_id is None:
        return {
            "success" : False,
            "error": "Category does not exist"
            }
    
    transaction_type_id = transaction_type_services.get_transaction_type_id(data['transaction_type'])

    if transaction_type_id is None:
        return {
            "success" : False,
            "error": "Transaction type does not exist"
            }

    
   # Add checks for data types

    return {
        "success" : True,
        "category_id" : category_id,
        "transaction_type_id" : transaction_type_id
    }

def get_savings_goal_id(transaction_id):
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            savings_goal_id
        FROM savings_transfers
        WHERE transaction_id = %s
        """,
        (transaction_id,)
        )
    
    row = cur.fetchone()
    
    cur.close()
    conn.close()

    if not row:
        return False
    
    return row[0]