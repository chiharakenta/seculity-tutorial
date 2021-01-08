'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'カテゴリー名を記入してください'
        },
        max: 10
      }
    }
  }, {
    underscored: true,
  });
  category.associate = function(models) {
    category.hasMany(models.todo);
  };
  return category;
};