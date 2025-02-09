// import countGoodIntegers from '@/common/weekly/d138/3272';

import { useEffect } from 'react';

// @ts-ignore
const modules = require.context('@/myUtils', true, /\.js$/);

// 定义一个对象存储所有方法
const methods: Record<string, any> = {};

// 遍历所有匹配的文件并合并方法
modules.keys().forEach((fileName: any) => {
  if (fileName.endsWith('ignore.js')) return;
  const module = modules(fileName);
  Object.assign(methods, module); // 合并方法
});

export default function HomePage() {
  useEffect(() => {
    console.log(methods);
    methods.searchRange([5, 7, 7, 8, 8, 10], 8);
  }, []);
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
    </div>
  );
}
