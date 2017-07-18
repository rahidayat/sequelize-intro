'use strict';
const helpSalt = require ('../helpers/salt')
const crypPass = require ('../helpers/hashpw')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  },{
    hooks: {
      beforeCreate: (models) => {
        let tempPass = models.password;
        // let tempSalt = models.salt;
        models.password = crypPass (tempPass);
        models.salt = helpSalt();
      }
    }
  })

  return User;
};
// console.log(helpSalt);
