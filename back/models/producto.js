'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    titulo:{type: String, required:true},
    slug:{type: String, required:true},
    galeria:[{type: Object, required:false}],
    portada:{type: String, required:true},
    precio:{type: Number, required:true},
    descripcion:{type: String, required:true},
    createdAt:{type:Date, default: Date.now, require: true}
    

});

module.exports = mongoose.model('producto', ProductoSchema);