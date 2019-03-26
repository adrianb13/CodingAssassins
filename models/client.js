module.exports = function(sequelize, DataTypes) {
  var Clients = sequelize.define("Clients", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-50]
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 10
      }
    },
    job_header: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-50]
      }
    },
    job_requested: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10-200]
      }
    },
    job_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return Clients;
};