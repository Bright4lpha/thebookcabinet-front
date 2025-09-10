import React, { useEffect } from "react";
import { Books } from "../components/Book/Books";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const Library: React.FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.authToken) {
            navigate("/login");
        }
    }, [auth, navigate]);

    return (
        <>
            <Header />
            <Books />
        </>
    );
};
