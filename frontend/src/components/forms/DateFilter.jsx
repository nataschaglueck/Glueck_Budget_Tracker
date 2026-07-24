import { useState } from "react";

function DateFilter({
    defaultStartDate,
    defaultEndDate,
    onFilter,
}) {
    const [startDate, setStartDate] = useState(
        defaultStartDate
    );

    const [endDate, setEndDate] = useState(
        defaultEndDate
    );

    function handleSubmit(event) {
        event.preventDefault();

        onFilter(startDate, endDate);
    }

    return (
        <form
            className="date-filter"
            onSubmit={handleSubmit}
        >
            <div className="date-filter-field">
                <label htmlFor="start-date">
                    Start date
                </label>

                <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(event) =>
                        setStartDate(event.target.value)
                    }
                />
            </div>

            <div className="date-filter-field">
                <label htmlFor="end-date">
                    End date
                </label>

                <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(event) =>
                        setEndDate(event.target.value)
                    }
                />
            </div>

            <button
                type="submit"
                className="button button-primary"
            >
                Filter
            </button>
        </form>
    );
}

export default DateFilter;