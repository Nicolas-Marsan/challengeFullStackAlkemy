const Sequelize = require('sequelize');


module.exports = (sequelize,dataTypes) => {

let alias = "Usuarios";
let cols = {
    id: {
        type: dataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    first_name: {
        type: dataTypes.STRING
    },
    last_name:{

        type: dataTypes.STRING
    },
    mail: {
        type:dataTypes.STRING
    },
    password: {
        type: dataTypes.STRING
    }
};

let config = {
    tableName: "usuarios",
    timestamps: false

}
const Usuarios = sequelize.define(alias,cols,config);

/*Usuarios.associate = function(models){
    Usuarios.hasMany(models.Notas,{
               as: "nota",
               foreignKey: "usuario_id"
           })
       }

/*Pelicula.associate = function(models){
    Pelicula.belongsTo(models.Generos, {

        as: "generos",
        foreignKey: "genre_id"
    })

    Pelicula.belongsToMany(models.Actores, {
        as: "actores",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false

    });

}*/


return Usuarios;
}