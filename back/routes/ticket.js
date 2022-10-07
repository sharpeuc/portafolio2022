'use strict'
var express = require('express');

var ticketController = require('../controllers/ticketController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_ticket_admin', auth.auth, ticketController.registro_ticket_admin);
api.get('/listar_tickets_admin/:filtro?', auth.auth, ticketController.listar_tickets_admin);
api.get('/obtener_ticket_admin/:id', auth.auth, ticketController.obtener_ticket_admin);
api.put('/actualizar_ticket_admin/:id', auth.auth, ticketController.actualizar_ticket_admin);
api.delete('/eliminar_ticket_admin/:id', auth.auth, ticketController.eliminar_ticket_admin);
api.get('/validar_ticket_cliente/:ticket', auth.auth, ticketController.validar_ticket_cliente);



module.exports = api;
