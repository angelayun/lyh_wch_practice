var getSmallestString = function (s, k) {
  let t = s.split('');
  for (let i = 0; i < t.length; i++) {
    const dis = Math.min(
      // 直接变到a
      t[i].charCodeAt(0) - 'a'.charCodeAt(0),
      // 变到z再到a    因为是循环的
      'z'.charCodeAt(0) - t[i].charCodeAt(0) + 1
    );
    if (dis > k) {
      // 不够了 直接向下变
      t[i] = String.fromCharCode(t[i].charCodeAt(0) - k);
      break;
    }
    t[i] = 'a';
    k -= dis;
  }
  return t.join('');
};
