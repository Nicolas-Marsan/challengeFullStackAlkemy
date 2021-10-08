var express = require('express');
const bcryptjs = require('bcryptjs'); //*hasheare contra/*/
const db = require("../database/models");
/*const { validationResult }= require('express-validator');*/
const { Op } = require("sequelize");
const fs = require("fs");
const path = require('path');

let userController = {
   
  create:function(req,res){

               db.Usuarios.findAll({
                                  where:{
                                  mail: {[Op.like]: '%' + req.body.mail + '%'}             
                                   }
                                    })
                                  .then(function(usuarios){
      
                                    if (usuarios != ""){
                                    res.send("el usuario ya existe");
                                    }else{
               db.Usuarios.create({

                     first_name: req.body.first_name,
                     last_name: req.body.last_name,
                     mail: req.body.mail,
                     password:bcryptjs.hashSync(req.body.password, 10)
      
                     });
              res.send(req.body);

                }  
            })
    
   },
   
  processToLogin: async function(req,res){
     let userToLogin=0;
        
        db.Usuarios.findAll({
            where: {
               mail: {[db.Sequelize.Op.eq] : req.body.mail}
            }
         })
        .then(function(usuario){
            
            userToLogin=usuario[0];
            
            if(userToLogin) {
                let passIsOk = bcryptjs.compareSync(req.body.password, userToLogin.password);            
                
                if(passIsOk) {
                delete userToLogin.password;
                
                req.session.userLogged = userToLogin; 
                                
                res.send(req.session);
              }
            }
          })
    },
   
   logout: function(req, res){
     req.session.destroy();
    
}

    
};

module.exports = userController;