'use strict'

import express from 'express'
import {test, register, login, update, deleteU} from './user.controller.js'

const api = express.Router() //Instancia de express

api.get('/test', test) // Ruta y funcion que se encuentra en el controlador
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', update)
api.delete('/deleteU/:id', deleteU)

        //Se puede usar con otro nombre
export default api //Exportar la variable

//export const api -> se debe usar con el nombre definido