'use strict'

import express from 'express'
import { newAnimal, updateAnimal, deleteAnimal, getAnimals, getAnimalByName } from './animal.controller.js'

const api = express.Router()

api.post('/newAnimal', newAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)
api.get('/getAnimals', getAnimals)
api.get('/getAnimalByName/:id', getAnimalByName)

export default api