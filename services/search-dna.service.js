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

const checkFormatSTR = (tanggal,strTanggal) => {
    if(tanggal.toLowerCase() === strTanggal.toLowerCase()) {
        return true;
    }
    const monthIndex = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
    };
    let dmy = strTanggal.split(' ');
    dmy[0] = String(parseInt(dmy[0],10)).padStart(2, '0');
    dmy[1] = String(parseInt(monthIndex[dmy[1]],10)).padStart(2, '0');
    dmy[2] = String(parseInt(dmy[2],10)).padStart(4, '0');
    return tanggal===dmy.join('/') || tanggal===dmy.join('-');
};

async function searchDNA(inputUser) {
    const listTesDNA = await DNATest.find();
    const regexp = /(?<tanggal>^\d{1,2} [A-Z][a-z]* \d{4}|^\d{2}-\d{2}-\d{4}|^\d{2}\/\d{2}\/\d{4})? ?(?<namaPenyakit>[A-Za-z 0-9]+$)?/i;
    const query = await inputUser.match(regexp);

    if(query === null)
        return null;

    let regexpNamaPenyakit;
    if(query.groups.namaPenyakit) {
        regexpNamaPenyakit = new RegExp(".*" + query.groups.namaPenyakit + ".*", 'i');
    }

    return listTesDNA
        .filter(dna => 
            (
                !query.groups.tanggal || 
                checkFormat1(query.groups.tanggal, dna.tanggal)
            ) && (
                !query.groups.namaPenyakit || 
                regexpNamaPenyakit.test(dna.namaPenyakit)
            )
        );
}

// const s1 = "26 april 2022";
// const s2 = "26/04/2022";
// const s3 = "26-04-2022";

// const db = "26 April 2022";

// console.log(checkFormatSTR(s1,db));
// console.log(checkFormatSTR(s2,db));
// console.log(checkFormatSTR(s3,db));

module.exports = searchDNA;