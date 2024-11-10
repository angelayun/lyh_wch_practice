import yayJpg from '../assets/yay.jpg';
// import substringXorQueries from '@/utils/bit/2564'
// import minDistance from '../draft/draft20241018/aaa.js'
// import numberOfWays from '../common/322/2787.js';
// import rob from '@/draft/0draft1105/213.js';
// import NeighborSum from '@/draft/0draft1105/3242';
import NeighborSum from '@/common/daily/3242_ls';
export default function HomePage() {
  /*   [
    [
      [
        [3, 6, 0],
        [8, 5, 1],
        [2, 4, 7],
      ],
    ],
    
    
  ]; */
  // console.log(substringXorQueries('101101',[[0,5],[1,2]]))
  // console.log(minDistance("","a"))
  // console.log(numberOfWays(10, 2));
  // console.log(numberOfWays(4, 1));
  // console.log(rob([2, 3, 2]));
  let ns = new NeighborSum([
    [3, 6, 0],
    [8, 5, 1],
    [2, 4, 7],
  ]);
  /* [1],
    [3],
    [7],
    [2],
    [5],
    [8],
    [0], */
  ns.adjacentSum(1);
  ns.adjacentSum(3);
  ns.adjacentSum(7);
  ns.adjacentSum(2);
  ns.adjacentSum(5);
  ns.adjacentSum(8);
  ns.adjacentSum(0);

  /* [1],
  [4],
  [8],
  [6],
  [3],
  [2],
  [6],
  [5],
  [7],
  [4],
  [0], */

  ns.diagonalSum(1);
  ns.diagonalSum(4);
  ns.diagonalSum(8);
  ns.diagonalSum(6);
  ns.diagonalSum(3);
  ns.diagonalSum(2);
  ns.diagonalSum(6);
  ns.diagonalSum(5);
  ns.diagonalSum(7);
  ns.diagonalSum(4);
  ns.diagonalSum(0);

  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
