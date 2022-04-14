const validateSequence = (seq) => {
    return (req, res, next) => {
        for (let i = 0; i < seq.length; i++){
            if (seq[i] !== 'A' && seq[i] !== 'T' && seq[i] !== 'C' && seq[i] !== 'G'){
                return res.status(400).json({
                    message: 'Invalid DNA sequence'
                });
            }
        }
        next();
    }
}