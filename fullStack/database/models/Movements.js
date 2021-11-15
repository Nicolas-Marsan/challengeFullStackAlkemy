const Sequelize = require('sequelize');


module.exports = (sequelize,dataTypes) => {

let alias = "Movements";
let cols = {
    id: {
        type: dataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    concept: {
        type: dataTypes.STRING
    },
    amount:{

        type: dataTypes.DECIMAL
    },
    date: {
        type:dataTypes.STRING
    },
    type: {
        type: dataTypes.STRING
    },
    state: {  
        type: dataTypes.STRING
      },
    user_id:{  
          type: dataTypes.INTEGER
         }
};

let config = {
    tableName: "movements",
    timestamps: false

}
const Movements = sequelize.define(alias,cols,config);

return Movements;
}