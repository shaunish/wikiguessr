module.exports = (sequelize, Sequelize) => {
  const People = sequelize.define("people", {
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
  
  return People;
};
