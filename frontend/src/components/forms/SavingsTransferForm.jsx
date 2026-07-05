
import { useState } from "react";

function SavingsTransferForm() {
    const [transaction_type, setTransactionType] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [transaction_date, setTransactionDate] = useState("");
    const [savings_goals, setSavingsGoals] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const transferData = {
            savings_goal: savings_goal,
            transaction_type: transaction_type,
            category: category,
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

        useEffect(() => {
            fetch("http://127.0.0.1:5000/saving_goals")
                .then((response) => response.json())
                .then((data) => setSavingsGoals(data))
                .catch((error) => console.error("Error loading savings goals:", error));
        }, []);

        const result = await response.json();

        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>Transaction Type</label>

                <select
                    value={transaction_type}
                    onChange={(e) => setTransactionType(e.target.value)}
                >
                    <option value="">Select a type</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>
            <div>
                <label>Transaction Type</label>

                <select
                    value={transaction_type}
                    onChange={(e) => setTransactionType(e.target.value)}
                >
                    <option value="">Select a type</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>

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

            <div>
                <label>Category</label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a type</option>
                    <option value="Salary">Salary</option>
                    <option value="Housing">Housing</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Education">Education</option>
                </select>
            </div>

            <div>
                <label>Transaction Date</label>

                <input
                    type="date"
                    value={transaction_date}
                    onChange={(e) => setTransactionDate(e.target.value)}
                />
            </div>

            <button type="submit">
                Create Transaction
            </button>
        </form>
    );
}

export default SavingsTransferForm;