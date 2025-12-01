// Cargar variables de entorno desde backend/.env
require('dotenv').config({ path: __dirname + '/../.env' });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Modelo de Usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Datos del usuario a crear (puedes cambiarlos aquí o pasarlos por argumentos)
const nombre = process.argv[2] || "David";
const email = process.argv[3] || "davidsolanes@gmail.com";
const passwordPlano = process.argv[4] || "Administrador";

// Validar que tenemos la URI
if (!process.env.MONGODB_URI) {
    console.error("❌ No se encontró MONGODB_URI en el archivo .env");
    process.exit(1);
}

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => {
        console.error('❌ Error de conexión:', err);
        process.exit(1);
    });

(async () => {
    try {
        // Verificar si el email ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            console.log(`⚠️ El usuario con email ${email} ya existe en la base de datos.`);
            mongoose.connection.close();
            return;
        }

        // Crear nuevo usuario
        const passwordHash = await bcrypt.hash(passwordPlano, 10);
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });

        await nuevoUsuario.save();
        console.log(`✅ Usuario creado: ${email} con contraseña ${passwordPlano}`);
    } catch (err) {
        console.error('❌ Error al crear usuario:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
