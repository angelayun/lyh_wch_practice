import yayJpg from '../assets/yay.jpg';
// import substringXorQueries from '@/utils/bit/2564'
import minDistance from '../draft/draft20241018/aaa.js'
export default function HomePage() {
  // console.log(substringXorQueries('101101',[[0,5],[1,2]]))
  console.log(minDistance("","a"))
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
