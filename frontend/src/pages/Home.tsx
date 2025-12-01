import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();



    return (
        <div className="container mt-4">
            <h1>Bienvenido a Audiovisual</h1>
            <p>Gestiona eventos, almacenes, inventario, presupuestos y personal.</p>

            <div className="d-flex gap-3 mt-4">
                {/* Botón Volver */}
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/items")}
                >
                    Volver a Items
                </button>

            </div>
        </div>
    );
};

export default Home;
