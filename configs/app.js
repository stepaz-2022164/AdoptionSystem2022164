//Configuracion de express

//ECMAScript modules
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {config} from 'dotenv' //Variables de entorno
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'


//Configuraciones 
const app = express();
config()
const port = process.env.PORT || 3200 //Utiliza el puerto que esta disponible en la varible de entorno o el 3200

//Configurar el servidor de express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) //Politicas de acceso
app.use(helmet()) //Seguridad
app.use(morgan('dev')) //Logger

//Declarar rutas
app.use(userRoutes)
app.use(animalRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server running on port ${port}`)
}