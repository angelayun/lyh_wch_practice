package a264201

import "math"

type Graph [][]int

const INF = math.MaxInt / 2

func Constructor(n int, edges [][]int) Graph {
	g := make([][]int, n)
	for i := range g {
		g[i] = make([]int, n)
		for j := range g[i] {
			g[i][j] = INF
		}
	}
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x][y] = w
	}
	return g
}

func (g Graph) AddEdge(edge []int) {
	x, y, w := edge[0], edge[1], edge[2]
	g[x][y] = w
}

func (g Graph) ShortestPath(start int, end int) int {
	n := len(g)
	dis := make([]int, n)
	for i := range dis {
		dis[i] = INF
	}
	dis[start] = 0
	vis := make([]bool, n)
	for {
		x := -1
		for i, ok := range vis {
			if !ok && (x < 0 || dis[i] < dis[x]) {
				x = i
			}
		}
		if x < 0 || dis[x] == INF {
			return -1
		}
		if x == end {
			return dis[x]
		}
		vis[x] = true
		for y, w := range g[x] {
			dis[y] = min(dis[y], dis[x]+w)
		}
	}
}
