import { Link, useNavigate} from "react-router-dom";
import "../assets/styles/Navbar.css";
import logo from "../assets/react.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/home">
                    <img src={logo} alt="Logo" width="30" height="30" />
                    Audiovisual
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Lista de enlaces (izquierda/centro) */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/eventos">Eventos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/almacenes">Almacenes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/inventario">Inventario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/presupuestos">Presupuestos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/personal">Personal</Link>
                        </li>
                    </ul>

                    {/* Botón de logout (alineado a la derecha dentro del collapse) */}
                    <div className="d-flex">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
