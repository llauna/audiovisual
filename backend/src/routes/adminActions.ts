import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { authorizeAdmin } from '../middleware/adminMiddleware';

const router = Router();

router.post('/crear', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: 'Registro creado por administrador' });
});

router.put('/modificar/:id', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: `Registro ${req.params.id} modificado por administrador` });
});

router.delete('/eliminar/:id', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: `Registro ${req.params.id} eliminado por administrador` });
});

export default router;
