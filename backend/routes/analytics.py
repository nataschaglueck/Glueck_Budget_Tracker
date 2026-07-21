from flask import Blueprint, request
from services import analytics_services

analytics_bp = Blueprint(
    "analytics",
    __name__
)

@analytics_bp.route("/analytics/funds", methods=["GET"])
def get_funds():
    return analytics_services.get_funds()
    