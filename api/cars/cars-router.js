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
router.get('/:id', (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})
router.post('/', (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})
router.put('/:id', (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})
router.delete('/:id', (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;