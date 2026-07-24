function DeleteSavingsGoalButton({ savings_goal_id, onDelete }) {
    const handleDelete = async () => {
        await fetch(`http://127.0.0.1:5000/saving_goals/${savings_goal_id}`, {
            method: "DELETE"
        });

        onDelete();
    };

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
}

export default DeleteSavingsGoalButton;