package a3362

import (
	"container/heap"
	"slices"
)

func maxRemoval(nums []int, queries [][]int) int {
	// 按照左端点从小到大排序
	slices.SortFunc(queries, func(a, b []int) int { return a[0] - b[0] })
	h := hp{}
	n := len(nums)
	m := len(queries)
	diff := make([]int, n+1)
	j := 0
	sumD := 0
	for i, x := range nums {
		sumD += diff[i]
		// 把query中左端点小于i的右端点全部都入堆
		for ; j < m && queries[j][0] <= i; j++ {
			heap.Push(&h, queries[j][1])
		}
		// 如果当前diff的总值不满足条件并且堆中有满足条件的值
		for sumD < x && len(h) > 0 && h[0] >= i {
			sumD++
			diff[heap.Pop(&h).(int)+1]--
		}
		if sumD < x {
			return -1
		}
	}
	return len(h)
}

// hp 定义一个堆类型
type hp []int

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i] > h[j] }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(int)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
