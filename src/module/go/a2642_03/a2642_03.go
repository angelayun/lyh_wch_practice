package a264203

import (
	"container/heap"
	"math"
)

type pair struct{ x, d int }
type hp []pair

func (h hp) Len() int           { return len(h) }
func (h hp) Less(i, j int) bool { return h[i].d < h[j].d }
func (h hp) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *hp) Push(v any)        { *h = append(*h, v.(pair)) }
func (h *hp) Pop() (v any)      { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

type Graph [][]pair

func Constructor(n int, edges [][]int) Graph {
	g := make(Graph, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
	}
	return g
}

func (g Graph) AddEdge(e []int) {
	x, y, w := e[0], e[1], e[2]
	g[x] = append(g[x], pair{y, w})
}

func (g Graph) ShortestPath(start int, end int) int {
	n := len(g)
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[start] = 0
	h := hp{{start, 0}}
	for len(h) > 0 {
		p := heap.Pop(&h).(pair)
		x, d := p.x, p.d
		if x == end {
			return d
		}
		if d > dis[x] {
			continue
		}
		for _, e := range g[x] {
			y, w := e.x, e.d
			newD := d + w
			if newD < dis[y] {
				dis[y] = newD
				heap.Push(&h, pair{y, newD})
			}
		}
	}
	return -1
}
