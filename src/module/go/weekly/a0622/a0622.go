package a0622

import (
	"math"
)

func findMaximumScore(nums []int) int64 {
	ans := 0
	mx := 0
	for _, x := range nums[:len(nums)-1] {
		mx := max(x, mx)
		ans += mx
	}
	return int64(ans)
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func maxMatrixSum(matrix [][]int) int64 {
	// 记录方阵中所有元素绝对值的总和
	sum := 0
	// 绝对值最小的数
	mn := math.MaxInt
	// 奇数个负数就是1  偶数个负数就是0
	flag := 0
	for _, rows := range matrix {
		for _, col := range rows {
			if col < 0 {
				flag ^= 1
			}
			sum += abs(col)
			mn = min(mn, abs(col))
		}
	}
	if flag == 1 {
		return int64(sum - 2*mn)
	}
	return int64(sum)
}
func isPrime(x int) bool {
	for i := 2; i*i <= x; i++ {
		if x%i == 0 {
			return false
		}
	}
	return x > 1
}
func checkPrimeFrequency222(nums []int) bool {
	cnt := map[int]int{}
	for _, x := range nums {
		cnt[x]++
	}
	for _, c := range cnt {
		if isPrime(c) {
			return true
		}
	}
	return false
}

/*
	 func findCoins(numWays []int) []int {
		g := make([][]int, n)
	}
*/
func minIncrease222(n int, edges [][]int, cost []int) (ans int) {
	type pair struct{ y, val int }
	newG := make([][]int, n)
	// 反图
	g := make([][]int, n)
	// 每个节点的入度
	deg := make([]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[y] = append(g[y], x)
		newG[x] = append(newG[x], y)
		deg[x]++
	}
	queue := []int{}
	// 所有入度为0的点加入队列
	for i := range n {
		if deg[i] == 0 {
			queue = append(queue, i)
		}
	}
	newCost := make([]int, len(cost)) // 创建与源切片相同长度的新切片

	// 逐个复制元素
	for i := range cost {
		newCost[i] = cost[i]
	}
	cntSum := make([][]int, n)
	for len(queue) > 0 {
		tmp := queue
		queue = nil
		// 最底层的
		for _, x := range tmp {
			for _, y := range g[x] {
				cntSum[y] = append(cntSum[y], cost[x])
				queue = append(queue, y)
			}
		}
	}
	for _, ls := range cntSum {
		sum := 0
		for _, x := range ls {
			sum += x
		}
		if len(ls) > 0 && ls[0]*len(ls) != sum {
			for _, y := range ls[1:] {
				if y != ls[0] {
					ans++
				}
			}
		}
	}
	return
}

func minSwaps(nums []int) int {
	// 奇数(车)的下标
	pos1 := []int{}
	for i, x := range nums {
		if x%2 == 1 {
			pos1 = append(pos1, i)
		}
	}
	n := len(nums)
	m := len(pos1)
	// 为0表示去偶数下标  为1表示去奇数下标
	calc := func(start int) (res int) {
		if (n-start+1)/2 != m {
			return math.MaxInt
		}
		for i, j := range pos1 {
			res += abs(i*2 + start - j)
		}
		return
	}
	ans := min(calc(0), calc(1))
	if ans == math.MaxInt {
		return -1
	}
	return ans
}

func maxArea(coords [][]int) int64 {
	ans := 0
	calc := func() {
		minX, maxX := math.MaxInt, 0
		minY := map[int]int{}
		maxY := map[int]int{}
		for _, p := range coords {
			x, y := p[0], p[1]
			minX = min(minX, x)
			maxX = max(maxX, x)
			maxY[x] = max(maxY[x], y)
			mn, ok := minY[x]
			if !ok {
				minY[x] = y
			} else {
				minY[x] = min(mn, y)
			}
		}
		for x, y := range minY {
			ans = max(ans, (maxY[x]-y)*max(maxX-x, x-minX))
		}
	}
	calc()
	// 横纵坐标交换  复用同一份代码
	for _, p := range coords {
		p[0], p[1] = p[1], p[0]
	}
	calc()
	if ans == 0 {
		return -1
	}
	return int64(ans)
}

/* const mx = 50_001

var np = [mx]bool{1: true} // 1 不是质数

func init() {
	for i := 2; i*i < mx; i++ {
		if !np[i] {
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}

func primeSubarray(nums []int, k int) (ans int) {
	var minQ, maxQ []int
	last, last2 := -1, -1
	left := 0

	for i, x := range nums {
		// 1. 入
		if !np[x] {
			last2 = last
			last = i

			for len(minQ) > 0 && x <= nums[minQ[len(minQ)-1]] {
				minQ = minQ[:len(minQ)-1]
			}
			minQ = append(minQ, i)

			for len(maxQ) > 0 && x >= nums[maxQ[len(maxQ)-1]] {
				maxQ = maxQ[:len(maxQ)-1]
			}
			maxQ = append(maxQ, i)

			// 2. 出
			for nums[maxQ[0]]-nums[minQ[0]] > k {
				left++
				if minQ[0] < left {
					minQ = minQ[1:]
				}
				if maxQ[0] < left {
					maxQ = maxQ[1:]
				}
			}
		}

		// 3. 更新答案
		ans += last2 - left + 1
	}

	return
} */

const mx = 50_001

var np = [mx]bool{1: true}

func init() {
	// 这里不i*i
	for i := 2; i*i < mx; i++ {
		if !np[i] {
			// 这里从i*i开始 性能提升
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}
func checkPrimeFrequency(nums []int) bool {
	cnt := map[int]int{}
	for _, x := range nums {
		cnt[x]++
	}
	for _, c := range cnt {
		if !np[c] {
			return true
		}
	}
	return false
}
func primeSubarray(nums []int, k int) (ans int) {
	var minQ, maxQ []int
	last, last2 := -1, -1
	left := 0
	for right, x := range nums {
		if !np[x] {
			last2 = last
			last = right
			for len(minQ) > 0 && x <= nums[minQ[len(minQ)-1]] {
				minQ = minQ[:len(minQ)-1]
			}
			minQ = append(minQ, right)
			for len(maxQ) > 0 && x >= nums[maxQ[len(maxQ)-1]] {
				maxQ = maxQ[:len(maxQ)-1]
			}
			maxQ = append(maxQ, right)

			for nums[maxQ[0]]-nums[minQ[0]] > k {
				left++
				if maxQ[0] < left {
					maxQ = maxQ[1:]
				}
				if minQ[0] < left {
					minQ = minQ[1:]
				}
			}
		}
		ans += last2 - left + 1
	}
	return
}

func minIncrease(n int, edges [][]int, cost []int) (ans int) {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	g[0] = append(g[0], -1)
	var dfs func(int, int) int
	// 返回子树的最大值
	dfs = func(x, fa int) (maxS int) {
		cnt := 0
		for _, y := range g[x] {
			if y == fa {
				continue
			}
			mx := dfs(y, x)
			if mx > maxS {
				maxS = mx
				cnt = 1
			} else if mx == maxS {
				cnt++
			}
		}
		ans += len(g[x]) - 1 - cnt
		return maxS + cost[x]
	}
	dfs(0, -1)
	return
}

func findCoins(numWays []int) (ans []int) {
	n := len(numWays)
	f := make([]int, n+1)
	f[0] = 1
	for i := 1; i <= n; i++ {
		way := numWays[i-1]
		if way == f[i] {
			continue
		}
		if way-1 != f[i] {
			return nil
		}
		ans = append(ans, i)
		for j := i; j <= n; j++ {
			f[j] += f[j-i]
		}
	}
	return
}

func isPalindrome(x int) bool {
	if x < 0 || x > 0 && x%10 == 0 {
		return false
	}
	rev := 0
	for rev < x/10 {
		rev = rev*10 + x%10
		x /= 10
	}
	return rev == x || rev == x/10
}
