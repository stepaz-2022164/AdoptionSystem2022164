//Configuracion de mongo

import mongoose from'mongoose'

export const connect = async () =>{
    try {
        //Verifica si existe conexion
        mongoose.connection.on('error', () =>{
            console.log('Faied to connect')
            mongoose.disconnect()
        })

        mongoose.connection.on('connecting', () => console.log('Waiting for connection'))
        mongoose.connection.on('connected', () => console.log('Connected successfully'))
        mongoose.connection.on('open', () => console.log('Database opened successfully'))
        mongoose.connection.on('disconnected', () => console.log('Database disconnected'))

        await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV24') //Espera a conectarse
    } catch (err) {
        console.error('Database connection error', err)
    }
}