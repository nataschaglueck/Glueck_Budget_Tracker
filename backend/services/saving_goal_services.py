from database.connection import connect

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
        


