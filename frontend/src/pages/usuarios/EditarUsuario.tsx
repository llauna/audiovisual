import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../services/auth";

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

const EditarUsuario = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`, {
                    headers: getAuthHeader(),
                });
                if (!res.ok) throw new Error("Error al cargar el usuario");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            }
        };
        fetchUser();
    }, [id]);

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: getAuthHeader(),
                body: JSON.stringify(user),
            });
            if (!res.ok) throw new Error("Error al guardar cambios");
            navigate("/personal");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    };

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!user) return <p>Cargando...</p>;

    return (
        <div className="container mt-4" style={{ maxWidth: "700px" }}>
            <h1 className="mb-4">Editar Usuario</h1>

            <div className="mb-3">
                <label>Nombre completo</label>
                <input
                    type="text"
                    className="form-control"
                    value={user.nombreCompleto}
                    onChange={(e) => setUser({ ...user, nombreCompleto: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={user.email}
                    disabled
                />
                <small className="text-muted">El email no puede ser modificado</small>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Puesto</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.puesto}
                        onChange={(e) => setUser({ ...user, puesto: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Departamento</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.departamento}
                        onChange={(e) => setUser({ ...user, departamento: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Fecha de contratación</label>
                    <input
                        type="date"
                        className="form-control"
                        value={user.fechaContratacion?.split("T")[0]}
                        onChange={(e) => setUser({ ...user, fechaContratacion: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.telefono}
                        onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label>Dirección</label>
                <input
                    type="text"
                    className="form-control"
                    value={user.direccion}
                    onChange={(e) => setUser({ ...user, direccion: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>Rol</label>
                <select
                    className="form-select"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value as User["role"] })}
                >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                </select>
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-secondary" onClick={() => navigate("/personal")}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default EditarUsuario;
