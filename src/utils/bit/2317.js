/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumXOR = function (nums) {
  let res = 0
  for (let x of nums) {
    res |= x;
  }
  return res
};

// git config --global user.name "liyunhua"
// git config --global user.email "liyunhua_angela@163.com"

// ssh-keygen -t rsa -C "liyunhua_angela@163.com"