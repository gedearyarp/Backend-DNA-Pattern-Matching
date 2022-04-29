LastOcc = pattern => {
    // store last occurence of each ASCII
    const last = new Array(128);
    for(let i=0;i<128;i++) {
        last[i] = -1;
    }
    for(let i=0;i<pattern.length;i++) {
        last[pattern[i].charCodeAt(0)] = i;
    }
    return last;
};

bm = (pattern, text) => {
    const m = pattern.length;
    const n = text.length;
    const last = LastOcc(pattern);
    let i = m-1;

    if(i>n-1) return -1;
    let j = m-1;
    while(i<=n-1) {
        if(pattern[j]===text[i]) {
            if(j===0) {
                return i;
            } else {
                i--;
                j--;
            }
        } else {
            let lo = last[text[i].charCodeAt(0)];
            i += m - Math.min(j, 1+lo);
            j = m-1;
        }
    }
    return -1; 
}

module.exports = bm;
