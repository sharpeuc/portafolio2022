'use strict'

var express = require('express');

var adminController = require('../controllers/AdminController');

var auth = require('../middlewares/authenticate');

var api = express.Router();


api.post('/registro_admin',adminController.registro_admin);
api.post('/login_admin',adminController.login_admin);

api.get('/obtener_mensajes_admin',auth.auth,adminController.obtener_mensajes_admin);
api.put('/cerrar_mensaje_admin/:id',auth.auth,adminController.cerrar_mensaje_admin);


module.exports = api;