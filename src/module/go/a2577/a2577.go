package a2577

import (
	"container/heap"
	"math"
)

var dirs = []struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

func minimumTime(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	if grid[0][1] > 1 && grid[1][0] > 1 { // 无法等待
		return -1
	}
	dis := make([][]int, m)
	for i := range dis {
		dis[i] = make([]int, n)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0
	h := hp{{0, 0, 0}}
	heap.Init(&h)
	for { // 可以等待就一定可以到达终点
		top := heap.Pop(&h).(tuple)
		i, j := top.x, top.y
		if i == m-1 && j == n-1 { // 找到终点，此时d一定是最短路
			return top.dis
		}
		if top.dis > dis[i][j] {
			continue
		}
		for _, d := range dirs {
			x, y := i+d.x, j+d.y
			if x >= 0 && x < m && y >= 0 && y < n {
				newD := max(top.dis+1, grid[x][y])
				newD += (newD - x - y) % 2
				if newD < dis[x][y] {
					dis[x][y] = newD
					heap.Push(&h, tuple{x, y, newD})
				}
			}
		}
	}
}

type tuple struct {
	x, y, dis int
}

// hp 定义一个堆类型，存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法，按照概率从小到大排序
func (h hp) Less(i, j int) bool { return h[i].dis < h[j].dis }

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
