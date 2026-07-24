import { useState } from "react";
import SavingsTransferForm from "../forms/SavingsTransferForm";

function CrerateSavingsTransferButton({ transfer_type_sign, savings_goal, onCreate }) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <button onClick={setShowForm}>
                {transfer_type_sign}
            </button>
            <SavingsTransferForm
                transfer_type_sign={transfer_type_sign}
                savings_goal={savings_goal}
                show={showForm}
                onCreate={onCreate}
                onClose={() => {
                    setShowForm(false);
                }}
            />
        </>
    );
}

export default CrerateSavingsTransferButton;