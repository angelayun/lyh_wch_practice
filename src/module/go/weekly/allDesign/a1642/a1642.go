package a1642

import "container/heap"

func furthestBuilding(heights []int, bricks int, ladders int) int {
	n := len(heights)
	h := hp{}
	for i := 1; i < n; i++ {
		diff := heights[i] - heights[i-1]
		if diff > 0 {
			heap.Push(&h, diff)
			bricks -= diff
			if bricks < 0 {
				if ladders > 0 {
					ladders--
					cur := heap.Pop(&h).(int)
					bricks += cur
				} else {
					return i - 1
				}
			}
		}
	}
	return n
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []int

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i] > h[j] }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(int)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
