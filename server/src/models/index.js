const dbConfig = require('../config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.people = require("./people.model.js")(sequelize, Sequelize);
db.dudes = require("./dudes.model.js")(sequelize, Sequelize);
db.ladies = require("./ladies.model.js")(sequelize, Sequelize);

module.exports = db;
