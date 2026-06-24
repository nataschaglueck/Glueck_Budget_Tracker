from database.connection import connect


def get_transaction_type_id(transaction_type) :
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT id FROM transaction_types WHERE transaction_type = %s
        """,
        (transaction_type,)
    )

    result = cur.fetchone()

    cur.close()
    conn.close()

    if result is None:
        return None

    return result[0]