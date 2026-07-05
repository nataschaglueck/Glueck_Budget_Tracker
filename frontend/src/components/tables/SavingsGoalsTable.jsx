import { useEffect, useState } from "react";
import SavingsGoalPopup from "../popups/SavingsGoalPopup";


function SavingsGoalsTable() {
    const [savings_goals, setSavingsGoals] = useState([]);
    const [selectedSavingsGoal, setSelectedSavingsGoal] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/saving_goals")
            .then((response) => response.json())
            .then((data) => setSavingsGoals(data))
            .catch((error) => console.error("Error loading savings goals:", error));
    }, []);

    return (
        <>
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
                        <tr
                            key={savings_goal["id"]}
                            onClick={() => setSelectedSavingsGoal(savings_goal)}
                        >
                            <td>{savings_goal["title"]}</td>
                            <td>{savings_goal["goal_amount"]}</td>
                            <td>{savings_goal["current_amount"]}</td>
                            <td>{savings_goal["due_date"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <SavingsGoalPopup
                savings_goal={selectedSavingsGoal}
                onClose={() => setSelectedSavingsGoal(null)}
            />
        </>
    );
}

export default SavingsGoalsTable;