const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Usuarios";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: dataTypes.STRING,
    },
    last_name: {
      type: dataTypes.STRING,
    },
    mail: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    }
  };

  let config = {
    tableName: "usuarios",
    timestamps: false,
  };
  const Usuarios = sequelize.define(alias, cols, config);

  Usuarios.associate = function(models){
    Usuarios.hasMany(models.Movements,{
               as: "movement",
               foreignKey: "user_id"
           })
       }



  return Usuarios;
};
