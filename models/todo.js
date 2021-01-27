'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Todoの内容を入力してください'
        },
        len: {
          args: [0, 100],
          msg: '100文字以内で入力してください'
        }
      }
    },
    category_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  todo.associate = function(models) {
    todo.belongsTo(models.category);
  };
  return todo;
};