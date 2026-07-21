import { useEffect, useState } from "react";
import FinanceOverviewCard from "../components/cards/FinanceOverviewCard";


function Dashboard() {
    const [funds, setFunds] = useState(0);

    useEffect(() => {
        async function loadFunds() {
            const response = await fetch("http://127.0.0.1:5000/analytics/funds");
            const data = await response.json();

            if (response.ok) {
                setFunds(data.total_funds);
            }
        }

        loadFunds();
    }, []);
    return (
        <>
            <h1>Dashboard</h1>
            <FinanceOverviewCard funds={funds} />
        </>
    );
}

export default Dashboard;