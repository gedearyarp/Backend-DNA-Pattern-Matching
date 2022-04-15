const {kmp, lcs} = require('../lib/string-algo');

async function verdictDNA(dnaPenyakit, dnaUser) {
    // TODO: menghitung similarity dan status dari dna penyakit dan dna pengguna
    const idx = kmp(dnaPenyakit, dnaUser); // string matching dalam O(n+m)
    if(idx>=0) {
        const verdict = {
            similarity : 100,
            status : true
        };
        return verdict;
    } else {
        lcs_len = lcs(dnaPenyakit, dnaUser); // longest common subsequence dalam O(n*m)
        const verdict = {
            similarity : 100*lcs_len/dnaPenyakit.length,
            status : (this.similarity>=80)
        };
        return verdict;
    }
}

module.exports = verdictDNA;