var express = require("express");
const bcryptjs = require("bcryptjs"); //*hasheare contra/*/
const db = require("../database/models");
/*const { validationResult }= require('express-validator');*/
const verification = require("../middleware/verification");
const cors = require("cors");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

let movementsController = {
  creation: function (req, res) {
    db.Movements.create({
      concept: req.body.concept,
      amount: req.body.amount,
      date: req.body.date,
      type: req.body.type,
      state: req.body.state,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
    });
    res.send(req.body);
  },
  categories: function (req, res) {
    db.Categories.findAll().then(function (category) {
      return res.json({ category });
    });
  },
  movements: function (req, res) {
    db.Movements.findAll({
      where: {
        user_id: { [Op.like]: "%" + req.query.id + "%" },
        state: { [Op.like]: "activo" },
      },
      include: [{ association: "categories" }],
    }).then(function (movements) {
      return res.status(200).json({ movements });
    });
  },

  movement: function (req, res) {
    db.Movements.findAll({
      where: {
        id: { [Op.like]: req.query.id },
      },
    }).then(function (movement) {
      return res.status(200).json({ movement });
    });
  },
  upgrade: function (req, res) {
    let moveEdited = {
      concept: req.body.concept,
      amount: req.body.amount,
      date: req.body.date,
      type: req.body.type,
      state: req.body.state,
      user_id: req.body.user_id,
    };
    db.Movements.update(moveEdited, {
      where: {
        id: { [Op.like]: req.query.id },
      },
    });

    res.send(req.body);
  },
  destroy: function (req, res) {
    db.Movements.destroy({
      where: {
        id: { [Op.like]: req.query.id },
      },
    });

    res.send(req.body);
  },
};

module.exports = movementsController;
