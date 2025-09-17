import { useAuth } from "../../AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserProvider";

export const Header = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const user = useUser();

    const handleLogOut = () => {
        auth?.logout();
        navigate("/login");
    }

    return (
        <header className="header d-flex justify-content-between align-items-center p-3 mb-3 border-bottom">
            <h1>The Book Cabinet</h1>

            <nav>
                <Link to="/" className="m-2">Home</Link>
                {auth?.authToken &&
                    <Link to="/library" className="m-2">Library</Link>
                }
            </nav>

            {auth?.authToken ? (
                <div className="d-flex align-items-center">
                    <div className="m-2"> {user?.user?.username} </div>
                    <button className="btn btn-danger" onClick={handleLogOut}>Log out</button>
                </div>

            ) : (
                <Link to="/login" className="btn btn-primary">Log in</Link>
            )}
        </header>
    );
}