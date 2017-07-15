'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubject.associate = (models) => {
    StudentSubject.belongsTo(models.Student);
    StudentSubject.belongsTo(models.Subject);
  }
  return StudentSubject;
};
