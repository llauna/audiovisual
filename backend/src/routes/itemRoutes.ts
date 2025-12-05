import express, { Response, NextFunction, Request } from 'express';
import Item from '../models/Item';
import { authenticate, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Middleware auxiliar para casting de tipos
const authHandler = (fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any> | any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return fn(req as AuthRequest, res, next);
    };
};

// Ruta protegida de prueba
router.get('/protegida', authenticate, authHandler((req: AuthRequest, res: Response) => {
    res.json({
        mensaje: 'Accediste a una ruta protegida',
        user: req.user
    });
}));

// Crear Item
router.post('/', authenticate, authHandler(async (req: AuthRequest, res: Response) => {
    try {
        if (!req.body.nombre) {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
        }

        // Usamos req.user!.id con el signo de exclamación (!)
        // Esto le dice a TypeScript: "Confía en mí, user no es undefined aquí"
        const nuevoItem = new Item({
            nombre: req.body.nombre,
            usuario: req.user!.id
        });

        const itemGuardado = await nuevoItem.save();
        res.status(201).json(itemGuardado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear item' });
    }
}));

// Obtener Items del usuario
router.get('/', authenticate, authHandler(async (req: AuthRequest, res: Response) => {
    try {
        const items = await Item.find({ usuario: req.user!.id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener items' });
    }
}));

// Actualizar Item
router.put('/:id', authenticate, authHandler(async (req: AuthRequest, res: Response) => {
    try {
        const itemActualizado = await Item.findOneAndUpdate(
            { _id: req.params.id, usuario: req.user!.id },
            { nombre: req.body.nombre },
            { new: true }
        );

        if (!itemActualizado) {
            return res.status(404).json({ mensaje: 'Item no encontrado o no autorizado' });
        }

        res.json(itemActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar item' });
    }
}));

// Eliminar Item
router.delete('/:id', authenticate, authHandler(async (req: AuthRequest, res: Response) => {
    try {
        const itemEliminado = await Item.findOneAndDelete({
            _id: req.params.id,
            usuario: req.user!.id
        });

        if (!itemEliminado) {
            return res.status(404).json({ mensaje: 'Item no encontrado o no autorizado' });
        }

        res.json({ mensaje: 'Item eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar item' });
    }
}));

export default router;