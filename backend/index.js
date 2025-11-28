require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verificarToken = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Compass)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB vía Compass'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Rutas
const authRoutes = require('./src/routes/auth');
app.use('/api/usuarios', authRoutes);

// Definir esquema y modelo con validaciones y timestamps
const itemSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
            maxlength: [50, 'El nombre no puede superar los 50 caracteres'],
            trim: true // elimina espacios al inicio y final
        }
    },
    {
        timestamps: true // añade createdAt y updatedAt automáticamente
    }
);

const Item = mongoose.model('Item', itemSchema);

// Ruta protegida
app.get('/api/protegida', verificarToken, (req, res) => {
    res.json({
        mensaje: 'Accediste a una ruta protegida',
        usuario: req.usuario
    });
});


// CRUD
app.post('/api/items', verificarToken, async (req, res) => {
    try {
        const nuevoItem = new Item({ nombre: req.body.nombre });
        const itemGuardado = await nuevoItem.save();
        res.status(201).json(itemGuardado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/items', verificarToken, async (req, res) => {
    try {
        const items = await Item.find({ usuario: req.usuario.id });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/items/:id', verificarToken, async (req, res) => {
    try {
        const itemActualizado = await Item.findByIdAndUpdate(
            req.params.id,
            { nombre: req.body.nombre },
            { new: true }
        );
        if (!itemActualizado) {
            return res.status(404).json({ mensaje: 'Item no encontrado' });
        }
        res.json(itemActualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/items/:id', verificarToken, async (req, res) => {
    try {
        const itemEliminado = await Item.findByIdAndDelete(req.params.id);
        if (!itemEliminado) {
            return res.status(404).json({ mensaje: 'Item no encontrado' });
        }
        res.json({ mensaje: 'Item eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

