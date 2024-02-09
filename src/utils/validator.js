//Encriptar y validar diferentes datos

import {compare, hash} from 'bcrypt' //Algoritmo matematico que encripta datos en capas - 8 a 10 capas

export const encrypt = async (password) => {
    try {
        return await hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

//Verificar la contraseña
export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash) //Compara el dato encriptado con el dato original y devuelve un true o false
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userId) =>{
    if (userId) {
        if (Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == '') return false  
        return true
    } else{
        return false
    }
}