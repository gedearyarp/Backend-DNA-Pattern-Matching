const express = require('express');
const validateSequence = require('../middlewares/dna_validation');
const generateTestVerdict = require('../controllers/dna-test.controller');

const router = express.Router();

router.post(
    "/test" ,
    validateSequence,
    generateTestVerdict
)

module.exports = router;