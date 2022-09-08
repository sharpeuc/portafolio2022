'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = Schema({
    codigo:{type: String, required: true},
    tipo:{type: String, required: true},
    valor:{type: Number, required: true},
    limite:{type: Number, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('ticket',TicketSchema);