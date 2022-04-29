const lcss = (s, t) => {
    const m = s.length;
    const n = t.length;
    const dp = new Array(n);
    for(let i=0;i<n;i++) {
        dp[i] = new Array(m);
    }
    for(let i=0;i<n;i++) {
        for(let j=0;j<m;j++) {
            if(t[i]===s[j]) {
                if(i>0 && j>0) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = 1;
                }
            } else {
                dp[i][j] = 0;
                if(i>0) {
                    dp[i][j] = Math.max(dp[i][j], dp[i-1][j]);
                }
                if(j>0) {
                    dp[i][j] = Math.max(dp[i][j], dp[i][j-1]);
                }
            }
        }
    }
    return dp[n-1][m-1];
}

const lcs = (s, t) => {
    const m = s.length;
    const n = t.length;
    let ans = 0;
    const dp = new Array(n);
    for(let i=0;i<n;i++) {
        dp[i] = new Array(m);
    }
    for(let i=0;i<n;i++) {
        for(let j=0;j<m;j++) {
            if(t[i]===s[j]) {
                if(i===0 || j===0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = dp[i-1][j-1] + 1;
                }
                ans = Math.max(ans, dp[i][j]);
            } else {
                dp[i][j] = 0;
            }
        }
    }
    return ans;
}

module.exports = lcs;