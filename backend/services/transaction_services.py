from database.connection import connect
from services import category_services, transaction_type_services, saving_goal_services


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
            return f"{field} is required"
    
   # Add checks for data types

    return None


def create_transaction(data):

    conn = connect()
    cur = conn.cursor()

    validation_error = verify_transaction_data(data)

    if validation_error:
        return {
            "success" : False,
            "error" : validation_error
            }, 400

    category_id = category_services.get_category_id(data['category'])

    if category_id is None:
        return {
            "success" : False,
            "error": "Category does not exist"
            }, 400

    transaction_type_id = transaction_type_services.get_transaction_type_id(data['transaction_type'])

    if transaction_type_id is None:
        return {
            "success" : False,
            "error": "Transaction type does not exist"
            }, 400


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
    transaction_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "success" : True,
        "transaction_id": transaction_id
        }, 201


def create_savings_transfer(data):

    saving_goal_id = saving_goal_services.get_saving_goal_id(data[saving_goal])

    if not saving_goal_id:
        return {
            "success" : False,
            "error" : "Saving goal does not exist."
        }, 400

    transaction = create_transaction(data)
    
    if not transaction["success"]:
        return transaction
    
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO savings_transfers
        (
            transaction_id,
            savings_goal_id
        )
        VALUES (%s,%s)
        RETURNING id
        """,
        (
            transaction["transaction_id"],
            saving_goal_id
        )
    )
    saving_transfer_id = cur.fetchone()[0]

    return {
        "sucess" : True,
        "saving_transfer_id" : saving_transfer_id
    }, 201
       
def delete_transaction(transaction_id):
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM transactions
        WHERE id = %s
        """,
        (transaction_id,)
    )
    conn.commit()

    if cur.rowcount == 0:
        cur.close()
        conn.close()
        return {
        "sucess" : False,
        "error" : "Transaction not found"
        }, 404

    cur.close()
    conn.close()

    return {
        "sucess" : True,
        "message" : "Transaction deleted"
        }, 200




    

