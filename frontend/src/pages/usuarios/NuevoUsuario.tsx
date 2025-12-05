import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../../services/auth";

interface User {
    username: string;
    nombreCompleto: string;
    email: string;
    role: "admin" | "editor" | "viewer";
    puesto: string;
    departamento: string;
    fechaContratacion: string;
    telefono: string;
    direccion: string;
    password: string;
}

const NuevoUsuario = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        username: "",
        nombreCompleto: "",
        email: "",
        role: "viewer",
        puesto: "",
        departamento: "",
        fechaContratacion: "",
        telefono: "",
        direccion: "",
        password: ""
    });


    const handleSave = async () => {
        try {
            const res = await fetch(`/api/users`, {
                method: "POST",
                headers: getAuthHeader(),
                body: JSON.stringify(user),
            });
            if (!res.ok) throw new Error("Error al crear usuario");
            navigate("/personal");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "700px" }}>
            <h1 className="mb-4">Nuevo Usuario</h1>

            <div className="mb-3">
                <label>Nombre de usuario</label>
                <input
                    type="text"
                    className="form-control"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </div>

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
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label>Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
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
                        value={user.fechaContratacion}
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
                    Crear Usuario
                </button>
            </div>
        </div>
    );
};

export default NuevoUsuario;
