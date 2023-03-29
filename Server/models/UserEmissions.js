const Sequelize = require('sequelize');
const sequelize = require('../utils/Database.js');
/*
The table for our user emissions, this will make a new table if it doesnt exist already (though is should exist)
*/
const UserEmissions = sequelize.define('UserEmissions', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id' // specify the actual column name in the table
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'user_id' // specify the actual column name in the table
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'date' // specify the actual column name in the table
  },
  total_emissions: {
    type: Sequelize.FLOAT,
    allowNull: false,
    field: 'total_emissions' // specify the actual column name in the table
  },
  transport_emissions: {
    type: Sequelize.FLOAT,
    allowNull: false,
    field: 'transport_emissions' // specify the actual column name in the table
  },
  lifestyle_emissions: {
    type: Sequelize.FLOAT,
    allowNull: false,
    field: 'lifestyle_emissions' // specify the actual column name in the table
  },
  home_emissions: {
    type: Sequelize.FLOAT,
    allowNull: false,
    field: 'home_emissions' // specify the actual column name in the table
  },
  diet_emissions: 
  {
    type: Sequelize.FLOAT,
    allowNull: false,
    field: 'diet_emissions'
  }
}, {
  tableName: 'user_emissions',
  freezeTableName: true,
  timestamps: false
  
});

module.exports = UserEmissions;