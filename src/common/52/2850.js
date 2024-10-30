var minimumMoves = function(grid) {
  const from = [];
  const to = [];
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] > 1) {
              for (let k = 1; k < grid[i][j]; k++) {
                  from.push([i, j]);
              }
          } else if (grid[i][j] === 0) {
              to.push([i, j]);
          }
      }
  }
  
  let ans = Infinity;
  for (let from2 of permute(from)) {
      let total = 0;
      for (let i = 0; i < from2.length; i++) {
          total += Math.abs(from2[i][0] - to[i][0]) + Math.abs(from2[i][1] - to[i][1]);
      }
      ans = Math.min(ans, total);
  }
  return ans;
};

function permute(arr) {
  const result = [];
  perm(arr, 0, result);
  return result;
}

function perm(arr, start, result) {
  if (start === arr.length) {
      result.push([...arr]);
  }
  for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      perm(arr, start + 1, result);
      [arr[start], arr[i]] = [arr[i], arr[start]];
  }
}
