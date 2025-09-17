import Form from "react-bootstrap/esm/Form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe, loginUser } from "../../services/AuthServices";
import { useAuth } from "../../AuthProvider";
import { Header } from "./Header";
import { useUser } from "../../UserProvider";

interface ILoginModel {
    email: string;
    password: string;
}

const Login = () => {
    const [data, setData] = React.useState<ILoginModel>({
        email: '',
        password: ''
    });

    const { login } = useAuth()!;
    const { setUser } = useUser()!;
    const navigate = useNavigate();

    const [message, setMessage] = React.useState<string>('');

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (data.email === "" || data.password === "") {
            setMessage("Please fill all the fields.");
            return;
        }

        const token = await loginUser(data.email, data.password);
        if (token) {
            login(token as string);
            // alert("User logged in successfully!");

            setUser(await getMe());

            navigate("/library");
        } else {
            setMessage("Invalid email or password.");
            return;
        }
        setData({
            email: '',
            password: ''
        });
        setMessage("");
    }

    return (
        <>
            <Header />
            <div className="login-container p-4 border rounded shadow-md max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit}>
                    <h3>Login Here</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </Form.Group>

                    <button type="submit" className="btn btn-primary w-50 mx-auto d-block">
                        Log In
                    </button>
                    {message && <p className="mt-3 text-red-500">{message}</p>}

                    <h4 className="mt-4 text-center">
                        Don't have an account? Please register.
                    </h4>
                    <Link to="/register" className="btn btn-secondary w-50 mx-auto d-block">
                        Register
                    </Link>

                </form>
            </div>
        </>
    );
}

export default Login;