from flask import Blueprint, request
from services import analytics_services

analytics_bp = Blueprint(
    "analytics",
    __name__
)

@analytics_bp.route("/analytics/funds", methods=["GET"])
def get_funds():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    return analytics_services.get_funds(
        start_date=start_date,
        end_date=end_date,
    )
    
@analytics_bp.route("/analytics/categories/expenses", methods=["GET"])
def get_expenses_by_category():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    return analytics_services.get_category_breakdown(
        "Expense",
        start_date=start_date,
        end_date=end_date,
    )

@analytics_bp.route("/analytics/categories/income", methods=["GET"])
def get_income_by_category():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    return analytics_services.get_category_breakdown(
        "Income",
        start_date=start_date,
        end_date=end_date,
    )