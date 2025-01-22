/**
 * @param {number[]} batteryPercentages
 * @return {number}
 */
var countTestedDevices = function (a) {
  let ans = 0;
  for (let i = 0; i < a.length; i++) {
    let x = a[i];
    if (x > 0) {
      ans++;
      for (let j = i + 1; j < a.length; j++) {
        a[j] -= 1;
      }
    }
  }
  return ans;
};
/**
 * @param {number[]} batteryPercentages
 * @return {number}
 */
var countTestedDevices = function (a) {
  let ans = 0;
  let dec = 0;
  for (let i = 0; i < a.length; i++) {
    let x = a[i];
    if (x - dec > 0) {
      ans++;
      dec++;
    }
  }
  return ans;
};

var countTestedDevices = function (a) {
  let dec = 0;
  for (let i = 0; i < a.length; i++) {
    let x = a[i];
    if (x - dec > 0) {
      dec++;
    }
  }
  return dec;
};