// src/router/index.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Items from "../pages/Items";
import EditarUsuario from "../pages/usuarios/EditarUsuario";
import NuevoUsuario from "../pages/usuarios/NuevoUsuario";
import PrivateRoute from "./PrivateRoute.tsx";

function AppRoutes() {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
    const location = useLocation();

    return (
        <>
            {/* Mostrar Navbar solo si está autenticado y NO está en /login */}
            {isAuthenticated && location.pathname !== "/login" && <Navbar />}
            <Routes>
                <Route path = "/personal/nuevo" element={
                    <PrivateRoute>
                        <NuevoUsuario />
                    </PrivateRoute>
                }>
                </Route>
            </Routes>
            <Routes>
                <Route path = "/personal/editar/:id" element={
                    <PrivateRoute>
                        <EditarUsuario />
                    </PrivateRoute>
                }>
                </Route>
            </Routes>

            <Routes>
                {/* Redirigir raíz a /login */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Si ya está logueado y entra a /login, mandarlo a /items */}
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/items" /> : <Login />}
                />

                {/* Ruta protegida */}
                <Route
                    path="/items"
                    element={isAuthenticated ? <Items /> : <Navigate to="/login" />}
                />

                {/* Cualquier ruta desconocida → login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default function AppRouter() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
