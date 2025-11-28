const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
            maxlength: [50, 'El nombre no puede superar los 50 caracteres'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido']
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
