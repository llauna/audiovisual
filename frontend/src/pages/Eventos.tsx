import {useNavigate} from "react-router-dom";

const Eventos = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Eventos</h1>
            <p>Listado y gestión de eventos.</p>

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

export default Eventos;
