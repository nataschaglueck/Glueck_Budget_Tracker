from flask import Blueprint, request
from services import saving_goal_services

saving_goals_bp = Blueprint(
    "saving_goals",
    __name__
)

@saving_goals_bp.route("/saving_goals", methods=["GET"])
def get_saving_goals():
    return saving_goal_services.get_saving_goals()
    
@saving_goals_bp.route("/saving_goals", methods=["POST"])
def create_saving_goals():
    data = request.json
    return saving_goal_services.create_saving_goal(data)

@saving_goals_bp.route("/saving_goals/<int:savings_goal_id>", methods=["DELETE"])
def delete_saving_goal(savings_goal_id):
    return saving_goal_services.delete_saving_goal(savings_goal_id)


    