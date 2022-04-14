const mongoose = require('mongoose');
const DNATest = require('../models/dna-test');
const Penyakit = require('../models/penyakit');
const verdictDNA = require('../services/dna-test-verdict');

const generateTestVerdict = async (req, res) => {
    try{
        let seqPenyakitDNA;

        await Penyakit.findOne(
            {
                namaPenyakit: req.body.namaPenyakit
            },
            function(err, penyakit) {
                if (err) {
                    res.status(500).send({
                        error: err.message
                    });
                }
                seqPenyakitDNA = penyakit.sequenceDNA;
            }
        );
        
        const verdict = await verdictDNA(seqPenyakitDNA, req.body.sequenceDNA);

        const objDNA = new DNATest({
            _id: new mongoose.Types.ObjectId(),
            namaPengguna : req.body.namaPengguna,
            namaPenyakit : req.body.namaPenyakit,
            similarity : verdict.similarity,
            status : verdict.status,
        });

        await objDNA
            .save()
            .then(() => {
                res.status(201).send({
                    message: 'Berhasil menambahkan data',
                    created: objDNA,
                    similarity: verdict.similarity,
                    status: verdict.status
                })
            })
            .catch(err => {
                res.status(500).send({
                    error: err.message
                });
            });
    } catch (err) {
        res.status(202).send({
            error: err.message
        });
    }
}

module.exports = generateTestVerdict;