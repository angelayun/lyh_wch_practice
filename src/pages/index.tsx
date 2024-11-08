import yayJpg from '../assets/yay.jpg';
// import substringXorQueries from '@/utils/bit/2564'
// import minDistance from '../draft/draft20241018/aaa.js'
// import numberOfWays from '../common/322/2787.js';
import rob from '@/draft/0draft1105/213.js';
export default function HomePage() {
  // console.log(substringXorQueries('101101',[[0,5],[1,2]]))
  // console.log(minDistance("","a"))
  // console.log(numberOfWays(10, 2));
  // console.log(numberOfWays(4, 1));
  console.log(rob([2, 3, 2]));
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
