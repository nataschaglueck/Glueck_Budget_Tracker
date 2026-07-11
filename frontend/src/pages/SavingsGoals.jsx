import { useEffect, useState } from "react";
import SavingsGoalForm from "../components/forms/SavingsGoalForm";
import SavingsGoalsTable from "../components/tables/SavingsGoalsTable";
import SavingsGoalPopup from "../components/popups/SavingsGoalPopup";

function SavingsGoals() {
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
            <h1>Savings Goals</h1>
            <SavingsGoalsTable
                savings_goals={savings_goals}
                setSelectedSavingsGoal={setSelectedSavingsGoal}
            />
            <SavingsGoalPopup
                savings_goal={selectedSavingsGoal}
                onClose={() => setSelectedSavingsGoal(null)}
            />
            <SavingsGoalForm />
        </>
    );
}

export default SavingsGoals;