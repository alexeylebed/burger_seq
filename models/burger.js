module.exports = function(sequelize, DataTypes) {
    var burger = sequelize.define("burger", {
      burger: DataTypes.STRING,
      devoured: DataTypes.BOOLEAN
    });
    return burger;
  };
  