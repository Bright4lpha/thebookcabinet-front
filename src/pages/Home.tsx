import { useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />

            <div className="container text-center">
                <h1>Welcome to The Book Cabinet</h1>
                <p>Your personal library management application.</p>
            </div>
        </div>
    );
};
