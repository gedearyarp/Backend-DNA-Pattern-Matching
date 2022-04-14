const mongoose = require('mongoose');

const penyakit = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namaPenyakit : { 
        type: String, 
        required: true 
    },
    sequenceDNA : { 
        type: String, 
        required: true 
    },
})

module.exports = mongoose.model('Penyakit', penyakit);