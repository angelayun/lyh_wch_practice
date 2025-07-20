package a0719

import (
	"fmt"
	"math/bits"
)

// import "fmt"

/*
	const mx = 1e9 + 1

var np = [mx]bool{0: true, 1: true}

	func init222() {
		// 质数=false，非质数=true
		for i := 2; i*i < mx; i++ {
			if !np[i] {
				for j := i * i; j < mx; j += i {
					np[j] = true
				}
			}
		}
	}

	func abs(a int) int {
		if a < 0 {
			return -a
		}
		return a
	}
*/
func splitArray(nums []int) int64 {
	return 9
	/* sumA, sumB := 0, 0
	for i, x := range nums {
		if np[i] {
			// 非质数
			sumB += x
		} else {
			//是质数
			sumA += x
		}
	}
	// fmt.Println(sumA, sumB)
	return int64(abs(sumA - sumB)) */
}

func countIslands(grid [][]int, k int) (ans int) {
	m, n := len(grid), len(grid[0])
	type pair struct{ x, y int }
	var dir4 = []pair{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		res += grid[i][j]
		grid[i][j] = 0
		for _, d := range dir4 {
			x, y := d.x+i, d.y+j
			if x >= 0 && x < m && y >= 0 && y < n && grid[x][y] > 0 {
				res = (res + dfs(x, y)) % k
			}
		}
		return
	}
	for i, rows := range grid {
		for j, v := range rows {
			if v > 0 {
				sum := dfs(i, j)
				if sum%k == 0 {
					ans++
				}
			}
		}
	}
	return
}

func findMaxPathScore(edges [][]int, online []bool, k int64) int {
	return 1
}

// 先看看  后面改成1e5
// const mx = 1e1 + 1
const mx = 1e15 + 1

var np = [mx]int{}

func popDepth(x int) (res int) {
	if x <= 1 {
		return 0
	}
	return popDepth(bits.OnesCount(uint(x))) + 1
}
func init222() {
	for i := 1; i < mx; i++ {
		np[i] = popDepth(i)
	}
}
func popcountDepth222(n int64, k int) int64 {
	N := int(n)
	ans := 0
	for i := 1; i <= N; i++ {
		if np[i] == k {
			ans++
		}
	}
	fmt.Println('t')
	return int64(ans)
}
func popcountDepth(n int64, k int) int64 {
	N := int(n)
	ans := 0
	for i := 1; i <= N; i++ {
		if bits.OnesCount(uint(i)) == k {
			ans++
		}
	}
	return int64(ans)
}
