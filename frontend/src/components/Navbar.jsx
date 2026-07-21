import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav >
            <Link class="nav-link" to="/">Dashboard</Link>
            <Link class="nav-link" to="/transactions">Transactions</Link>
            <Link class="nav-link" to="/savings-goals">Savings Goals</Link>
        </nav>
    );
}

export default Navbar;