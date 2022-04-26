const DNATest = require('../models/dna-test');

const checkFormat1 = (tanggal,val) => {
    const date = new Date(val);
    const options = {
        day: "numeric", 
        month: "long", 
        year: "numeric"
    };
    const options2 = {
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric"
    };

    return  tanggal.toLowerCase() === date.toLocaleString("id-ID", options).toLowerCase() || 
            tanggal.split('-').join('/') === date.toLocaleString("id-ID", options2);
};

async function searchDNA(inputUser) {
    const listTesDNA = await DNATest.find();
    const regexp = /(?<tanggal>^\d{1,2} [A-Z][a-z]* \d{4}|^\d{2}-\d{2}-\d{4}|^\d{2}\/\d{2}\/\d{4})? ?(?<namaPenyakit>[A-Za-z 0-9]+$)?/i;
    const query = await inputUser.match(regexp);

    if(query === null)
        return null;
    
    return listTesDNA
        .filter(dna => 
            (
                query.groups.tanggal === undefined || 
                checkFormat1(query.groups.tanggal, dna.tanggal)
            ) && (
                query.groups.namaPenyakit === undefined || 
                query.groups.namaPenyakit.toLowerCase() === dna.namaPenyakit.toLowerCase()
            )
        );
}

module.exports = searchDNA;