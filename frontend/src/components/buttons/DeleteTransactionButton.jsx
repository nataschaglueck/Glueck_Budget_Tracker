function DeleteTransactionButton({ transactionId, onDelete }) {
    const handleDelete = async () => {
        await fetch(`http://127.0.0.1:5000/transactions/${transactionId}`, {
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

export default DeleteTransactionButton;