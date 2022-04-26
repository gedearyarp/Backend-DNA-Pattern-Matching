const validateSequence = (req, res, next) => {
    const regexp = /^[ATCG]+$/;
    const seq = req.body.sequenceDNA;
    const isValid = regexp.test(seq);

    if(!isValid) {
        return res.status(400).json({
            message: 'Invalid DNA sequence'
        });
    }

    next();
}

module.exports = validateSequence;