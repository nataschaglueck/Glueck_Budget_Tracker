import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionsTable";

function Transactions() {
    return (
        <>
            <h1>Transactions</h1>
            <TransactionTable />
            <TransactionForm />
        </>
    );
}

export default Transactions;