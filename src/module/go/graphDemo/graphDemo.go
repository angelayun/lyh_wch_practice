package graphdemo

import (
	"container/heap"
	"math"
	"slices"
)

type pair struct{ dis, x int }
type hp []pair

func (h hp) Len() int           { return len(h) }
func (h hp) Less(i, j int) bool { return h[i].dis < h[j].dis }
func (h hp) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *hp) Push(v any)        { *h = append(*h, v.(pair)) }
func (h *hp) Pop() (v any)      { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }

func networkDelayTime_1(times [][]int, n int, k int) int {
	// 防止加法溢出
	const INF = math.MaxInt / 2
	// 建立邻接矩阵
	g := make([][]int, n)
	for i := range g {
		g[i] = make([]int, n)
		for j := range g[i] {
			g[i][j] = INF
		}
	}
	// 给邻接矩阵赋值
	for _, t := range times {
		x, y, w := t[0]-1, t[1]-1, t[2]
		g[x][y] = w
	}
	// 建立路径距离
	dis := make([]int, n)
	for i := range dis {
		// 最开始每个点的距离都是无穷大
		dis[i] = INF
	}
	// 起点的距离为0
	dis[k-1] = 0
	// 所以点都没有访问过
	done := make([]bool, n)
	for {
		// x 下一个没访问过的点
		x := -1
		for i, ok := range done {
			if !ok && (x < 0 || dis[i] < dis[x]) {
				x = i
			}
		}
		// 没有比x点距离更近的点了
		if x < 0 {
			return slices.Max(dis)
		}
		// 有节点无法到达
		if dis[x] == INF {
			return -1
		}
		// 最短路长度已确定（无法变得更小）
		done[x] = true
		for y, d := range g[x] {
			dis[y] = min(dis[y], dis[x]+d)
		}
	}
}
func networkDelayTime2(times [][]int, n int, k int) int {
	const INF = math.MaxInt / 2
	g := make([][]int, n)
	for i := range g {
		g[i] = make([]int, n)
		for j := range g[i] {
			g[i][j] = INF
		}
	}
	for _, t := range times {
		x, y, w := t[0]-1, t[1]-1, t[2]
		g[x][y] = w
	}
	dis := make([]int, n)
	for i := range dis {
		dis[i] = INF
	}
	dis[k-1] = 0
	done := make([]bool, n)
	for {
		x := -1
		for i, ok := range done {
			if !ok && (x < 0 || dis[i] < dis[x]) {
				x = i
			}
		}
		if x == -1 {
			return slices.Max(dis)
		}
		if dis[x] == INF {
			return -1
		}
		done[x] = true
		for y, d := range g[x] {
			dis[y] = min(dis[y], dis[x]+d)
		}
	}
}
func networkDelayTime(times [][]int, n int, k int) int {
	type edge struct{ to, wt int }
	// 建立邻接表
	g := make([][]edge, n)
	for _, t := range times {
		x, y, w := t[0]-1, t[1]-1, t[2]
		g[x] = append(g[x], edge{y, w})
	}
	dis := make([]int, n)
	for i := range dis {
		dis[i] = math.MaxInt
	}
	dis[k-1] = 0
	// 起点入队
	h := hp{{0, k - 1}}
	for len(h) > 0 {
		p := heap.Pop(&h).(pair)
		dx := p.dis
		x := p.x
		if dx > dis[x] {
			continue
		}
		for _, e := range g[x] {
			y := e.to
			newDis := dx + e.wt
			if newDis < dis[y] {
				dis[y] = newDis
				heap.Push(&h, pair{newDis, y})
			}
		}
	}
	mx := slices.Max(dis)
	if mx < math.MaxInt {
		return mx
	}
	return -1
}

func minimumTime(n int, edges [][]int, disappear []int) []int {
	type edge struct{ y, wt int }
	g := make([][]edge, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], edge{y, w})
		g[y] = append(g[y], edge{x, w})
	}
	dis := make([]int, n)
	for i := range dis {
		dis[i] = -1
	}
	dis[0] = 0
	h := hp{{}}
	for len(h) > 0 {
		p := heap.Pop(&h).(pair)
		dx := p.dis
		x := p.x
		if dx > dis[x] {
			continue
		}
		for _, e := range g[x] {
			y := e.y
			newDis := dx + e.wt
			if newDis < disappear[y] && (dis[y] < 0 || newDis < dis[y]) {
				dis[y] = newDis
				heap.Push(&h, pair{newDis, y})
			}
		}
	}
	return dis
}
