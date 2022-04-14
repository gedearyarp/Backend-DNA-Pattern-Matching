const mongoose = require('mongoose');

const tesDNA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tanggal : String,
    namaPengguna : String,
    namaPenyakit : String,
    similarity : Number,
    status : Boolean,
})

module.exports = mongoose.model('TesDNA', tesDNA);