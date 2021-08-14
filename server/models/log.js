module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define("log", {
    description: {
      type: DataTypes.STRING,
      allNull: false,
    },
    definition: {
      type: DataTypes.STRING,
      allNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
    },
  });
  return Log;
};
