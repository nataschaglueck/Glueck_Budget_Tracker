import {
    BarChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function CategoryBreakdownCard({
    categories,
    title = "Category Breakdown",
}) {
    const chartData = categories.map((category) => ({
        category: category.category,
        amount: Number(category.total_amount),
    }));

    return (
        <div className="category-breakdown">
            <h2>{title}</h2>

            {chartData.length === 0 ? (
                <p>No category data available.</p>
            ) : (
                <div className="category-breakdown-chart">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 30,
                                left: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="category"
                                interval={0}
                                angle={-35}
                                textAnchor="end"
                                height={80}
                            />

                            <YAxis
                                tickFormatter={formatCurrency}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatCurrency(value),
                                    "Amount",
                                ]}
                            />

                            <Bar
                                dataKey="amount"
                                name="Amount"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}

export default CategoryBreakdownCard;