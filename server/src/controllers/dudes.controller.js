const db = require("../models");
const Dudes = db.dudes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {
  Dudes.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "An error occurred retrieving all data."
      });
    });


};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Dudes.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find person with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id
      });
    });
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};
