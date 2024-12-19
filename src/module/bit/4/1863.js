/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function (nums) {
  let sum = 0;
  const n = nums.length;
  const backtrack = (value, index) => {
    if (index == n) {
      // 到达最后 找到一个合适的值
      sum += value;
    } else {
      // 不选
      backtrack(value, index + 1);
      // 选
      backtrack(value ^ nums[index], index + 1);
    }
  };
  backtrack(0, 0);
  return sum;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function (nums) {
  let sum = 0;
  const n = nums.length;
  let total = 1 << n;
  // mask是每个数选或不选的全集
  for (let mask = 0; mask < total; mask++) {
    // 将 mask 看成 n 位二进制数，该二进制数的从低到高的第 i 位表示 nums[i] 是否属于子集，每个 1 对应一个属于子集的元素，每个 0 对应一个不属于子集的元素。
    let value = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        value ^= nums[i];
      }
    }
    // 对于每个子集，计算所有属于子集的元素的按位异或运算结果 value，并将所有子集的按位异或运算结果之和增加 value。
    sum += value;
  }
  return sum;
};
// todo 这个理解的还不是很深刻