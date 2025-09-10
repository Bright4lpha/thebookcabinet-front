import { Header } from "../components/Header/Header";

export const Home = () => {
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
