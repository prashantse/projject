'use strict';

const bcrypt = require('bcrypt');
const {
  Model,Sequelize
} = require('sequelize');
const sequelize = require('../../database');


module.exports = sequelize.define('user',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM('0','1','2')
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING,  
  },
  password: {
    type: Sequelize.STRING
  },
  confirmPassword: {
    type: Sequelize.VIRTUAL,
    set(value) {
    if (value===this.password) {
      const hashPassword = bcrypt.hashSync(value,10);
      this.setDataValue('password', hashPassword);
    }
   }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt:{
    type: Sequelize.DATE,
  }
},{
  freezeTableName: true,
  paranoid: true,
  modelName: 'user'
})