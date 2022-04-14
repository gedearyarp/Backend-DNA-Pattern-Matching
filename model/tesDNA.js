import mongoose from 'mongoose';

const tesDNA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tanggal : String,
    namaPengguna : String,
    namaPenyakit : String,
    similarity : Number,
    status : Boolean,
})

export default mongoose.model('TesDNA', tesDNA)