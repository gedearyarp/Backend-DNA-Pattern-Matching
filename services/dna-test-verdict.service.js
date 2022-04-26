const {kmp, lcs} = require('../lib/string-algo');

async function verdictDNA(dnaPenyakit, dnaUser) {
    const idx = kmp(dnaPenyakit, dnaUser); // string matching dalam O(n+m)
    if(idx>=0) {
        const verdict = {
            similarity : 100,
            status : true
        };
        return verdict;
    } else {
        const lcs_len = lcs(dnaPenyakit, dnaUser); // longest common subsequence dalam O(n*m)
        const similarity = 100*lcs_len/dnaPenyakit.length;

        const verdict = {
            similarity : similarity,
            status : similarity>=80
        };
        return verdict;
    }
}

module.exports = verdictDNA;