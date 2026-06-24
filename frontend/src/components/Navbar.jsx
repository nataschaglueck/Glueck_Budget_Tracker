import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/savings-goals">Savings Goals</Link>
        </nav>
    );
}

export default Navbar;