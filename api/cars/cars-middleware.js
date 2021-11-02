const Cars = require('./cars-model');
const db = require('../../data/db-config');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Cars.getById(id);
    if(!car) {
      next({ status: 404, message: `car with id ${id} is not found` })
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.make) {
    next({ status: 400, message: `${req.body.make} is missing` })
  } else if(!req.body.vin) {
    next({ status: 400, message: `${req.body.vin} is missing` })
  } else if(!req.body.model) {
    next({ status: 400, message: `${req.body.model} is missing` })
  } else if(!req.body.mileage) {
    next({ status: 400, message: `${req.body.mileage} is missing` })
  } else {
    next()
  }
  
}

const checkVinNumberValid = (req, res, next) => {
  const vinToCheck = vinValidator.validate(req.body.vin);
  if(!vinToCheck) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVin = db('cars')
      .where('vin', req.body.vin.trim().first())
    if(existingVin) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}