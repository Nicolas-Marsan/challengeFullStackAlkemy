var express = require('express');
const bcryptjs = require('bcryptjs'); 
const db = require("../database/models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require('path');
const jwt = require("jsonwebtoken");

let userController = {
   
  creation:function(req,res){

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
   
  login: async function(req,res){
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
                
                const userToken =jwt.sign({id:userToLogin.id},"secret");
                                               
                return res.status(200).json(
                  {data:userToLogin,
                    token:userToken});
              }else{
               console.log("credenciales invalidad");
                let error="credenciales invalidad";
              
              return res.json({
                error:error
              });
            }


            }else{
              console.log("credenciales invalidad");
              let error="credenciales invalidad";
              
              return res.json({
                error:error
              });
          }
        
      })
      
    },
   
   logout: function(req, res){
     req.session.destroy();
    
     return res.send("true");
}

    
};

module.exports = userController;