package graphdemotuple

import (
	"container/heap"
	"math"
)

/*
	 type tuple struct {
		x   int
		dis float64
	}

type hp []tuple

func (h hp) Len() int { return len(h) }

func (h hp) Less(i, j int) bool { return h[i].dis < h[j].dis }

func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *hp) Push(v any)   { *h = append(*h, v.(tuple)) }
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
*/
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

var dirs = []struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

func minTimeToReach(moveTime [][]int) int {
	n, m := len(moveTime), len(moveTime[0])
	dis := make([][]int, n)
	for i := range dis {
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
		for i == n-1 && j == m-1 {
			return top.dis
		}
		if top.dis > dis[i][j] {
			continue
		}
		for _, d := range dirs {
			x, y := i+d.x, j+d.y
			if x >= 0 && x < n && y >= 0 && y < m {
				newD := max(top.dis, moveTime[x][y]) + (i+j)%2 + 1
				if newD < dis[x][y] {
					dis[x][y] = newD
					heap.Push(&h, tuple{newD, x, y})
				}
			}
		}
	}
}

/* func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {
	g := make([][]tuple, n)
	for i, e := range edges {
		x, y := e[0], e[1]
		w := succProb[i]
		g[x] = append(g[x], tuple{y, w})
		g[y] = append(g[y], tuple{x, w})
	}
	dis := make([]float64, n)
	for i := range dis {
		dis[i] = 0
	}
	dis[start_node] = 1
	h := hp{{x: start_node, dis: 0}}
	for len(h) > 0 {
		p := heap.Pop(&h).(tuple)
		x, d := p.x, p.dis
		if x == end_node {
			return d
		}
		if d < dis[x] {
			continue
		}
		for _, e := range g[x] {
			y, w := e.x, e.dis
			newD := d * w
			if newD > dis[y] {
				dis[y] = newD
				heap.Push(&h, tuple{y, newD})
			}
		}
	}
	return -1
} */
