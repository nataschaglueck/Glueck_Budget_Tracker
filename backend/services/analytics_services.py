from database.connection import connect
from services import finance_utils
from decimal import Decimal

def get_funds() :

    conn = connect()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            tt.transaction_type,
            t.amount
        FROM transactions t
        JOIN transaction_types tt
            ON t.transaction_type_id = tt.id
        """)
    
    columns = [col[0] for col in cur.description]
    transactions = [
        dict(zip(columns, row))
        for row in cur.fetchall()
    ]
    cur.close()
    conn.close()  

    total_amount = Decimal(0.00)

    for transaction in transactions :
        total_amount = total_amount + finance_utils.get_signed_decimal(transaction["transaction_type"], transaction["amount"])

    return {
    "success": True,
    "total_funds": float(total_amount)
    }, 200
