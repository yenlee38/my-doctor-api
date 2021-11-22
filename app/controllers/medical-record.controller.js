const { v4: uuidv4 } = require("uuid");
const MedicalRecord = require("../models/medical-record.model");

exports.create = (res, req) => {
  if (!res.body) {
    req.status(400).json({
      message: "Body cannot null!",
      count: 0,
      medicalRecord: null,
    });
  }

  const medicalRecord = new MedicalRecord({
    id: uuidv4(),
    doctorId: res.body.doctorId,
    patientId: res.body.patientId,
    patientName: res.body.patientName,
    name: res.body.name,
    date: new Date(),
    precription: res.body.precription,
    fileStore: res.body.fileStore,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  MedicalRecord.create(medicalRecord, (err, data) => {
    if (err) {
      req.status(500).json({
        message: err.message || "Some error occurred while retrieving emotion.",
        count: 0,
        medicalRecord: null,
      });
    } else {
      req.status(200).json({
        message: "Created success medical record!",
        count: 1,
        medicalRecord: data,
      });
    }
  });
};

exports.uploadRecordFile = async (res, req) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const medicalRecord = new MedicalRecord({
      id: res.params.medicalRecordId,
      fileStore: result.secure_url,
    });

    MedicalRecord.uploadRecordFile(medicalRecord, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          req.status(404).json({
            message: `Not found MedicalRecord with id ${medicalRecord.id}.`,
            count: 0,
            medicalRecord: null,
          });
        } else {
          req.status(500).json({
            message: "Error updating MedicalRecord with id " + medicalRecord.id,
            count: 0,
            medicalRecord: null,
          });
        }
      } else
        req.json({
          message: "Updated MedicalRecord success!",
          count: 1,
          medicalRecord: data,
        });
    });
  } catch (err) {
    req.status(500).json({
      message: "Error updating MedicalRecord with id " + medicalRecord.id,
      count: 0,
      medicalRecord: null,
    });
  }
};

exports.findAll = (req, res) => {
  MedicalRecord.getAllByPatient(req.params.patientId, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message,
        record: null,
      });
    else
      res.json({
        message: "Find record by patient!",
        record: data,
      });
  });
};

exports.findAllByDoctor = (req, res) => {
  MedicalRecord.getAllByDoctor(req.params.doctorId, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message,
        record: [],
      });
    else
      res.json({
        message: "all by doctor!",
        record: data,
      });
  });
};

exports.findByPatientName = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  MedicalRecord.findByPatientName(
    req.body.doctorId,
    req.body.patientName,
    (err, data) => {
      if (err)
        res.status(500).json({
          message: err.message,
          record: [],
        });
      else
        res.json({
          message: "find by patientName!",
          record: data,
        });
    }
  );
};

exports.findById = (req, res) => {
  MedicalRecord.getRecord(req.params.id, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message,
        record: null,
      });
    else
      res.json({
        message: "record!",
        record: data,
      });
  });
};

exports.chartByDay = (req, res) => {
  MedicalRecord.getChartByDay(req.params.doctorId, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message,
        chart: [],
      });
    else
      res.json({
        message: "Chart by Day!",
        chart: data,
      });
  });
};

exports.findByDay = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  MedicalRecord.getByDay(req.body.doctorId, req.body.date, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message,
        chart: [],
      });
    else
      res.json({
        message: "get by day!",
        chart: data,
      });
  });
};
