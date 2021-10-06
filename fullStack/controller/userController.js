var express = require('express');
const bcryptjs = require('bcryptjs'); //*hasheare contra/*/
const db = require("../database/models");
/*const { validationResult }= require('express-validator');*/
const { Op } = require("sequelize");
const fs = require("fs");
const path = require('path');

let allController = {
    home: function(req,res){
     return   res.render('index.ejs');

    },
    all: (req, res) => {
      
		db.Usuarios.findAll(/*{include:[{association: 'nota'}]}*/
            /*{
                where:{
                    mail: {[Op.like]: '%' + req.query.mail + '%'}             
                }
            }*/)
         .then(function(usuarios){
            
           return res.send(usuarios);
         })
         
	},
  create:function(req,res){

   db.Usuarios.findAll(/*{include:[{association: 'nota'}]}*/
   {
       where:{
           mail: {[Op.like]: '%' + req.body.mail + '%'}             
       }
   })
.then(function(usuarios){
   //return res.send(usuarios[0].mail);
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


    //var registro = Date.now();
    /*db.Usuarios.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mail: req.body.mail,
      password:bcryptjs.hashSync(req.body.password, 10)
      
      });*/
      //res.send(req.body);
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
                req.session.userLogged = userToLogin; 
               
                if(req.body.rememberUser) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 69) * 2});
                }
              }
            }
          })

  },
   vistaIniciar:function(req,res){
   
      res.render('iniciarSesion');
   },
   vistaCrearCuenta:function(req,res){
    
      res.render('crearCuenta');
   },
   crearCuenta:function(req,res){
    
     db.Usuarios.create({
         nombre: req.body.nombre,
         apellido: req.body.apellido,
         mail: req.body.mail,
         contra:req.body.contra
         });


      res.render('index');
   },
   iniciar:function(req,res){
    
      res.render('crearCuenta');
   }

    
};

module.exports = allController;