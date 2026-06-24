import { useState } from "react";

function TransactionForm() {
    const [transaction_type, setTransactionType] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [transaction_date, setTransactionDate] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const transactionData = {
            transaction_type: transaction_type,
            category: category,
            title: title,
            amount: amount,
            transaction_date: transaction_date
        };

        const response = await fetch("http://127.0.0.1:5000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionData)
        });

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

export default TransactionForm;