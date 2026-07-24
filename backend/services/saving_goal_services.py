from database.connection import connect
from services import transaction_services

def get_saving_goals():
    
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT *
        FROM saving_goals 
        ORDER BY due_date
        """)
    
    columns = [col[0] for col in cur.description]
    saving_goals = [
        dict(zip(columns, row))
        for row in cur.fetchall()
    ]

    cur.close()
    conn.close()

    return saving_goals

def get_saving_goal_id(saving_goal):
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT id
        FROM saving_goals
        WHERE title = %s
        """,
        (saving_goal,)
    )

    result = cur.fetchone()

    cur.close()
    conn.close()

    if not result:
        return None
    
    return result[0]

def delete_saving_goal(savings_goal_id):

    if not verify_savings_goal_id(savings_goal_id):
        return {
        "success" : False,
        "error" : "Savings Goal not found"
        }, 400

    savings_transfers, savings_transfers_status = transaction_services.get_savings_transfers(savings_goal_id)

    conn = connect()
    cur = conn.cursor()

    if savings_transfers :

        for savings_transfer in savings_transfers:

            delete_link_response = transaction_services.delete_transfer_link_nc(
            cur,
            savings_transfer["id"]
            )

            if not delete_link_response["success"]:
                conn.rollback()
                cur.close()
                conn.close()
                return delete_link_response, 400
            
            delete_transaction_response = transaction_services.delete_transaction_nc(
            cur,
            savings_transfer["id"]
            )

            if not delete_transaction_response["success"]:
                conn.rollback()
                cur.close()
                conn.close()
                return delete_transaction_response, 400
        
    delete_goal_response = delete_saving_goal_nc(cur, savings_goal_id)

    if not delete_goal_response["success"]:
        conn.rollback()
        cur.close()
        conn.close()
        return delete_goal_response, 400
    
    conn.commit()
    cur.close()
    conn.close()

    return delete_goal_response, 200

        








def verify_saving_goal_data(data):
    fields = [
        "title",
        "goal_amount",
        "due_date"
    ]

    for field in fields:
        if field not in data or data[field] == "" or data[field] is None:
            return f"{field} is required"
    
   # Add checks for data types

    return None

def create_saving_goal(data):

    conn = connect()
    cur = conn.cursor()

    validation_error = verify_saving_goal_data(data)


    cur.execute(
        """
        INSERT INTO saving_goals
        (
            title,
            goal_amount,
            current_amount,
            due_date
        )
        VALUES (%s,%s,%s,%s)
        """,
        (
            data["title"],
            data["goal_amount"],
            0,
            data["due_date"]

        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return {"message": "Saving Goal created"}

def verify_savings_goal_id(id):
    
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT id
        FROM saving_goals
        WHERE id = %s
        """,
        (id,)
    )

    result = cur.fetchone()

    cur.close()
    conn.close()

    if not result:
        return None
    
    return result[0]

def change_saving_amount_nc(cur, goal_id, signed_amount):

    cur.execute("""
        SELECT current_amount
        FROM saving_goals
        WHERE id = %s
        """,
        (goal_id,)
    )

    result = cur.fetchone()

    if not result:

        return {
        "success" : False,
        "error" : "Saving Goal not found"
        }
    
    new_amount = result[0] - signed_amount # Expense = Transfer to Goal || Income = Withdrawal from Goal

    if new_amount < 0:
        return {
            "success" : False,
            "error" : "Savings Goal Funds cannot be below 0."
        }

    cur.execute("""
        UPDATE saving_goals
        SET current_amount = %s
        WHERE id = %s
        """,
        (new_amount, goal_id)
    )

    if cur.rowcount == 0:
        return {
            "success": False,
            "error": "Saving goal not updated."
        }

    return {
        "success" : True,
        "new_amount": new_amount
        }

def delete_saving_goal_nc(cur,savings_goal_id):

    cur.execute(
        """
        DELETE FROM saving_goals
        WHERE id = %s
        """,
        (savings_goal_id,)
    )

    if cur.rowcount == 0:
    
        return {
        "success" : False,
        "error" : "Savings Goal not found"
        }
    return {
        "success" : True,
        "deleted" : savings_goal_id
    }