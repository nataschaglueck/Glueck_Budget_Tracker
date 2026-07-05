from flask import Blueprint, request
from services import transaction_type_services

transaction_types_bp = Blueprint(
    "transaction_types",
    __name__
)

@transaction_types_bp.route("/transaction_types", methods=["GET"])
def get_transaction_types():
    return transaction_type_services.get_transaction_types()
    