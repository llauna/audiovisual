import {useNavigate} from "react-router-dom";

const Almacenes = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Almacenes</h1>
            <p>Gestión de almacenes y su inventario.</p>

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

export default Almacenes;
