package a2245

var c25 [1001][2]int

func init() {
	for i := 2; i <= 1000; i++ {
		if i%2 == 0 {
			c25[i][0] = c25[i/2][0] + 1
		}
		if i%5 == 0 {
			c25[i][1] = c25[i/5][1] + 1
		}
	}
}
func maxTrailingZeros(grid [][]int) (ans int) {
	m, n := len(grid), len(grid[0])
	s := make([][][2]int, m)
	for i, row := range grid {
		s[i] = make([][2]int, n+1)
		for j, v := range row {
			s[i][j+1][0] = s[i][j][0] + c25[v][0]
			s[i][j+1][1] = s[i][j][1] + c25[v][1]
		}
	}
	for j := 0; j < n; j++ {
		s2, s5 := 0, 0
		for i, row := range grid {
			s2 += c25[row[j]][0]
			s5 += c25[row[j]][1]
			ans = max(ans, max(
				min(s2+s[i][j][0], s5+s[i][j][1]),
				min(s2+s[i][n][0]-s[i][j+1][0], s5+s[i][n][1]-s[i][j+1][1])))
		}
		s2, s5 = 0, 0
		for i := m - 1; i >= 0; i-- {
			s2 += c25[grid[i][j]][0]
			s5 += c25[grid[i][j]][1]
			ans = max(ans, max(
				min(s2+s[i][j][0], s5+s[i][j][1]),
				min(s2+s[i][n][0]-s[i][j+1][0], s5+s[i][n][1]-s[i][j+1][1])))
		}
	}
	return 
}
