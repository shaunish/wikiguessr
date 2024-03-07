module.exports = (sequelize, Sequelize) => {
  const Ladies = sequelize.define("ladies", {
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

  return Ladies;
};
