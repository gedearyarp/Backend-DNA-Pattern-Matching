const mongoose = require('mongoose');

const DNATest = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tanggal : {
		type: Number,
		default: Date.now
	},
    namaPengguna : { 
        type: String, 
        required: true 
    },
    namaPenyakit : { 
        type: String, 
        required: true 
    },
    similarity : Number,
    status : Boolean,
})

module.exports = mongoose.model('TesDNA', DNATest);