
import { useState } from "react";

function SavingsTransferForm({
    transfer_type_sign,
    savings_goal,
    onCreate,
    onClose,
    show,
}) {
    const [amount, setAmount] = useState("");
    const [transaction_date, setTransactionDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    if (!show) {
        return null;
    }

    function getTransferDetails() {
        if (transfer_type_sign === "-") {
            return {
                transaction_type: "Income",
                title: `Withdrawal from ${savings_goal["title"]}`,
            };
        }

        if (transfer_type_sign === "+") {
            return {
                transaction_type: "Expense",
                title: `Transfer to ${savings_goal["title"]}`,
            };
        }

        throw new Error(
            `Invalid transfer sign: ${transfer_type_sign}`
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const transferDetails = getTransferDetails();

            const transfer_data = {
                savings_goal_id: savings_goal["id"],
                transaction_type:
                    transferDetails.transaction_type,
                category: "Savings",
                title: transferDetails.title,
                amount: amount,
                transaction_date: transaction_date,
            };

            const response = await fetch(
                "http://127.0.0.1:5000/transactions/saving_transfer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(transfer_data),
                }
            );

            const result = await response.json();

            console.log(result);

            if (!response.ok) {
                throw new Error(
                    result.error ||
                    "Could not create savings transfer."
                );
            }

            onCreate();

            setAmount("");
            setTransactionDate(
                new Date().toISOString().split("T")[0]
            );

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const transferDetails = getTransferDetails();

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button
                    type="button"
                    className="popup-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <form onSubmit={handleSubmit}>
                    <h2>{transferDetails.title}</h2>

                    <div>
                        <label htmlFor="transfer-amount">
                            Amount
                        </label>

                        <input
                            id="transfer-amount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={amount}
                            onChange={(event) =>
                                setAmount(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button type="submit">
                        {transfer_type_sign === "+"
                            ? "Transfer"
                            : "Withdraw"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SavingsTransferForm;