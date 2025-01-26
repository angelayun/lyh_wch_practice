import yayJpg from '../assets/yay.jpg';
// import substringXorQueries from '@/utils/bit/2564'
// import minDistance from '../draft/draft20241018/aaa.js'
// import numberOfWays from '../common/322/2787.js';
// import rob from '@/draft/0draft1105/213.js';
// import NeighborSum from '@/draft/0draft1105/3242';
// import NeighborSum from '@/common/daily/3242_ls';
// import hasIncreasingSubarrays from '@/draft/0aa1116/3349';
// import sumOfGoodSubsequences from '@/draft/0aa1116/3351'
// import findXSum from '@/weekly/3318'
// import subsequencePairCount from '@/draft/0aa1119/3336';
// import shortestDistanceAfterQueries from '@/draft/0aa1119/3344';
// import finalPositionOfSnake from '@/draft/0aa1119/3248';
// import recoverFromPreorder from '@/module/tree/2_10/1028.js'
// import productQueries from '@/module/dataStructure/1_1/2438';
// import minOperations from '@/common/accu/2835.pefect';
// import minSumSquareDiff from '@/common/weekly/toCommit/2333';
// import findAnswer from '@/common/weekly/420/3327';
// import continuousSubarrays from '@/module/sliderWindow/1_1/2762'
// import maxSum from '@/module/sliderWindow/1_1/2841';
// import decrypt from '@/module/sliderWindow/1_1/1652';
// import getSubarrayBeauty from '@/module/sliderWindow/1_2/2653';
// import maxFreq from '@/module/sliderWindow/1_2/1297';
// import calculateScore from '@/common/weekly/431/3412';
// import countGoodArrays from '@/common/weekly/430/3405';
// import gcdValues from '@/common/weekly/418/3312';
// import minimumOperations from '@/common/weekly/430/3402.self'
// import constructGridLayout from '@/common/weekly/418/3311.js';
// import smallestTrimmedNumbers from '@/common/weekly/302/2343';
import equalPairs from '@/common/weekly/303/2352'
export default function HomePage() {
  // console.log(finalPositionOfSnake(3, ['DOWN', 'RIGHT', 'UP']));
  // console.log(finalPositionOfSnake(2, ['RIGHT', 'DOWN']));
  // console.log(recoverFromPreorder("1-2--3--4-5--6--7"))

  /* console.log(
    shortestDistanceAfterQueries(5, [
      [2, 4],
      [0, 2],
      [0, 4],
    ])
  ); */
  console.log('没有到这里么');
  // console.log(
  //   constructGridLayout(4, [
  //     [0, 1],
  //     [0, 2],
  //     [1, 3],
  //     [2, 3],
  //   ])
  // );
 /*  console.log(
    smallestTrimmedNumbers(
      ['102', '473', '251', '814'],
      [
        [1, 1],
        [2, 3],
        [4, 2],
        [1, 2],
      ]
    )
  ); */
  console.log(equalPairs([[3,2,1],[1,7,6],[2,7,7]]))
  // console.log(maxFreq('aababcaab', 2, 3, 4));
  // console.log(maxFreq('aaaa', 1, 3, 3));
  // console.log(countGoodArrays(3, 2, 1));
  // console.log(gcdValues([2, 3, 4], [0, 2, 2]));
  // console.log(getSubarrayBeauty([1, -1, -3, -2, 3], 3, 2));
  // console.log(getSubarrayBeauty([-3, 1, 2, -3, 0, -3], 2, 1));
  // console.log(minOperations([1, 32, 1, 2], 12));
  // console.log(minSumSquareDiff([3, 5, 4, 4], [1, 2, 1, 0], 2, 4));
  // console.log(findAnswer([-1, 0, 0, 1, 1, 2], 'aababa'));
  // console.log(continuousSubarrays([5,4,2,4]))
  // console.log(maxSum([2, 6, 7, 3, 1, 7], 3, 4));
  // console.log(decrypt([5, 7, 1, 4], 3));

  /* console.log(
    productQueries(15, [
      [0, 1],
      [2, 2],
      [0, 3],
    ])
  ); */
  // console.log(findXSum([1,1,2,2,3,4,2,3],6,2))
  // console.log(subsequencePairCount([1, 2, 3, 4]));
  // hasIncreasingSubarrays([-3, -19, -8, -16], 2);
  // console.log(sumOfGoodSubsequences([1,2,1]))
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
  /*  let ns = new NeighborSum([
    [3, 6, 0],
    [8, 5, 1],
    [2, 4, 7],
  ]); */
  /* [1],
    [3],
    [7],
    [2],
    [5],
    [8],
    [0], */
  /*  ns.adjacentSum(1);
  ns.adjacentSum(3);
  ns.adjacentSum(7);
  ns.adjacentSum(2);
  ns.adjacentSum(5);
  ns.adjacentSum(8);
  ns.adjacentSum(0); */

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

  /* ns.diagonalSum(1);
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
 */
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
