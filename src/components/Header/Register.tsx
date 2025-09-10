import Form from "react-bootstrap/esm/Form";
import { useState } from "react";
import { isUsernameExists, isEmailExists, registerUser, loginUser } from "../../services/AuthServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { Header } from "./Header";

interface IUserModel {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [data, setData] = useState<IUserModel>({
        username: '',
        email: '',
        password: ''
    });

    const { login } = useAuth()!;

    const navigate = useNavigate();

    const [message, setMessage] = useState<string>('');

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.username === "" || data.email === "" || data.password === "") {
            setMessage("Please fill all the fields.");
            return;
        }

        // If username already taken
        if (await isUsernameExists(data.username)) {
            setMessage("Username already exists. Please choose another one.");
            return;
        }

        // If email already registered
        if (await isEmailExists(data.email)) {
            setMessage("Email already exists. Please choose another one.");
            return;
        }

        // addNewUser(data);
        await registerUser(data);
        setData({
            username: '',
            email: '',
            password: ''
        });
        setMessage("");

        // login and redirect to library
        const token = await loginUser(data.email, data.password);
        if (token) {
            login(token as string);
            // alert("User registered and logged in successfully!");
            navigate("/library");
        } else {
            navigate("/login");
        }
    }

    return (
        <>
            <Header />

            <div className="p-4 border rounded shadow-md max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit}>
                    <h3>Register Here</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Enter username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </Form.Group>

                    <button type="submit" className="btn btn-primary w-50 mx-auto d-block">
                        Register
                    </button>
                    {message && <p className="mt-3 text-red-500">{message}</p>}

                    <h4 className="mt-4 text-center">
                        Already have an account? Please log in.
                    </h4>
                    <Link to="/login" className="btn btn-secondary w-50 mx-auto d-block">
                        Log In
                    </Link>

                </form>
            </div>
        </>
    );
}

export default Register;