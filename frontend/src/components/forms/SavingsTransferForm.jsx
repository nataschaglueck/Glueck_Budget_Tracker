
import { useState } from "react";
import TransactionTypeDropdown from "../dropdowns/TransactionTypeDropdown";

function SavingsTransferForm({ savings_goal, onCreate }) {
    const [transaction_type, setTransactionType] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [transaction_date, setTransactionDate] = useState(new Date().toISOString().split("T")[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const transfer_data = {
            savings_goal_id: savings_goal.id,
            transaction_type: transaction_type,
            category: "Savings",
            title: title,
            amount: amount,
            transaction_date: transaction_date
        };

        const response = await fetch("http://127.0.0.1:5000/transactions/saving_transfer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transfer_data)
        });

        const result = await response.json();

        console.log(result);

        if (response.ok) {
            onCreate();

            setTransactionType("");
            setTitle("");
            setAmount("");
            setTransactionDate(new Date().toISOString().split("T")[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <TransactionTypeDropdown
                value={transaction_type}
                onChange={(e) => setTransactionType(e.target.value)}
            />
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <button type="submit">
                Create Transaction
            </button>
        </form>
    );
}

export default SavingsTransferForm;