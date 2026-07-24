import SavingsTransferForm from "../forms/SavingsTransferForm";
import SavingsTransferTable from "../tables/SavingsTransfersTable";
import CrerateSavingsTransferButton from "../buttons/CreateSavingsTransferButton";
import DeleteSavingsGoalButton from "../buttons/DeleteSavingsGoalButton";

function SavingsGoalPopup({ savings_goal, onClose }) {
    if (!savings_goal) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
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

                <CrerateSavingsTransferButton
                    transfer_type_sign="+"
                    savings_goal={savings_goal}
                    onCreate={onClose}
                />

                <CrerateSavingsTransferButton
                    transfer_type_sign="-"
                    savings_goal={savings_goal}
                    onCreate={onClose}
                />

                <SavingsTransferTable
                    savings_goal_id={savings_goal.id}
                />

                <DeleteSavingsGoalButton
                    savings_goal_id={savings_goal.id}
                    onDelete={onClose}
                />


            </div>
        </div>
    );
}

export default SavingsGoalPopup;