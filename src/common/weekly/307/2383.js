/**
 * @param {number} initialEnergy
 * @param {number} initialExperience
 * @param {number[]} energy
 * @param {number[]} experience
 * @return {number}
 */
var minNumberOfHours = function (
  initialEnergy,
  initialExperience,
  energy,
  experience
) {
  let ans = 0;
  const n = energy.length;
  for (let i = 0; i < n; i++) {
    let x = energy[i];
    if (initialEnergy < x) {
      ans += x + 1 - initialEnergy;
      initialEnergy = x + 1;
    }

    let y = experience[i];
    if (initialExperience < y) {
      ans += y + 1 - initialExperience;
      initialExperience = y + 1;
    }
  }
  return ans;
};
