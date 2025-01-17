var minOperations = function (nums, k) {
  const pq = new MinPriorityQueue(); // datastructures-js/priority-queue@5.4.0
  for (const x of nums) {
    pq.enqueue(x);
  }

  let ans = 0;
  while (pq.front().element < k) {
    const x = pq.dequeue().element;
    const y = pq.dequeue().element;
    pq.enqueue(x * 2 + y);
    ans++;
  }
  return ans;
};
// 最小堆的经典模板
