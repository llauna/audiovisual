import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Eventos from "./pages/Eventos";
import Almacenes from "./pages/Almacenes";
import Inventario from "./pages/Inventario";
import Presupuestos from "./pages/Presupuestos";
import Personal from "./pages/usuarios/Personal.tsx";
import Footer from "./components/Footer.tsx";

import EditarUsuario from './pages/usuarios/EditarUsuario';
import NuevoUsuario from "./pages/usuarios/NuevoUsuario.tsx";

function App() {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
                <Route path="/items" element={<PrivateRoute><Items /></PrivateRoute>} />

                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/eventos" element={<PrivateRoute><Eventos /></PrivateRoute>} />
                <Route path="/almacenes" element={<PrivateRoute><Almacenes /></PrivateRoute>} />
                <Route path="/inventario" element={<PrivateRoute><Inventario /></PrivateRoute>} />
                <Route path="/presupuestos" element={<PrivateRoute><Presupuestos /></PrivateRoute>} />
                <Route path="/personal" element={<PrivateRoute><Personal /></PrivateRoute>} />
                <Route path="/personal/nuevo" element={<PrivateRoute><NuevoUsuario /></PrivateRoute>} />
                <Route path="/personal/editar/:id" element={<EditarUsuario />} />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
