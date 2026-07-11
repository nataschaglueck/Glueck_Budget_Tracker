from decimal import Decimal

def get_signed_decimal(transaction_type, amount):

    amount = Decimal(str(amount))

    if transaction_type == "Expense":
        return -amount
    
    
    return amount
