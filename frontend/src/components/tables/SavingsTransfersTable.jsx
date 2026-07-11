import { useEffect, useState } from "react";


function SavingsTransferTable({ savings_goal_id }) {
    const [savingsTransfers, setSavingsTransfers] = useState([]);


    useEffect(() => {
        fetch(`http://127.0.0.1:5000/transactions/savings_transfers/${savings_goal_id}`)
            .then((response) => response.json())
            .then((data) => setSavingsTransfers(data))
            .catch((error) => console.error("Error loading savings goals:", error));
    }, []);


    return (
        <>
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
                    {savingsTransfers.map((savingsTransfers) => (
                        <tr
                            key={savingsTransfers["id"]}
                        >
                            <td>{savingsTransfers["transaction_date"]}</td>
                            <td>{savingsTransfers["transaction_type"]}</td>
                            <td>{savingsTransfers["title"]}</td>
                            <td>{savingsTransfers["category"]}</td>
                            <td>{savingsTransfers["amount"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SavingsTransferTable;