import { useState } from "react";
import TransactionForm from "../forms/TransactionForm";

function CreateTransactionFormButton({ onCreate }) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <button onClick={setShowForm}>
                +
            </button>
            <TransactionForm
                show={showForm}
                onCreate={onCreate}
                onClose={() => {
                    setShowForm(false);
                }}
            />
        </>
    );
}

export default CreateTransactionFormButton;