'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'カテゴリー名を記入してください'
        },
        len: {
          args: [0, 20],
          msg: '20文字以下で入力してください'
        }
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