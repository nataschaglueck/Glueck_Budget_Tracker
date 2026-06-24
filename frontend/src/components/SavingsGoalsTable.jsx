import { useEffect, useState } from "react";

function SavingsGoalsTable() {
    const [savings_goals, setSavingsGoals] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/saving_goals")
            .then((response) => response.json())
            .then((data) => setSavingsGoals(data))
            .catch((error) => console.error("Error loading savings goals:", error));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Goal Amount</th>
                    <th>Current Amount</th>
                    <th>Due Date</th>
                </tr>
            </thead>

            <tbody>
                {savings_goals.map((savings_goal) => (
                    <tr key={savings_goal[0]}>
                        <td>{savings_goal[1]}</td>
                        <td>{savings_goal[2]}</td>
                        <td>{savings_goal[3]}</td>
                        <td>{savings_goal[4]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SavingsGoalsTable;