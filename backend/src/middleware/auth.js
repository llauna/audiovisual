const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado; // Guardamos los datos del usuario en la request
        next();
    } catch (err) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }
}

module.exports = verificarToken;
