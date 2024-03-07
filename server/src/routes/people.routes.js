module.exports = app => {
  const people = require("../controllers/people.controller.js");
  const dudes = require("../controllers/dudes.controller.js");
  const ladies = require("../controllers/ladies.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/people/", people.findAll);

  // Retrieve a single Tutorial with id
  router.get("/people/:id", people.findOne);

  router.get("/dudes/", dudes.findAll);

  router.get("/dudes/:id", dudes.findOne);

  router.get("/ladies/", ladies.findAll);

  router.get("/ladies/:id", ladies.findOne);

  app.use('/api', router);
};
