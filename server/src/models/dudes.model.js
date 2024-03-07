module.exports = (sequelize, Sequelize) => {
  const Dudes = sequelize.define("dudes", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    quote: {
      type: Sequelize.STRING
    }
  },{
    timestamps: false
  });

  return Dudes;
};
