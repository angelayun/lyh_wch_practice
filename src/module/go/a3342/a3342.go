package a3342

import (
	"container/heap"
	"math"
)

func minTimeToReach(moveTime [][]int) int {
	var dirs = []struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	n, m := len(moveTime), len(moveTime[0])
	dis := make([][]int, n)
	for i := range moveTime {
		dis[i] = make([]int, m)
		for j := range dis[i] {
			dis[i][j] = math.MaxInt
		}
	}
	dis[0][0] = 0
	h := hp{{}}
	for {
		top := heap.Pop(&h).(tuple)
		i, j := top.x, top.y
		if i == n-1 && j == m-1 {
			return top.dis
		}
		if top.dis > dis[i][j] {
			continue
		}
		time := (i+j)%2 + 1
		for _, d := range dirs {
			x, y := i+d.x, j+d.y
			if x >= 0 && x < n && y >= 0 && y < m {
				newD := max(top.dis, moveTime[x][y]) + time
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
