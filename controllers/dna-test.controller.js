const mongoose = require('mongoose');
const DNATest = require('../models/dna-test');
const Penyakit = require('../models/penyakit');
const verdictDNA = require('../services/dna-test-verdict.service');
const searchDNA = require('../services/search-dna.service');

const getSearchHistorybyInput = async (req, res) => {
    try{
        const inputUser = req.query.q;
        const listHistory = await searchDNA(inputUser);

        res.status(200).send({
            message: 'Berhasil mengambil data',
            data: listHistory
        })
    } catch (err) {
        res.status(202).send({
            error: err.message
        });
    }
}

const generateTestVerdict = async (req, res) => {
    try{
        let seqPenyakitDNA = await Penyakit
            .findOne({ namaPenyakit: req.body.namaPenyakit })
            .exec()
            .catch(err => {
                res.status(500).send({
                    error: err.message
                });
            })
        seqPenyakitDNA = seqPenyakitDNA.sequenceDNA;
        
        const verdict = await verdictDNA(seqPenyakitDNA, req.body.sequenceDNA);

        const objDNA = await new DNATest({
            _id: new mongoose.Types.ObjectId(),
            namaPengguna : req.body.namaPengguna,
            namaPenyakit : req.body.namaPenyakit,
            similarity : verdict.similarity,
            status : verdict.status
        });

        await objDNA
            .save()
            .then(() => {
                res.status(201).send({
                    message: 'Berhasil menambahkan data',
                    data: objDNA
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

module.exports = {
    generateTestVerdict,
    getSearchHistorybyInput,
};