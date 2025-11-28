const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Crear usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Comparar contraseña
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
