/**
 * @param {number[]} arr
 */
var RangeFreqQuery = function (arr) {
  this.map = {}
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i]
    if (this.map[x] == null) {
      this.map[x] = []
    }
    this.map[x].push(i)
  }
};
const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // console.log(nums[mid], f(nums[mid]))
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
/** 
 * @param {number} left 
 * @param {number} right 
 * @param {number} value
 * @return {number}
 */
RangeFreqQuery.prototype.query = function (left, right, value) {
  if (this.map[value] == null) return 0
  let p = lowerBound(this.map[value], left)
  let q = lowerBound(this.map[value], right + 1)
  return q - p
};

/**
 * Your RangeFreqQuery object will be instantiated and called as such:
 * var obj = new RangeFreqQuery(arr)
 * var param_1 = obj.query(left,right,value)
 */