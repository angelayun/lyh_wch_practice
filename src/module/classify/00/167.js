var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (true) {
    let s = numbers[left] + numbers[right];
    if (s === target) {
      return [left + 1, right + 1]; // 题目要求下标从 1 开始
    }
    s > target ? right-- : left++;
  }
};