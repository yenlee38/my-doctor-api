const Department = require("../models/department.model.js");
const { v4: uuidv4 } = require("uuid");
// Create and Save a new Department
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const department = new Department({
    id: uuidv4(),
    name: req.body.name,
    time: req.body.time,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Save Department in the database
  Department.create(department, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Department.",
        department: null,
        count: 0,
      });
    else
      res.json({
        message: "Created at department!",
        count: 1,
        department: department,
      });
  });
};

// Find a single Department with a departmentId
exports.findOne = (req, res) => {
  Department.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Department with id ${req.params.name}.`,
          department: null,
          count: 0,
        });
      } else {
        res.status(500).json({
          message: "Error retrieving Department with id " + req.params.name,
          department: null,
          count: 0,
        });
      }
    } else
      res.json({
        message: "Find one department!",
        count: 1,
        department: data,
      });
  });
};

// Update a Department identified by the departmentId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }

  Department.updateById(
    req.params.departmentId,
    new Department(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Department with id ${req.params.departmentId}.`,
            department: null,
            count: 0,
          });
        } else {
          res.status(500).json({
            message:
              "Error updating Department with id " + req.params.departmentId,
            department: null,
            count: 0,
          });
        }
      } else
        res.json({
          message: "Updated at department!",
          count: 1,
          department: new Department(req.body),
        });
    }
  );
};
