'use strict'

import { checkUpdate } from './utils/validator.js'
import Animal from './animal.model.js'

//Nuevo animal
export const newAnimal = async (req, res) => {
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save() 
        return res.send({message: 'Animal saved successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving', err}) //Excepcion que espera cierta cantidad de milisegundos
    }
}

// Actualizar el animal
export const updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updateAnimal = checkUpdate(data, id)
        if (!updateAnimal) return res.status(400).send({message: 'Have submietted some data that cannot update'})
        let updatedAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data, 
            {new: true}
        )
        if (!updatedAnimal) return res.status(401).send({message: 'Animal not found and not updated'})
        return res.send({message: 'Updated animal', updatedAnimal})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating animal', error})
    }
}

//Borrar animal
export const deleteAnimal = async (req, res) => {
    try {
        let {id} = req.params
        let deletedAnimal = await Animal.findOneAndDelete({_id: id})
        if (!deletedAnimal) return res.status(401).send({message: 'Animal not found and not deleted'})
        return res.send({message: 'Deleted animal', deletedAnimal})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting animal', error})
    }
}

//Obtener animales
export const getAnimals = async (req, res) => {
    try {
        let animals = await Animal.find()
        return res.send({animals})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting animals', error})
    }
}

//Obtener animal por id
export const getAnimalByName = async (req, res) => {
    try {
        let {id} = req.params
        let animal = await Animal.findOne({_id: id}).select()
        if (!animal) return res.status(401).send({message: 'Animal not found'})
        return res.send({animal})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting animal', error})
    }
}
