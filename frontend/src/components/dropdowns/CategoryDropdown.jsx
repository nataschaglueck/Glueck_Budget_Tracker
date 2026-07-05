import { useEffect, useState } from "react";

function CategoryDropdown({ value, onChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error loading categories:", error));
    }, []);

    return (
        <select value={value} onChange={onChange}>
            <option value="">Category</option>

            {categories.map((category) => (
                <option key={category.id} value={category.category}>
                    {category.category}
                </option>
            ))}
        </select>
    );

}

export default CategoryDropdown;