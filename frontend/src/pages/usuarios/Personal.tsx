import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader, validarToken } from "../../services/auth";

interface User {
    _id: string;
    nombreCompleto: string;
    email: string;
    role: "admin" | "editor" | "viewer";
    puesto: string;
    departamento: string;
    fechaContratacion: string;
    telefono: string;
    direccion: string;
}

const Personal = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentUserRole, setCurrentUserRole] = useState<"admin" | "editor" | "viewer">("viewer");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener rol del usuario logueado
                const tokenData = await validarToken();
                setCurrentUserRole(tokenData.user.role);

                // Obtener lista de usuarios
                const response = await fetch("/api/users", {
                    headers: getAuthHeader(),
                });

                if (!response.ok) {
                    let errorMessage = `Error ${response.status}: No se pudo cargar la lista de usuarios`;
                    try {
                        const errorData = await response.json();
                        if (errorData?.mensaje) {
                            errorMessage = errorData.mensaje;
                        }
                    } catch {
                        // Si no es JSON válido, mantenemos el mensaje por defecto
                    }
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido al cargar los usuarios");
                console.error("Error al cargar los usuarios:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const canCreate = currentUserRole === "admin";
    const canEdit = currentUserRole === "admin";
    const canDelete = currentUserRole === "admin";

    const handleDelete = async (userId: string) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
                headers: getAuthHeader(),
            });

            if (!response.ok) throw new Error("Error al eliminar el usuario");

            setUsers(users.filter((user) => user._id !== userId));
            setSuccess("Usuario eliminado correctamente");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            setError("No se pudo eliminar el usuario");
            setTimeout(() => setError(""), 3000);
        }
    };

    if (loading) return <div className="container mt-5">Cargando usuarios...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Gestión de Usuarios</h1>
                {canCreate && (
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/personal/nuevo")}
                    >
                        Nuevo Usuario
                    </button>
                )}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Puesto</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.nombreCompleto}</td>
                            <td>{user.email}</td>
                            <td>
                                    <span className={`badge ${
                                        user.role === "admin" ? "bg-danger" :
                                            user.role === "editor" ? "bg-primary" : "bg-secondary"
                                    }`}>
                                        {user.role}
                                    </span>
                            </td>
                            <td>{user.puesto}</td>
                            <td>{user.departamento}</td>
                            <td>
                                <div className="btn-group" role="group">
                                    {canEdit && (
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => navigate(`/personal/editar/${user._id}`)}
                                        >
                                            Editar
                                        </button>
                                    )}
                                    {canDelete && (
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Personal;
