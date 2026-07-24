import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav >
            <Link className="nav-link" to="/">Dashboard</Link>
            <Link className="nav-link" to="/transactions">Transactions</Link>
            <Link className="nav-link" to="/savings-goals">Savings Goals</Link>
        </nav>
    );
}

export default Navbar;