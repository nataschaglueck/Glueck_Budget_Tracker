

function TransactionTable({ transactions, onSelectTransaction }) {

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
                    {transactions.map((transaction) => (
                        <tr
                            key={transaction["id"]}
                            onClick={() => onSelectTransaction(transaction)}
                        >
                            <td>{transaction["transaction_date"]}</td>
                            <td>{transaction["transaction_type"]}</td>
                            <td>{transaction["title"]}</td>
                            <td>{transaction["category"]}</td>
                            <td>{transaction["amount"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TransactionTable;