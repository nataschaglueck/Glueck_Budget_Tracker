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

