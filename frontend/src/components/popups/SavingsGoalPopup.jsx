function SavingsGoalPopup({ savings_goal, onClose }) {
    if (!savings_goal) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button
                    className="popup-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>{savings_goal.title}</h2>

                <p>
                    <strong>Due Date:</strong> {savings_goal.due_date}
                </p>

                <p>
                    <strong>Current Amount:</strong> {savings_goal.current_amount}
                </p>

                <p>
                    <strong>Goal Amount:</strong> {savings_goal.goal_amount}
                </p>

            </div>
        </div>
    );
}

export default SavingsGoalPopup;