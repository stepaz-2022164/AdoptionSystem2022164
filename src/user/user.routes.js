import express from 'express'
import { test, register } from './user.controller.js';

const api = express.Router();

api.get('/test', test)
api.post('/register', register)

export default api