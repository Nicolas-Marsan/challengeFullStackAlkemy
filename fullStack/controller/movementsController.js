var express = require('express');
const bcryptjs = require('bcryptjs'); //*hasheare contra/*/
const db = require("../database/models");
/*const { validationResult }= require('express-validator');*/
const { Op } = require("sequelize");
const fs = require("fs");
const path = require('path');

let movementsController = {
   
  create:function(req,res){

               
               db.Movements.create({

                     concept: req.body.concept,
                     amount: req.body.amount,
                     date: req.body.date,
                     type:req.body.type,
                     state:req.body.state,
                     user_id:req.body.user_id
      
                     });
              res.send(req.body);

     },
   movementsById:function(req,res){

      
    db.Movements.findAll({
        where: {
           user_id: {[Op.like]: '%' + req.query.id + '%'} ,
           state: {[Op.like]: 'activo'} 
        }
     })
    .then(function(movements){
        
          return res.status(200).json({movements});
      })

   } ,
   movementById:function(req,res){

      
      db.Movements.findAll({
          where: {
             id: {[Op.like]: req.query.id} 
          }
       })
      .then(function(movement){
          
            return res.status(200).json({movement});
        })
  
     },
     update:function(req,res){
               
           let moveEdited = {
               concept: req.body.concept,
               amount: req.body.amount,
               date: req.body.date,
               type:req.body.type,
               state:req.body.state,
               user_id:req.body.user_id
           }
           db.Movements.update(moveEdited, {
              where:{
               id: {[Op.like]: req.query.id} 
           }  
           });

     res.send(req.body);

},
delete:function(req,res){
     db.Movements.destroy({
      where:{
       id: {[Op.like]: req.query.id} 
   }  
   });

res.send(req.body);
}
};

module.exports = movementsController;