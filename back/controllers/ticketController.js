'use strict'

var Ticket = require('../models/ticket');

const registro_ticket_admin = async function(req,res){
if(req.user){

    if(req.user.role == 'admin'){

        let data = req.body;

        let reg = await Ticket.create(data);
        res.status(200).send({data:reg});


    
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}else{
    res.status(500).send({message: 'NoAccess'});
}
}
const listar_tickets_admin = async function(req,res){

    if(req.user){
        if(req.user.role == 'admin'){

            var filtro = req.params['filtro'];

            let reg = await Ticket.find({codigo: new RegExp(filtro, 'i')}).sort({createdAt: -1});

            res.status(200).send({data:reg});

        }else{
            res.status(500).send({message: 'NoAccess'});


        }

    }else{
        res.status(500).send({message: 'NoAccess'});


    }

}
const obtener_ticket_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
            
            var id = req.params['id'];

            try {
                var reg = await Ticket.findById({_id:id});

                res.status(200).send({data:reg});
            } catch (error) {
                res.status(200).send({data:undefined});
            }

        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}
const actualizar_ticket_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){

            var data = req.body;
            var id = req.params['id'];

            let reg = await Ticket.findByIdAndUpdate({_id:id},{

                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite

            });

            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }
}
const eliminar_ticket_admin = async function(req,res){
    if(req.user){
        if(req.user.role =='admin'){
            
            var id = req.params['id'];

            let reg = await Ticket.findByIdAndRemove({_id:id});
            res.status(200).send({data:reg});
            
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }else{
        res.status(500).send({message: 'NoAccess'});
    }

    const registro_ticket_admin = async function(req,res){
        if(req.user){
        
            if(req.user.role == 'admin'){
        
                let data = req.body;
        
                let reg = await Ticket.create(data);
                res.status(200).send({data:reg});
        
        
            
            }else{
                res.status(500).send({message: 'NoAccess'});
            }
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
        }




}
const validar_ticket_cliente = async function(req,res){
    if(req.user){
    
        var ticket = req.params['ticket'];

        var data = await Ticket.findOne({codigo:ticket})

       if(data){

        if(data.limite == 0){
            res.status(200).send({data: undefined});

        }else{
            res.status(200).send({data: data});

        }
       
    }else{
        res.status(200).send({data: undefined});


       }
        
        }else{
            res.status(500).send({message: 'NoAccess'});
        }
    }
   

module.exports = {

registro_ticket_admin,
listar_tickets_admin,
obtener_ticket_admin,
actualizar_ticket_admin,
eliminar_ticket_admin,
validar_ticket_cliente


}