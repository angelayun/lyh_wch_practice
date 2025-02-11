// import countGoodIntegers from '@/common/weekly/d138/3272';
import { useEffect } from 'react';
/* 
// 定义链表节点类
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
// 合并 K 个升序链表的函数
function mergeKLists(lists) {
  // 提供 priority 回调函数，根据节点的 val 属性确定优先级
  const pq = new MinPriorityQueue({ priority: (node) => node.val });
  // 将每个链表的头节点加入优先队列
  for (const list of lists) {
    if (list) {
      pq.enqueue(list);
    }
  }
  const dummy = new ListNode();
  let tail = dummy;
  // 不断从优先队列中取出最小节点
  while (!pq.isEmpty()) {
    const node = pq.dequeue().element;
    tail.next = node;
    tail = tail.next;
    if (node.next) {
      pq.enqueue(node.next);
    }
  }
  return dummy.next;
}
// 辅助函数：将数组转换为链表
function arrayToList(arr) {
  const dummy = new ListNode();
  let tail = dummy;
  for (const val of arr) {
    tail.next = new ListNode(val);
    tail = tail.next;
  }
  return dummy.next;
}
// 辅助函数：将链表转换为数组
function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}
// 测试数据
const lists = [
  arrayToList([1, 4, 5]),
  arrayToList([1, 3, 4]),
  arrayToList([2, 6]),
];
// 调用合并函数
const mergedList = mergeKLists(lists);
// 输出合并后的链表
const resultArray = listToArray(mergedList);
console.log(resultArray); */

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
    console.log(
      methods.networkDelayTime(
        [
          [2, 1, 1],
          [2, 3, 1],
          [3, 4, 1],
        ],
        4,
        2
      )
    );
    /* console.log(
      methods.mergeKLists([
        [1, 4, 5],
        [1, 3, 4],
        [2, 6],
      ])
    ); */
    // methods.searchRange([5, 7, 7, 8, 8, 10], 8);
  }, []);
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
    </div>
  );
}
