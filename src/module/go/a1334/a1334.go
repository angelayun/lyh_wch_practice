package a1334

import "math"

func findTheCity1(n int, edges [][]int, distanceThreshold int) (ans int) {
	const INF = math.MaxInt / 2
	w := make([][]int, n)
	for i := range w {
		w[i] = make([]int, n)
		for j := range w {
			w[i][j] = INF
		}
	}
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		w[x][y] = wt
		w[y][x] = wt
	}
	memo := make([][][]int, n)
	for i := range memo {
		memo[i] = make([][]int, n)
		for j := range memo[i] {
			memo[i][j] = make([]int, n)
		}
	}
	var dfs func(int, int, int) int
	dfs = func(k, i, j int) int {
		if k < 0 {
			return w[i][j]
		}
		p := &memo[i][j][k]
		if *p != 0 {
			return *p
		}
		*p = min(dfs(k-1, i, j), dfs(k-1, i, k)+dfs(k-1, k, j))
		return *p
	}
	minCnt := n
	for i := range n {
		cnt := 0
		for j := range n {
			if j != i && dfs(n-1, i, j) <= distanceThreshold {
				cnt++
			}
		}
		if cnt <= minCnt {
			minCnt = cnt
			ans = i
		}
	}
	return ans
}
func findTheCity2(n int, edges [][]int, distanceThreshold int) (ans int) {
	const INF = math.MaxInt / 2
	w := make([][]int, n)
	for i := range w {
		w[i] = make([]int, n)
		for j := range w {
			w[i][j] = INF
		}
	}
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		w[x][y] = wt
		w[y][x] = wt
	}
	dp := make([][][]int, n+1)
	for i := range dp {
		dp[i] = make([][]int, n)
		for j := range dp[i] {
			dp[i][j] = make([]int, n)
		}
	}
	dp[0] = w
	for k := range n {
		for i := range n {
			for j := range n {
				dp[k+1][i][j] = min(dp[k][i][j], dp[k][i][k]+dp[k][k][j])
			}
		}
	}
	minCnt := n
	for i := range n {
		cnt := 0
		for j := range n {
			if j != i && dp[n][i][j] <= distanceThreshold {
				cnt++
			}
		}
		if cnt <= minCnt {
			minCnt = cnt
			ans = i
		}
	}
	return ans
}
func findTheCity(n int, edges [][]int, distanceThreshold int) (ans int) {
	const INF = math.MaxInt / 2
	w := make([][]int, n)
	for i := range w {
		w[i] = make([]int, n)
		for j := range w {
			w[i][j] = INF
		}
	}
	for _, e := range edges {
		x, y, wt := e[0], e[1], e[2]
		w[x][y] = wt
		w[y][x] = wt
	}
	dp := w
	for k := range n {
		for i := range n {
			for j := range n {
				dp[i][j] = min(dp[i][j], dp[i][k]+dp[k][j])
			}
		}
	}
	minCnt := n
	for i := range n {
		cnt := 0
		for j := range n {
			if j != i && dp[i][j] <= distanceThreshold {
				cnt++
			}
		}
		if cnt <= minCnt {
			minCnt = cnt
			ans = i
		}
	}
	return ans
}
func minimumCost(source, target string, original, changed []byte, cost []int) (ans int64) {
	const INF = math.MaxInt / 4
	dis := [26][26]int{}
	for i := range dis {
		for j := range dis[i] {
			if j != i {
				dis[i][j] = INF
			}
		}
	}
	for i, c := range cost {
		x := original[i] - 'a'
		y := changed[i] - 'a'
		dis[x][y] = min(dis[x][y], c)
	}
	for k := range dis {
		for i := range dis {
			for j := range dis {
				dis[i][j] = min(dis[i][j], dis[i][k]+dis[k][j])
			}
		}
	}

	for i, b := range source {
		ans += int64(dis[b-'a'][target[i]-'a'])
	}
	if ans >= INF {
		return -1
	}
	return
}
