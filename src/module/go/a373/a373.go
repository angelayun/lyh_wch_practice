package a373

import "container/heap"

func kSmallestPairs(nums1 []int, nums2 []int, k int) [][]int {
	n, m := len(nums1), len(nums2)
	ans := make([][]int, 0, k)
	h := make(hp, min(k, n))
	for i := range h {
		h[i] = tuple{nums1[i] + nums2[0], i, 0}
	}
	for len(ans) < k {
		top := heap.Pop(&h).(tuple)
		i, j := top.i, top.j
		ans = append(ans, []int{nums1[i], nums2[j]})
		if j+1 < m {
			heap.Push(&h, tuple{nums1[i] + nums2[j+1], i, j + 1})
		}
	}
	return ans
}

type tuple struct {
	s, i, j int
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].s < h[j].s }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
