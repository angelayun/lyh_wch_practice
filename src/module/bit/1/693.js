/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
  // ^的本质是不同就是1  相同就是0
  let a = n ^ (n >> 1); // a最终的结果是所有位数上都是1
  // 以n=5 举例 a=7 a+1=8
  // 所有位数是是1的 与它的+1 进行&操作就都为0了
  return (a & (a + 1)) == 0;
};
