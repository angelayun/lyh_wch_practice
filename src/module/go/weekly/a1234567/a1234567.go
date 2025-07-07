package a1234567

import (
	"container/heap"
	"math"
)

func minCost(m int, n int, waitCost [][]int) int64 {
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	h := hp{{0, 0, 0, 1 * 1}}
	dis[0][0] = 1 * 1
	for len(h) > 0 {
		p := heap.Pop(&h).(pair)
		i, j, flag, val := p.i, p.j, p.flag, p.val
		if i == m-1 && j == n-1 {
			return int64(val)
		}
		if val > dis[i][j] {
			continue
		}
		if flag == 0 {
			// 进入等待
			if j+1 < n {
				newVal := val + (i+1)*(j+2)
				if newVal < dis[i][j+1] {
					dis[i][j+1] = newVal
					heap.Push(&h, pair{i, j + 1, flag ^ 1, newVal})
				}
			}
			if i+1 < m {
				newVal := val + (i+2)*(j+1)
				if newVal < dis[i+1][j] {
					dis[i+1][j] = newVal
					heap.Push(&h, pair{i + 1, j, flag ^ 1, newVal})
				}

			}
		} else {
			newVal := val + waitCost[i][j]
			if newVal < dis[i][j] {
				dis[i][j] = newVal
				heap.Push(&h, pair{i, j, flag ^ 1, newVal})
			}
		}
	}
	return -1
}

type pair struct {
	i int
	j int
	// 为true表示奇数
	flag int
	val  int
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []pair

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照概率从大到小排序
func (h hp) Less(i, j int) bool { return h[i].val < h[j].val }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(pair)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
