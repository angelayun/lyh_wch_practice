package a3607

import "sort"

func processQueries(c int, connections [][]int, queries [][]int) []int {
	g := make([][]int, c+1)
	for _, e := range connections {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	// 记录节点 x 在哪个堆
	belong := make([]int, c+1)
	for i := range belong {
		belong[i] = -1
	}
	heaps := []hp{}
	var h hp
	var dfs func(int)
	dfs = func(x int) {
		belong[x] = len(heaps)
		h.IntSlice = append(h.IntSlice, x)
		for _, y := range g[x] {
			if belong[y] < 0 {
				dfs(y)
			}
		}
	}
	
}

// 堆模板 Int 数组
type hp struct{ sort.IntSlice }

func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}
