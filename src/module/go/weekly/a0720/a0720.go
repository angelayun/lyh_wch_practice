package a0720

import (
	"sort"
)

func checkDivisibility(n int) bool {
	if n <= 0 {
		return false
	}
	sum := 0
	prod := 1
	v := n
	for v > 0 {
		x := v % 10
		sum += x
		prod *= x
		v /= 10
	}
	// 注意这里：是 n 被 sum+prod 整除，不是反过来
	if (sum + prod) == 0 {
		return false // 防止除以 0
	}
	return n%(sum+prod) == 0
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

// 计算组合数 C(n, k)
func comb(n, k int) int {
	if k > n {
		return 0
	}
	res := 1
	for i := 0; i < k; i++ {
		res *= n - i
		res /= i + 1
	}
	return res
}

const MOD = 1000000007

func countTrapezoids(points [][]int) int {
	n := len(points)
	horizontalEdges := make([][2]int, 0)

	// Step 1: 收集所有水平边
	for i := 0; i < n; i++ {
		x1, y1 := points[i][0], points[i][1]
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			if y1 == y2 {
				if x1 > x2 {
					x1, x2 = x2, x1
					i, j = j, i
				}
				horizontalEdges = append(horizontalEdges, [2]int{i, j})
			}
		}
	}

	// Step 2: 枚举所有水平边对，判断是否能组成梯形
	res := 0
	m := len(horizontalEdges)
	type key struct {
		i, j int
	}

	seen := make(map[key]bool)

	for r := 0; r < m; r++ {
		a, b := horizontalEdges[r][0], horizontalEdges[r][1]
		x1, y1 := points[a][0], points[a][1]
		x2, y2 := points[b][0], points[b][1]

		// 枚举所有左边的水平边
		for l := 0; l < r; l++ {
			c, d := horizontalEdges[l][0], horizontalEdges[l][1]
			x3, y3 := points[c][0], points[c][1]
			x4, y4 := points[d][0], points[d][1]

			// 确保不在同一水平线上
			if y1 != y3 {
				// 确保四个点互不相同
				pts := []int{a, b, c, d}
				sort.Ints(pts)
				unique := true
				for i := 1; i < 4; i++ {
					if pts[i] == pts[i-1] {
						unique = false
						break
					}
				}
				if !unique {
					continue
				}

				// 判断是否是凸四边形
				if isConvex(points[a], points[b], points[c], points[d]) {
					// 避免重复计数
					ids := []int{a, b, c, d}
					sort.Ints(ids)
					k := key{ids[0], ids[1]}
					if !seen[k] {
						res = (res + 1) % MOD
						seen[k] = true
					}
				}
			}
		}
	}

	return res
}

// 判断四个点是否能组成凸四边形
func isConvex(p1, p2, p3, p4 []int) bool {
	// 判断是否共线
	cross1 := (p2[0]-p1[0])*(p3[1]-p1[1]) - (p3[0]-p1[0])*(p2[1]-p1[1])
	cross2 := (p2[0]-p1[0])*(p4[1]-p1[1]) - (p4[0]-p1[0])*(p2[1]-p1[1])
	cross3 := (p4[0]-p3[0])*(p2[1]-p3[1]) - (p2[0]-p3[0])*(p4[1]-p3[1])
	cross4 := (p4[0]-p3[0])*(p1[1]-p3[1]) - (p1[0]-p3[0])*(p4[1]-p3[1])

	return cross1*cross2 > 0 || cross3*cross4 > 0
}

// 求绝对值
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// 定义分数对结构
type pair struct {
	x, y int
}
