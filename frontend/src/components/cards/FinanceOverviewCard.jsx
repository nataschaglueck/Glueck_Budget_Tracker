function FinanceOverviewCard({ funds }) {
    const formattedFunds = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(funds);

    return (
        <div className="funds-card">
            <h3>Current Funds</h3>

            <p className="funds-amount">
                {formattedFunds}
            </p>
        </div>
    );
}

export default FinanceOverviewCard;