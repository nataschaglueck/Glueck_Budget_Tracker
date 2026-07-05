import { useState } from "react";

function SavingsGoalForm() {
    const [title, setTitle] = useState("");
    const [goal_amount, setAmount] = useState("");
    const [due_date, setDueDate] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const savings_goal_data = {
            title: title,
            goal_amount: goal_amount,
            due_date: due_date
        };

        const response = await fetch("http://127.0.0.1:5000/saving_goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(savings_goal_data)
        });

        const result = await response.json();

        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Goal Amount</label>
                <input
                    type="number"
                    value={goal_amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>


            <div>
                <label>Due Date</label>

                <input
                    type="date"
                    value={due_date}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <button type="submit">
                Create Savings Goal
            </button>
        </form>
    );
}

export default SavingsGoalForm;