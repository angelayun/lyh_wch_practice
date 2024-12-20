class Solution {
  public int maximumRows(int[][] mat, int numSelect) {
      int m = mat.length, n = mat[0].length;
      int[] mask = new int[m];
      for (int i = 0; i < m; i++) {
          for (int j = 0; j < n; j++) {
              mask[i] |= mat[i][j] << j;
          }
      }

      int ans = 0;
      for (int subset = 0; subset < (1 << n); subset++) {
          if (Integer.bitCount(subset) == numSelect) {
              int coveredRows = 0;
              for (int row : mask) {
                  if ((row & subset) == row) {
                      coveredRows++;
                  }
              }
              ans = Math.max(ans, coveredRows);
          }
      }
      return ans;
  }
}


// 上面是第一种  下面是第二种
class Solution {
    public int maximumRows(int[][] mat, int numSelect) {
        int m = mat.length, n = mat[0].length;
        int[] mask = new int[m];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                mask[i] |= mat[i][j] << j;
            }
        }

        int ans = 0;
        int subset = (1 << numSelect) - 1;
        while (subset < (1 << n)) {
            int coveredRows = 0;
            for (int row : mask) {
                if ((row & subset) == row) {
                    coveredRows++;
                }
            }
            ans = Math.max(ans, coveredRows);
            int lb = subset & -subset;
            int x = subset + lb;
            subset = ((subset ^ x) / lb >> 2) | x;
        }
        return ans;
    }
}
