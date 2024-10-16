/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let begin = 0,
    end = nums.length - 1;
  while (begin <= end) {
    // 下面这样写是考虑大数情况下避免溢出
    let mid = begin + ((end - begin) >> 1);
    if (nums[mid] == target) {
      return mid;
    } else {
      // 细节点在于里面的判断全部都是<= 或>= 而不是<或>
      // 如果左半部分是有序的的
      if (nums[begin] <= nums[mid]) {
        //target在[ nums[begin],nums[mid] ]中，那么就在这段有序区间查找
        if (nums[begin] <= target && target <= nums[mid]) {
          end = mid - 1;
        } else {
          //否则去反方向查找
          begin = mid + 1;
        }
      } else {
        // 右半部分是有序的
        //target在[ nums[mid],nums[end] ]中，那么就在这段有序区间查找
        if (nums[mid] <= target && target <= nums[end]) {
          begin = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }
  }
  return -1;
};