const express = require('express');
const {getSearchHistorybyInput} = require('../controllers/dna-test.controller');

const router = express.Router();

router.post(
    "/",
    getSearchHistorybyInput
)

module.exports = router;