/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSubarrays = function (nums) {
    let ans = 0
    let s = 0
    let cnt = new Map([[s, 1]])
    for (let x of nums) {
        s ^= x
        ans += cnt.get(s, 0) || 0
        cnt.set(s, (cnt.get(s) || 0) + 1)
    }
    return ans
};