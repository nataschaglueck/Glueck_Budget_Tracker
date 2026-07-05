import { useEffect, useState } from "react";
import TransactionTable from "../components/tables/TransactionsTable";
import TransactionPopup from "../components/popups/TransactionPopup";
import CreateTransactionFormButton from "../components/buttons/CreateTransactionFormButton";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const loadTransactions = () => {
        fetch("http://127.0.0.1:5000/transactions")
            .then((response) => response.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error("Error loading transactions:", error));
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <>
            <h1>Transactions</h1>
            <TransactionTable
                transactions={transactions}
                onSelectTransaction={setSelectedTransaction}
            />

            <TransactionPopup
                transaction={selectedTransaction}
                onClose={() => {
                    setSelectedTransaction(null);
                    loadTransactions();
                }}
            />

            <CreateTransactionFormButton
                onCreate={() => loadTransactions()}
            />
        </>
    );
}

export default Transactions;