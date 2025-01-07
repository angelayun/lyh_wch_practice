let kinds = [20, 50, 100, 200, 500];
var ATM = function () {
  this.banknotes = new Array(kinds.length).fill(0);
};

/**
 * @param {number[]} banknotesCount
 * @return {void}
 */
ATM.prototype.deposit = function (banknotesCount) {
  for (let i = 0; i < banknotesCount.length; i++) {
    this.banknotes[i] += banknotesCount[i];
  }
};

/**
 * @param {number} amount
 * @return {number[]}
 */
ATM.prototype.withdraw = function (amount) {
  let ans = new Array(kinds.length).fill(0);
  for (let i = kinds.length - 1; i >= 0; i--) {
    ans[i] = Math.min(Math.floor(amount / kinds[i]), this.banknotes[i]);
    amount -= ans[i] * kinds[i];
  }
  if (amount > 0) {
    return [-1];
  }
  for (let i = kinds.length - 1; i >= 0; i--) {
    this.banknotes[i] -= ans[i];
  }
};

/**
 * Your ATM object will be instantiated and called as such:
 * var obj = new ATM()
 * obj.deposit(banknotesCount)
 * var param_2 = obj.withdraw(amount)
 */
