import SavingsGoalPopup from "../popups/SavingsGoalPopup";


function SavingsGoalsTable({ savings_goals, setSelectedSavingsGoal }) {
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
        </>
    );
}

export default SavingsGoalsTable;