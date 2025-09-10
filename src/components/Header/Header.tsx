import { useAuth } from "../../AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        auth?.logout();
        navigate("/login");
    }

    return (
        <header className="header d-flex justify-content-between align-items-center p-3 mb-3 border-bottom">
            <h1>The Book Cabinet</h1>

            {auth?.authToken ? (
                <button className="btn btn-danger" onClick={handleLogOut}>Log out</button>
            ) : (
                <Link to="/login" className="btn btn-primary">Log in</Link>
            )}
        </header>
    );
}