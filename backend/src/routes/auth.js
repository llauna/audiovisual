const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();
const verificarToken = require('../middleware/auth');

router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        // Validar datos de entrada
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
        }

        // Buscar usuario
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const esPasswordValida = await bcrypt.compare(password, usuario.password);
        if (!esPasswordValida) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Verificar que JWT_SECRET esté configurado
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET no está configurado en .env");
            return res.status(500).json({ mensaje: 'Error interno de configuración' });
        }

        // Generar token
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respuesta exitosa
        return res.json({ token });

    } catch (err) {
        console.error('❌ Error en login:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

router.get  ('/validar-token', verificarToken, (req, res) => {
    res.json({ valido: true });
} );

module.exports = router;
