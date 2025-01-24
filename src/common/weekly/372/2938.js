var minimumSteps = function (s) {
  let ans = 0;
  let cnt1 = 0;
  for (const c of s) {
    if (c === '1') {
      cnt1++;
    } else {
      ans += cnt1;
    }
  }
  return ans;
};
