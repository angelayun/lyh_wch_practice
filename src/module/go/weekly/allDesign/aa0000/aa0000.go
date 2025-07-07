package aa0000

import "slices"
func processQueries(c int, connections [][]int, queries [][]int) (ans []int) {
	isAlive := make([]bool, c)
	for i := range isAlive {
		isAlive[i] = true
	}
	g := make([][]int, c)
	for _, e := range connections {
		x, y := e[0]-1, e[1]-1
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	idx := make([]int, c)
	for i := range idx {
		idx[i] = -1
	}
	uniqueKey := 0
	cnt := map[int][]int{}
	var dfs func(int)
	dfs = func(x int) {
		idx[x] = uniqueKey
		cnt[uniqueKey] = append(cnt[uniqueKey], x)
		for _, y := range g[x] {
			if idx[y] < 0 {
				dfs(y)
			}
		}
	}

	for i, v := range idx {
		if v < 0 {
			dfs(i)
			slices.Sort(cnt[uniqueKey])
			
			uniqueKey++
		}
	}
	for _, q := range queries {
		t, x := q[0], q[1]-1
		if t == 1 {
			if isAlive[x] {
				ans = append(ans, x+1)
			} else {
				flag := false
				for _, i := range cnt[idx[x]] {
					if isAlive[i] {
						flag = true
						ans = append(ans, i+1)
						break
					}
				}
				if flag == false {
					ans = append(ans, -1)
				}
			}
		} else {
			isAlive[x] = false
		}
	}
	return
}