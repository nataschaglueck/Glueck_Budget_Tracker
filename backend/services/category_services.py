from database.connection import connect

def get_category_id(category) :
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT id FROM categories WHERE category = %s
        """,
        (category,)
    )

    result = cur.fetchone()

    cur.close()
    conn.close()

    if result is None:
        return None

    return result[0]
    
