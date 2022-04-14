const mongoose = require('mongoose');
const Penyakit = require('../models/penyakit');

const addPenyakit = async (req, res) => {
    try{
        // TODO: kalo penyakit sudah ada, update nilainya
        const objPenyakit = new Penyakit({
            _id: new mongoose.Types.ObjectId(),
            namaPenyakit : req.body.namaPenyakit,
            sequenceDNA : req.body.sequenceDNA,
        });

        await objPenyakit
            .save()
            .then(() => {
                res.status(201).send({
                    message: 'Berhasil menambahkan data',
                    created: objPenyakit
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

module.exports = addPenyakit;