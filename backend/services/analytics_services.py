from database.connection import connect
from services import finance_utils
from decimal import Decimal

def get_funds(start_date=None, end_date=None) :

    conn = connect()
    cur = conn.cursor()

    query = ("""
        SELECT
            tt.transaction_type,
            t.amount
        FROM transactions t
        JOIN transaction_types tt
            ON t.transaction_type_id = tt.id
        WHERE 1 = 1
        """)

    parameters = []

    if start_date:
            query += """
                AND t.transaction_date >= %s
            """
            parameters.append(start_date)
    
    if end_date:
            query += """
                AND t.transaction_date <= %s
            """
            parameters.append(end_date)
    
    cur.execute(query, parameters)
    
    columns = [col[0] for col in cur.description]
    transactions = [
        dict(zip(columns, row))
        for row in cur.fetchall()
    ]
    cur.close()
    conn.close()  

    total_amount = Decimal("0.00")

    for transaction in transactions :
        total_amount = total_amount + finance_utils.get_signed_decimal(transaction["transaction_type"], transaction["amount"])

    return {
    "success": True,
    "total_funds": float(total_amount)
    }, 200


def get_category_breakdown(
    transaction_type,
    start_date=None,
    end_date=None,
):
    conn = connect()
    cur = conn.cursor()

    try:
        query = """
            SELECT
                c.category,
                COALESCE(SUM(t.amount), 0) AS total_amount
            FROM transactions t
            JOIN transaction_types tt
                ON t.transaction_type_id = tt.id
            JOIN categories c
                ON t.category_id = c.id
            WHERE 
                c.category <> 'Savings' 
                AND tt.transaction_type = %s
        """

        parameters = [transaction_type]

        if start_date:
            query += """
                AND t.transaction_date >= %s
            """
            parameters.append(start_date)

        if end_date:
            query += """
                AND t.transaction_date <= %s
            """
            parameters.append(end_date)

        query += """
            GROUP BY c.id, c.category
            ORDER BY total_amount DESC
        """

        cur.execute(query, parameters)

        columns = [column[0] for column in cur.description]

        categories = [
            dict(zip(columns, row))
            for row in cur.fetchall()
        ]

        for category in categories:
            category["total_amount"] = float(
                category["total_amount"]
            )

        return {
            "success": True,
            "transaction_type": transaction_type,
            "category_breakdown": categories,
        }, 200

    except Exception as error:
        return {
            "success": False,
            "error": str(error),
        }, 500

    finally:
        cur.close()
        conn.close()