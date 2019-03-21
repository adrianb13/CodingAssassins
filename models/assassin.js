module.exports = function(sequelize, DataTypes) {
  var Developer = sequelize.define("Developer", {
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
  return Developer;
};

module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-50]
      }
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
        inNumeric: true
      }
    },
    job_requested_header: {
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
  })
  return Client;
};

