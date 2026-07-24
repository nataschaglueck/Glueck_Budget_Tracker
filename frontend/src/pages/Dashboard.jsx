import { useEffect, useState } from "react";
import FinanceOverviewCard from "../components/cards/FinanceOverviewCard";
import DateFilter from "../components/forms/DateFilter";
import CategoryBreakdownCard from "../components/cards/CategoryBreakdownCard";

function Dashboard() {
    const defaultDates = getCurrentMonthDates();

    const [funds, setFunds] = useState(0);
    const [expenseCategories, setExpenseCategories] =
        useState([]);
    const [incomeCategories, setIncomeCategories] =
        useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadFunds();

        loadCategoryBreakdowns(
            defaultDates.startDate,
            defaultDates.endDate
        );
    }, []);

    async function loadFunds() {
        try {
            const response = await fetch(
                "http://127.0.0.1:5000/analytics/funds"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Could not load funds."
                );
            }

            setFunds(data.total_funds);
        } catch (error) {
            setError(error.message);
        }
    }

    async function loadCategoryBreakdowns(
        startDate,
        endDate
    ) {
        try {
            setError("");

            const queryParameters = new URLSearchParams({
                start_date: startDate,
                end_date: endDate,
            });

            const [
                expensesResponse,
                incomeResponse,
            ] = await Promise.all([
                fetch(
                    `http://127.0.0.1:5000/analytics/categories/expenses?${queryParameters}`
                ),
                fetch(
                    `http://127.0.0.1:5000/analytics/categories/income?${queryParameters}`
                ),
            ]);

            const [
                expensesData,
                incomeData,
            ] = await Promise.all([
                expensesResponse.json(),
                incomeResponse.json(),
            ]);

            if (!expensesResponse.ok) {
                throw new Error(
                    expensesData.error ||
                    "Could not load expense categories."
                );
            }

            if (!incomeResponse.ok) {
                throw new Error(
                    incomeData.error ||
                    "Could not load income categories."
                );
            }

            setExpenseCategories(
                expensesData.category_breakdown
            );

            setIncomeCategories(
                incomeData.category_breakdown
            );
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h1>Dashboard</h1>

            <FinanceOverviewCard funds={funds} />

            <DateFilter
                defaultStartDate={
                    defaultDates.startDate
                }
                defaultEndDate={
                    defaultDates.endDate
                }
                onFilter={loadCategoryBreakdowns}
            />

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <CategoryBreakdownCard title="Expenses Breakdown" categories={expenseCategories} />

            <CategoryBreakdownCard title="Income Breakdown" categories={incomeCategories} />
        </>
    );
}

function getCurrentMonthDates() {
    const today = new Date();

    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    const lastDay = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    );

    return {
        startDate: formatDate(firstDay),
        endDate: formatDate(lastDay),
    };
}

function formatDate(date) {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export default Dashboard;