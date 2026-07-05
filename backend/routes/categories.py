from flask import Blueprint, request
from services import category_services

categories_bp = Blueprint(
    "categories",
    __name__
)

@categories_bp.route("/categories", methods=["GET"])
def get_categories():
    return category_services.get_categories()
    