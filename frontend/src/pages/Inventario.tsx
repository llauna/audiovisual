import {useNavigate} from "react-router-dom";
const Inventario = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Inventario</h1>
            <p>Control de materiales y equipos.</p>

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

export default Inventario;
