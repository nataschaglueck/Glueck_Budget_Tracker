from flask import Blueprint, request
from services import transaction_services

transactions_bp = Blueprint(
    "transactions",
    __name__
)

@transactions_bp.route("/transactions", methods=["GET"])
def get_transactions():
    return transaction_services.get_transactions()
    
@transactions_bp.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.json
    return transaction_services.create_transaction(data)
    
@transactions_bp.route("/transactions/saving_transfer", methods=["POST"])
def create_savings_transfer():
    data = request.json
    return transaction_services.create_savings_transfer(data)

@transactions_bp.route("/transactions/<int:transaction_id>", methods=["DELETE"])
def delete_transaction(transaction_id):
    return transaction_services.delete_transaction(transaction_id) 

@transactions_bp.route("/transactions/savings_transfers/<int:savings_goal_id>", methods=["GET"])
def get_savings_transfers(savings_goal_id):
    return transaction_services.get_savings_transfers(savings_goal_id)
    