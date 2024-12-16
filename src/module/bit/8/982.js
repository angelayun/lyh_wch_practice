/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Array(1 << 16).fill(0);
  for (let x of nums) {
    for (let y of nums) {
      cnt[x & y]++;
    }
  }
  console.log(cnt);
  let ans = 0;
  for (let x of nums) {
    for (let i = 0; i < 1 << 16; i++) {
      if ((x & i) == 0) {
        ans += cnt[i];
      }
    }
  }
  return ans;
};

// 下面是第二种解法
/**
 * @param {number[]} nums
 * @return {number}
 */
var countTriplets = function (nums) {
  let cnt = new Array(1 << 16).fill(0);
  for (let x of nums) {
    for (let y of nums) {
      cnt[x & y] += 1;
    }
  }
  let ans = 0;
  for (let m of nums) {
    m ^= 0xffff; // 求出m的补集
    s = m;
    while (true) {
      // 枚举m的子集
      ans += cnt[s];
      // 假设s是8 s-1是7 
      s = (s - 1) & m;
      if (s == m) break;
    }
  }
  return ans;
};
