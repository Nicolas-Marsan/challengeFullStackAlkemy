const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = "Categories";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: dataTypes.STRING,
    }
  };

  let config = {
    tableName: "categories",
    timestamps: false,
  };
  const Categories = sequelize.define(alias, cols, config);

  Categories.associate = function(models){
    Categories.hasMany(models.Movements, {

        as: "movement",
        foreignKey: "category_id"
    })

  };

  return Categories;
};