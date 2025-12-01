import {useNavigate} from "react-router-dom";
const Presupuestos = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Presupuestos</h1>
            <p>Creación y seguimiento de presupuestos para clientes.</p>

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

export default Presupuestos;
