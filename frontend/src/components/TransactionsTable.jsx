import { useEffect, useState } from "react";

function TransactionTable() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/transactions")
            .then((response) => response.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error("Error loading transactions:", error));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>

            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction[0]}>
                        <td>{transaction[2]}</td>
                        <td>{transaction[4]}</td>
                        <td>{transaction[1]}</td>
                        <td>{transaction[5]}</td>
                        <td>{transaction[3]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TransactionTable;