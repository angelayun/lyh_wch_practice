/**
 * @param {number} n
 */
var Allocator = function (n) {
  // 初始化一个长度为 n 的数组，元素初始值都为 0
  this.a = new Array(n).fill(0);
};

/**
 * @param {number} size
 * @param {number} mID
 * @return {number}
 */
Allocator.prototype.allocate = function (size, mID) {
  let cnt = 0;
  // 遍历数组
  for (let i = 0; i < this.a.length; i++) {
    if (this.a[i]) {
      // 如果当前位置已有分配，重置计数器
      cnt = 0;
    } else {
      // 如果当前位置未分配，计数器加 1
      cnt++;
      if (cnt === size) {
        // 找到连续 size 个未分配的位置，进行分配
        for (let j = i - size + 1; j <= i; j++) {
          this.a[j] = mID;
        }
        return i - size + 1;
      }
    }
  }
  return -1;
};

/**
 * @param {number} mID
 * @return {number}
 */
Allocator.prototype.freeMemory = function (mID) {
  let cnt = 0;
  // 遍历数组
  for (let i = 0; i < this.a.length; i++) {
    if (this.a[i] === mID) {
      // 如果当前位置的 ID 等于要释放的 ID
      cnt++;
      // 释放该位置
      this.a[i] = 0;
    }
  }
  return cnt;
};

/**
 * Your Allocator object will be instantiated and called as such:
 * var obj = new Allocator(n)
 * var param_1 = obj.allocate(size,mID)
 * var param_2 = obj.freeMemory(mID)
 */
