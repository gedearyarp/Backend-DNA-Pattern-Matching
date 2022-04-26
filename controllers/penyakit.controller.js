const mongoose = require('mongoose');
const Penyakit = require('../models/penyakit');

const addPenyakit = async (req, res) => {
    try{ 
        const penyakitExist = await Penyakit
                                .findOne({ namaPenyakit: req.body.namaPenyakit })
                                .exec();

        const objPenyakit = new Penyakit({
            _id: new mongoose.Types.ObjectId(),
            namaPenyakit : req.body.namaPenyakit,
            sequenceDNA : req.body.sequenceDNA,
        });

        if(penyakitExist){
            await Penyakit
                .findOneAndUpdate(
                    { namaPenyakit: req.body.namaPenyakit }, 
                    { sequenceDNA: req.body.sequenceDNA }
                )
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
            return;
        }

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

const getAllPenyakit = async (req, res) => {
    try{
        await Penyakit
            .find()
            .select('_id namaPenyakit sequenceDNA')
            .exec()
            .then(penyakit => {
                res.status(200).send({
                    penyakit
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
    addPenyakit,
    getAllPenyakit
};