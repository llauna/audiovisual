// scripts/updateUser.ts
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import User from '../src/models/User'; // Ajusta la ruta según tu proyecto

async function createAdmin() {
    try {
        await mongoose.connect('mongodb://localhost:27017/audiovisual'); // Cambia la URL si es necesario

        const hashedPassword = await bcrypt.hash('Administrador', 10); // Cambia la contraseña por una segura

        const adminUser = new User({
            username: 'David',
            email: 'davidsolanes@gmail.com',
            password: hashedPassword,
            role: 'admin',
            nombreCompleto: 'Administrador General',
            puesto: 'Administrador',
            departamento: 'Sistemas',
            fechaContratacion: new Date(),
            telefono: '658-811-991',
            direccion: 'Oficina Central',
            createdAt: new Date()
        });

        await adminUser.save();
        console.log('Usuario administrador creado con éxito');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creando el usuario administrador:', error);
        mongoose.connection.close();
    }
}

createAdmin();
