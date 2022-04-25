const DNATest = require('../models/dna-test');

async function seacrhDNA(inputUser) {
    // TODO: mengembalikan list id test dna yang sesuai dengan input user
    // untuk akses data dna test, gunakan method find agar dapat list data keseluruhan (cari google kalo bingung)
    const listTesDNA = await DNATest.find()
    const regexp = /(?<tanggal>^\d{1,2} [A-Z][a-z]* \d{4})? ?(?<namaPenyakit>[A-Za-z 0-9]+$)?/
    const query = inputUser.match(regexp);
    return listTesDNA.filter(dna => {
        (query.tanggal===undefined || query.tanggal===dna.tanggal) && (query.namaPenyakit===undefined || query.namaPenyakit===dna.namaPenyakit)
    }).map(dna => dna._id); // note: kalo input user="", return semua data
}

module.exports = seacrhDNA;