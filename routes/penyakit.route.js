const express = require('express');
const validateSequence = require('../middleware/dna-validation');
const {addPenyakit, getAllPenyakit} = require('../controllers/penyakit.controller');

const router = express.Router();

router.get(
    "/",
    getAllPenyakit
)

router.post(
    "/add" ,
    validateSequence,
    addPenyakit
)

module.exports = router;