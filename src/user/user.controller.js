'use strict'

import User from './user.model.js' //Unico que puede ir en mayuscula
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

// Funcion de prueba para comprobar que todo tenga conexion
export const test = (req, res) => {
    return res.send('hello world')
}

export const register = async(req, res) => {
    try {
        //Recibir la informacion del cliente
        let data = req.body 
        //Ecriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar rol por defecto
        data.role = 'CLIENT' // Venga el valor que venga convierte el rol a cliente
        //Crear la instancia del modelo (schema)
        let user = new User(data) //Crea una instancia del usuario
        //Guardar informacion
        await user.save() //Linea de espera
        //Resporder al usuario
        return res.send({message: 'Registered successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering', err}) //Excepcion que espera cierta cantidad de milisegundos
    }
}

// Login
export const login = async(req, res) => {
    try {
        //Recibir informacion
        let {username, password} = req.body
        //Validar informacion
        let user = await User.findOne({username}) //Verifica el usuario
        //Verifica la contraseña
        if(user && await checkPassword(password, user.password)) {
            // Envia unicamente los datos necesarios
            let loggerUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Dar acceso
            return res.send({message: `Welcome ${user.name}`, loggerUser})
        }
        return res.status(404).send({message: 'User or password incorrect'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error logging in', err})
    }
}

// Actualizar el usuario
export const update = async (req, res) => {
    try {
        //Obtener el id de usuario
        let { id } = req.params //Obtener datos de la ruta
        //Obtener los datos que se actualizaran
        let data = req.body
        //Validar si se traen los datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({message: 'Have submietted some data that cannot update'})
        //Actualizar en la BD
        let updatedUser = await User.findOneAndUpdate(
            { _id: id }, //Object id
            data, //Datos a actualizar
            {new: true} //Objeto de la BD ya actilizado
        )
        //Validar si se actualizo
        if (!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        //Responder el dato actualizado
        return res.send({message: 'Updated user', updatedUser})
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already in use`})
        return res.status(500).send({message: 'Error updating', err})
    }
}

export const deleteU = async(req, res) => {
    try {
        //Obtener el id
        let {id} = req.params
        //Eliminar
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar si se elimino
        if (!deletedUser) return res.status(401).send({message: 'User not found and not deleted'})
        //Responder
        return res.send({message: 'Deleted user', deletedUser})
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error deleting', err})
    }
}
