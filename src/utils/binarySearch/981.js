
var TimeMap = function () {
  this.cnt = new Map()
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  if (this.cnt.has(key)) {
    this.cnt.get(key).push([timestamp, value])
  } else {
    this.cnt.set(key, [[timestamp, value]])
  }
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  let list = this.cnt.get(key)
  if (list) {

    let left = 0, right = list.length - 1
    //  找到第1个>=timestamp的
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (list[mid][0] < timestamp) {
        left = mid + 1
      } else if (list[mid][0] > timestamp) {
        right = mid - 1
      } else {
        return list[left][1]
      }
    }
    if (right >= 0) return list[right][1]
  }
  return ""
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */