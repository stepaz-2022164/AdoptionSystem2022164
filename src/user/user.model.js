//Definir la estructura de la tabla - DDL

import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true, //Registro unico
        lowercase: true, //Minisculas
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be at least 8 characters'], //Cantidad minima de caracteres
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        upperCase: true, // Mayusculas
        enum: ['ADMIN', 'CLIENT'], //Solo los datos del arreglo son validos
        required: true
    }
})

// Pre mongoose
                            //Coleccion
export default mongoose.model('user', userSchema)