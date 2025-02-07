/**
 * @param {string[]} messages
 * @param {string[]} senders
 * @return {string}
 */
var largestWordCount = function (messages, senders) {
  const n = messages.length;
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    let name = senders[i];
    let list = messages[i].split(' ');
    cnt.set(name, (cnt.get(name) || 0) + list.length);
  }
  let maxVal = -1;
  let res = [];
  for (let [key, val] of cnt) {
    if (maxVal == val) {
      res.push(key);
    } else if (val > maxVal) {
      maxVal = val;
      res = [key];
    }
  }
  res.sort();
  return res[res.length - 1];
};

/**
 * @param {string[]} messages
 * @param {string[]} senders
 * @return {string}
 */
var largestWordCount = function (messages, senders) {
  const n = messages.length;
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    let name = senders[i];
    let list = messages[i].split(' ');
    cnt.set(name, (cnt.get(name) || 0) + list.length);
  }
  let maxVal = -1;
  let res = '';
  for (let [key, val] of cnt) {
    if (maxVal == val) {
      // res.push(key)
      if (res < key) res = key;
    } else if (val > maxVal) {
      maxVal = val;
      res = key;
    }
  }
  return res;
};
// 第二种写法再简洁一点
/**
 * @param {string[]} messages
 * @param {string[]} senders
 * @return {string}
 */
var largestWordCount = function (messages, senders) {
  const n = messages.length;
  let cnt = new Map();
  for (let i = 0; i < n; i++) {
    let name = senders[i];
    let list = messages[i].split(' ');
    cnt.set(name, (cnt.get(name) || 0) + list.length);
  }
  let maxVal = -1;
  let res = '';
  for (let [key, val] of cnt) {
    if (val > maxVal || (maxVal == val && res < key)) {
      maxVal = val;
      res = key;
    }
  }
  return res;
};
