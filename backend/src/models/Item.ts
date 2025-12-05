import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IItem extends Document {
    nombre: string;
    usuario: Types.ObjectId | string;
}

const ItemSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede superar los 50 caracteres'],
        trim: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Asegúrate de que coincida con el nombre de tu modelo de Usuario (User.ts)
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IItem>('Item', ItemSchema);