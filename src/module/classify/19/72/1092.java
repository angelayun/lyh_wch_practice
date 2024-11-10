// 会超时的递归代码
class Solution {
    public String shortestCommonSupersequence(String s, String t) {
        if (s.isEmpty()) return t; // s 是空串，返回剩余的 t
        if (t.isEmpty()) return s; // t 是空串，返回剩余的 s
        var s1 = s.substring(0, s.length() - 1);
        var t1 = t.substring(0, t.length() - 1);
        var x = s.charAt(s.length() - 1);
        var y = t.charAt(t.length() - 1);
        if (x == y) // 最短公共超序列一定包含 x
            return shortestCommonSupersequence(s1, t1) + x;
        var ans1 = shortestCommonSupersequence(s1, t);
        var ans2 = shortestCommonSupersequence(s, t1);
        if (ans1.length() < ans2.length()) // 取 ans1 和 ans2 中更短的组成答案
            return ans1 + x;
        return ans2 + y;
    }
}




// 能通过的测试数据更多，但超内存了，还需要进一步优化
class Solution {
    private String s, t;
    private String[][] memo;

    public String shortestCommonSupersequence(String str1, String str2) {
        s = str1;
        t = str2;
        memo = new String[s.length()][t.length()];
        return dfs(s.length() - 1, t.length() - 1);
    }

    // dfs(i,j) 返回 s 的前 i 个字母和 t 的前 j 个字母的最短公共超序列
    private String dfs(int i, int j) {
        if (i < 0) return t.substring(0, j + 1); // s 是空串，返回剩余的 t
        if (j < 0) return s.substring(0, i + 1); // t 是空串，返回剩余的 s
        if (memo[i][j] != null) return memo[i][j]; // 避免重复计算 dfs 的结果
        if (s.charAt(i) == t.charAt(j)) // 最短公共超序列一定包含 s[i]
            return memo[i][j] = dfs(i - 1, j - 1) + s.charAt(i);
        var ans1 = dfs(i - 1, j);
        var ans2 = dfs(i, j - 1);
        if (ans1.length() < ans2.length()) // 取 ans1 和 ans2 中更短的组成答案
            return memo[i][j] = ans1 + s.charAt(i);
        return memo[i][j] = ans2 + t.charAt(j);
    }
}


class Solution {
    private String s, t;
    private int[][] memo;

    public String shortestCommonSupersequence(String str1, String str2) {
        s = str1;
        t = str2;
        memo = new int[s.length()][t.length()];
        return makeAns(s.length() - 1, t.length() - 1);
    }

    // dfs(i,j) 返回 s 的前 i 个字母和 t 的前 j 个字母的最短公共超序列的长度
    private int dfs(int i, int j) {
        if (i < 0) return j + 1; // s 是空串，返回剩余的 t 的长度
        if (j < 0) return i + 1; // t 是空串，返回剩余的 s 的长度
        if (memo[i][j] > 0) return memo[i][j]; // 避免重复计算 dfs 的结果
        if (s.charAt(i) == t.charAt(j)) // 最短公共超序列一定包含 s[i]
            return memo[i][j] = dfs(i - 1, j - 1) + 1;
        return memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - 1)) + 1;
    }

    // makeAns(i,j) 返回 s 的前 i 个字母和 t 的前 j 个字母的最短公共超序列
    // 看上去和 dfs 没啥区别，但是末尾的递归是 if-else
    // makeAns(i-1,j) 和 makeAns(i,j-1) 不会都调用
    // 所以 makeAns 的递归树仅仅是一条链
    private String makeAns(int i, int j) {
        if (i < 0) return t.substring(0, j + 1); // s 是空串，返回剩余的 t
        if (j < 0) return s.substring(0, i + 1); // t 是空串，返回剩余的 s
        if (s.charAt(i) == t.charAt(j)) // 最短公共超序列一定包含 s[i]
            return makeAns(i - 1, j - 1) + s.charAt(i);
        // 如果下面 if 成立，说明上面 dfs 中的 min 取的是 dfs(i - 1, j)
        // 说明 dfs(i - 1, j) 对应的公共超序列更短
        // 那么就在 makeAns(i - 1, j) 的结果后面加上 s[i]
        // 否则说明 dfs(i, j - 1) 对应的公共超序列更短
        // 那么就在 makeAns(i, j - 1) 的结果后面加上 t[j]
        if (dfs(i, j) == dfs(i - 1, j) + 1)
            return makeAns(i - 1, j) + s.charAt(i);
        return makeAns(i, j - 1) + t.charAt(j);
    }
}



class Solution {
    public String shortestCommonSupersequence(String str1, String str2) {
        // f[i+1][j+1] 表示 s 的前 i 个字母和 t 的前 j 个字母的最短公共超序列的长度
        char[] s = str1.toCharArray(), t = str2.toCharArray();
        int n = s.length, m = t.length;
        var f = new int[n + 1][m + 1];
        for (int j = 1; j <= m; ++j) f[0][j] = j; // 递归边界
        for (int i = 1; i <= n; ++i) f[i][0] = i; // 递归边界
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < m; ++j)
                if (s[i] == t[j]) // 最短公共超序列一定包含 s[i]
                    f[i + 1][j + 1] = f[i][j] + 1;
                else // 取更短的组成答案
                    f[i + 1][j + 1] = Math.min(f[i][j + 1], f[i + 1][j]) + 1;

        int na = f[n][m];
        var ans = new char[na];
        for (int i = n - 1, j = m - 1, k = na - 1; ; ) {
            if (i < 0) { // s 是空串，剩余的 t 就是最短公共超序列
                System.arraycopy(t, 0, ans, 0, j + 1);
                break; // 相当于递归边界
            }
            if (j < 0) { // t 是空串，剩余的 s 就是最短公共超序列
                System.arraycopy(s, 0, ans, 0, i + 1);
                break; // 相当于递归边界
            }
            if (s[i] == t[j]) { // 公共超序列一定包含 s[i]
                ans[k--] = s[i--]; // 倒着填 ans
                --j; // 相当于继续递归 makeAns(i - 1, j - 1)
            } else if (f[i + 1][j + 1] == f[i][j + 1] + 1)
                ans[k--] = s[i--]; // 相当于继续递归 makeAns(i - 1, j)
            else
                ans[k--] = t[j--]; // 相当于继续递归 makeAns(i, j - 1)
        }
        return new String(ans);
    }
}
