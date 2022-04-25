const DNATest = require('../models/dna-test');

const checkFormat1 = (tanggal,val) => {
    const options = {day: "numeric", month: "long", year: "numeric"};
    const date = new Date(val);
    return tanggal.toLowerCase() === date.toLocaleString("id-ID", options).toLowerCase();
};

async function seacrhDNA(inputUser) {
    // TODO: mengembalikan list id test dna yang sesuai dengan input user
    // untuk akses data dna test, gunakan method find agar dapat list data keseluruhan (cari google kalo bingung)
    const listTesDNA = await DNATest.find();
    const regexp = /(?<tanggal>^\d{1,2} [A-Z][a-z]* \d{4})? ?(?<namaPenyakit>[A-Za-z 0-9]+$)?/i;
    const query = inputUser.match(regexp);
    return listTesDNA.filter(dna => {
        (query.tanggal===undefined || checkFormat1(query.tanggal,dna.tanggal)) && (query.namaPenyakit===undefined || query.namaPenyakit.toLowerCase()===dna.namaPenyakit.toLowerCase());
    }).map(dna => dna._id); // note: kalo inputUser="", return semua data
}

module.exports = seacrhDNA;