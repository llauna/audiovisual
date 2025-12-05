import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.warn("No hay token en localStorage");
            setIsValid(false);
            return;
        }

        fetch("/api/auth/validar-token", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    console.error("Error validando token:", errorData);
                    localStorage.removeItem("token");
                    setIsValid(false);
                } else {
                    console.log("Token válido ✅");
                    setIsValid(true);
                }
            })
            .catch((err) => {
                console.error("Error de red al validar token:", err);
                localStorage.removeItem("token");
                setIsValid(false);
            });
    }, []);

    if (isValid === null) {
        return <div className="container mt-5">Validando sesión...</div>;
    }

    if (!isValid) {
        return <Navigate to="/login" replace />;
    }

    return <MainLayout>{children}</MainLayout>;
}
