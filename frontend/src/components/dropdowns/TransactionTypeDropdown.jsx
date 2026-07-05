import { useEffect, useState } from "react";

function TransactionTypeDropdown({ value, onChange }) {
    const [transaction_types, setTransactionTypes] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/transaction_types")
            .then((response) => response.json())
            .then((data) => setTransactionTypes(data))
            .catch((error) => console.error("Error loading transaction types:", error));
    }, []);

    return (
        <select value={value} onChange={onChange}>
            <option value="">Transaction Types</option>

            {transaction_types.map((transaction_types) => (
                <option key={transaction_types.id} value={transaction_types.transaction_type}>
                    {transaction_types.transaction_type}
                </option>
            ))}
        </select>
    );

}

export default TransactionTypeDropdown;