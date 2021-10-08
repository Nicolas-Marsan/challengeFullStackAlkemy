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
                     user_id: req.session.userLogged.id
      
                     });
              res.send(req.body);

     },
   movementsById:function(req,res){
       
    db.Movements.findAll({
        where: {
           user_id: {[db.Sequelize.Op.eq] : req.session.userLogged.id}
        }
     })
    .then(function(movements){
        
           res.send(movements);
      })

   }    
};

module.exports = movementsController;