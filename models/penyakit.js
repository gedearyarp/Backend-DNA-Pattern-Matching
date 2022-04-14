const mongoose = require('mongoose');

const penyakit = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namaPenyakit : String,
    sequenceDNA : String,
})

module.exports = mongoose.model('Penyakit', penyakit);