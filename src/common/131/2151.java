class Solution {
    public int maximumGood(int[][] statements) {
        var ans = 0;
        var n = statements.length;
        next:
        for (var i = 1; i < 1 << n; i++) {
            var cnt = 0; // i 中好人个数
            for (var j = 0; j < n; j++) {
                if (((i >> j) & 1) == 1) { // 枚举 i 中的好人 j
                    for (var k = 0; k < n; k++) { // 枚举 j 的所有陈述
                        if (statements[j][k] < 2 && statements[j][k] != ((i >> k) & 1)) { // 该陈述与实际情况矛盾
                            continue next;
                        }
                    }
                    cnt++;
                }
            }
            ans = Math.max(ans, cnt);
        }
        return ans;
    }
}