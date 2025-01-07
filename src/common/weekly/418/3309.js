/**
 * @param {number[]} nums
 * @return {number}
 */
var maxGoodNumber = function (nums) {
  nums.sort((a, b) => {
    let sA = a.toString(2);
    let sB = b.toString(2);
    for (let i = 0; i < sA.length && i < sB.length; i++) {
      if (sA[i] == '1' && sB[i] == '0') return a - b;
      if (sA[i] == '0' && sB[i] == '1') return b - a;
    }
    return sA.length > sB.length ? a - b : b - a;
  });
  console.log(nums);
};
