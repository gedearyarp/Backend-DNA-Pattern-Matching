const express = require('express');
const validateSequence = require('../middleware/dna-validation');
const { generateTestVerdict } = require('../controllers/dna-test.controller');

const router = express.Router();

router.post(
    "/test" ,
    validateSequence,
    generateTestVerdict
)

module.exports = router;