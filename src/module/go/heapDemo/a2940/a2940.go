package a2940

import "container/heap"

func leftmostBuildingQueries(heights []int, queries [][]int) []int {
	m := len(queries)
	ans := make([]int, m)
	for i := range ans {
		ans[i] = -1
	}
	n := len(heights)
	qs := make([][]tuple, n)
	for i, q := range queries {
		a, b := q[0], q[1]
		// 确保a<=b
		if a > b {
			a, b = b, a
		}
		if a == b || heights[a] < heights[b] {
			// 左边矮的可以跳到高的
			ans[i] = b
		} else {
			// 离线询问的时候要用
			qs[b] = append(qs[b], tuple{heights[a], i})
		}
	}
	h := hp{}
	for i, x := range heights {
		for len(h) > 0 && h[0].h < x {
			// 堆顶的heights[a]可以跳到heights[i]
			ans[heap.Pop(&h).(tuple).i] = i
		}
		for _, p := range qs[i] {
			heap.Push(&h, p)
		}
	}
	return ans
}

type tuple struct {
	h, i int
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].h < h[j].h }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
