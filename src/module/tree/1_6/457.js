/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function (nums) {
  const n = nums.length;
  const next = (i) => {
    return (((i + nums[i]) % n) + n) % n;
  };
  for (let i = 0; i < n; i++) {
    let slow = i,
      fast = next(i);
    while (nums[fast] * nums[slow] > 0 && nums[next(fast)] * nums[slow] > 0) {
      if (fast == slow) {
        // 存在长度k为1的同向环
        if (slow == next(slow)) break;
        else return true;
      }
      fast = next(next(fast));
      slow = next(slow);
    }
  }
  return false;
};
