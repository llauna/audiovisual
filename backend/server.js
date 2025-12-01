import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as usuarios from "rxjs";

dotenv.config();
const app = express();

app.use(express.json());

// Login: genera token
app.post("/api/usuarios/login", (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

// Ruta para validar token
app.get("/api/usuarios/validar-token", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ valido: true, usuario: decoded });
    } catch (err) {
        return res.status(401).json({ mensaje: "Token inválido" });
    }
});

// Aquí irían otras rutas...
// app.post("/api/usuarios/login", loginController);

app.listen(3000, () => {
    console.log("Servidor backend escuchando en puerto 3000");
});
