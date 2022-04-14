const express = require('express');
const {getAllDNATest, getAllTestByInput} = require('../controllers/dna-test.controller');

const router = express.Router();

router.get(
    "/",
    getAllDNATest
)

router.post(
    "/",
    getAllTestByInput
)

module.exports = router;