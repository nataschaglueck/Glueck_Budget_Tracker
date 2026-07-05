import DeleteTransactionButton from "../buttons/DeleteTransactionButton";

function TransactionPopup({ transaction, onClose }) {
    if (!transaction) {
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

                <h2>{transaction.title}</h2>

                <p>
                    <strong>Date:</strong> {transaction.transaction_date}
                </p>

                <p>
                    <strong>Amount:</strong> {transaction.amount}
                </p>

                <p>
                    <strong>Type:</strong> {transaction.transaction_type}
                </p>

                <p>
                    <strong>Category:</strong> {transaction.category}
                </p>
                <DeleteTransactionButton
                    transactionId={transaction.id}
                    onDelete={onClose}
                />
            </div>
        </div>
    );
}

export default TransactionPopup;