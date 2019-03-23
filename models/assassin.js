module.exports = function(sequelize, DataTypes) {
  var Developers = sequelize.define("Developers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-50]
      }
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [4-200]
      }
    },
    cost_to_hire: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    hired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hired_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
        isNumeric: true
      }
    }
  });
  return Developers;
};
