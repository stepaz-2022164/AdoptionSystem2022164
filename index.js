//El index solo ejecuta servicios

// La variable debe ser el nombre de la funcion
import { initServer } from './configs/app.js' // Con ECMAScript modules siempre se pone la extencion del archivo
import { connect } from './configs/mongo.js'

connect()
initServer()
