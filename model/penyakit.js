import mongoose from 'mongoose';

const penyakit = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namaPenyakit : String,
    sequenceDNA : String,
})

export default mongoose.model('Penyakit', penyakit)