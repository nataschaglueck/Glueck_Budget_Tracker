import SavingsGoalForm from "../components/SavingsGoalForm";
import SavingsGoalsTable from "../components/SavingsGoalsTable";

function SavingsGoals() {
    return (
        <>
            <h1>Savings Goals</h1>
            <SavingsGoalsTable />
            <SavingsGoalForm />
        </>
    );
}

export default SavingsGoals;