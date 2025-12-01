import {useNavigate} from "react-router-dom";
const Personal = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Personal</h1>
            <p>Gestión de personal, nóminas y vacaciones.</p>

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

export default Personal;
