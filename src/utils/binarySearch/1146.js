/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.snapId = 0
  this.cnt = new Map()
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  if (!this.cnt.has(index)) {
    this.cnt.set(key, [[this.snapId, val]])
  } else {
    this.cnt.get(key).push([this.snapId, val])
  }
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  return this.snapId++
};
const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // console.log(nums[mid], f(nums[mid]))
    if (nums[mid][0] <= target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
/** 
 * @param {number} index 
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  if (!this.cnt.has(index)) {
    return 0
  }
  let list = this.cnt.get(index)
  let index = lowerBound(nums, snap_id)
  return index < list.length ? list[index][1] : 0
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */