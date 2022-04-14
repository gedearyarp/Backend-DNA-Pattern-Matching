const express = require('express');
const validateSequence = require('../middlewares/dna_validation');
const addPenyakit = require('../controllers/penyakit.controller');

const router = express.Router();

router.post(
    "/add" ,
    validateSequence,
    addPenyakit
)

module.exports = router;