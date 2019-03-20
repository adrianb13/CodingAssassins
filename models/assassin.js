module.exports = function(sequelize, DataTypes) {
  var Assassin = sequelize.define("Assassins", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-50]
      }
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,        
      validate: {
        len: [20-500]
      }
    },
    kill_history: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [4-500]
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
  return Assassin;
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
        len: [10-500]
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

