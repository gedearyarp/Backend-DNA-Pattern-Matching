const kmp = require('../lib/kmp');
const lcs = require('../lib/lcs');

async function verdictDNA(dnaPenyakit, dnaUser) {
    const idx = kmp(dnaPenyakit, dnaUser);
    if(idx>=0) {
        const verdict = {
            similarity : 100,
            status : true
        };
        return verdict;
    } else {
        const lcs_len = lcs(dnaPenyakit, dnaUser);
        const similarity = 100*lcs_len/dnaPenyakit.length;

        const verdict = {
            similarity : similarity,
            status : similarity>=80
        };
        return verdict;
    }
}

module.exports = verdictDNA;