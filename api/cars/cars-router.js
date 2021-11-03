const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');
const mw = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.json(cars)
        })
        .catch(next)
})
router.get('/:id', mw.checkCarId, async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        res.json(car)
    } catch (err) {
        next(err)
    }
})
router.post('/', 
mw.checkCarPayload, 
mw.checkVinNumberUnique, 
mw.checkVinNumberValid, 
async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body);
        res.json(newCar)
    } catch (err) {
        next(err)
    }
})
router.put('/:id', mw.checkCarId, mw.checkCarPayload, async (req, res, next) => {
    try {
        const newCar = await Cars.update(req.params.id, req.body);
        res.json(newCar); 
    } catch (err) {
        next(err)
    }
})
router.delete('/:id', mw.checkCarId, async (req, res, next) => {
    try {
        const car = await Cars.remove(req.params.id);
        res.json(car);
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;