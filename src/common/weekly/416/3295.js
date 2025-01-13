/**
 * @param {string[]} message
 * @param {string[]} bannedWords
 * @return {boolean}
 */
var reportSpam = function (message, bannedWords) {
  let set = new Set(...bannedWords);
  let cnt = 0;
  for (let ms of message) {
    if (set.has(ms)) {
      cnt++;
      if (cnt >= 2) return true;
    }
  }
  return false;
};
