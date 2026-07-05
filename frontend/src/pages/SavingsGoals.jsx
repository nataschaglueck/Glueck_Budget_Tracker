import SavingsGoalForm from "../components/forms/SavingsGoalForm";
import SavingsGoalsTable from "../components/tables/SavingsGoalsTable";

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