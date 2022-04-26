// border function for kmp algo in O(n)
const border = s => {
    const n = s.length;
    const b = new Array(n);
    b[0] = 0;
    for(let i=1,j=b[i-1];i<n;i++) {
        while(j>0 && s[i]!==s[j]) {
            j = b[j-1];
        }
        if(s[i]===s[j]) {
            j++;
        }
        b[i] = j;
    }
    return b;
};

// kmp algo in O(n+m)
const kmp = (pattern, text) => {
    const m = pattern.length;
    const n = text.length;
    const b = border(pattern);
    let i = 0;
    let j = 0;
    while(i<n) {
        if(pattern[j]===text[i]) {
            if(j===m-1) {
                return i-m+1;
            }
            i++;
            j++;
        } else if(j>0) {
            j = b[j-1];
        } else {
            i++;
        }
    }
    return -1;
}

module.exports = kmp;