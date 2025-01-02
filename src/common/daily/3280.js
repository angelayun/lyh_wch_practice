/**
 * @param {string} date
 * @return {string}
 */
var convertDateToBinary = function (date) {
  date = date.split('-');
  return date.map((item) => Number(item).toString(2));
};
