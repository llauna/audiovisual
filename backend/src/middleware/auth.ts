import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { authenticate } from './authMiddleware';
import { authorizeAdmin } from './adminMiddleware';

const router = Router();

// Registro de usuario (solo admin)
router.post('/register', authenticate, authorizeAdmin, async (req: Request, res: Response) => {
    try {
        const {
            username,
            email,
            password,
            role,
            nombreCompleto,
            puesto,
            departamento,
            fechaContratacion,
            telefono,
            direccion
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            nombreCompleto,
            puesto,
            departamento,
            fechaContratacion,
            telefono,
            direccion
        });

        await newUser.save();

        res.status(201).json({ message: `Usuario ${newUser.nombreCompleto} registrado con éxito` });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error });
    }
});

// Login de usuario
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.json({
            message: `Bienvenido ${user.nombreCompleto}`,
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', details: error });
    }
});

export default router;
