class Solution {
  private static final int MOD = 1_000_000_007;

  public int[] getFinalState(int[] nums, int k, int multiplier) {
      if (multiplier == 1) { // 数组不变
          return nums;
      }

      int n = nums.length;
      int mx = 0;
      PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
      for (int i = 0; i < n; i++) {
          mx = Math.max(mx, nums[i]);
          pq.offer(new long[]{nums[i], i});
      }

      // 模拟，直到堆顶是 mx
      for (; k > 0 && pq.peek()[0] < mx; k--) {
          long[] p = pq.poll();
          p[0] *= multiplier;
          pq.offer(p);
      }

      // 剩余的操作可以直接用公式计算
      for (int i = 0; i < n; i++) {
          long[] p = pq.poll();
          nums[(int) p[1]] = (int) (p[0] % MOD * pow(multiplier, k / n + (i < k % n ? 1 : 0)) % MOD);
      }
      return nums;
  }

  private long pow(long x, int n) {
      long res = 1;
      for (; n > 0; n /= 2) {
          if (n % 2 > 0) {
              res = res * x % MOD;
          }
          x = x * x % MOD;
      }
      return res;
  }
}