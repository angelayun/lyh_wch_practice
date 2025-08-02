package a072700

import (
	"cmp"
	"math/bits"
	"slices"
	"sort"
)

const mx = 1_000_001

var primeFactors = [mx][]int{}

func init() {
	// 预处理每个数的质因子列表，思路同埃氏筛
	for i := 2; i < mx; i++ {
		if primeFactors[i] == nil { // i 是质数
			for j := i; j < mx; j += i { // i 的倍数有质因子 i
				primeFactors[j] = append(primeFactors[j], i)
			}
		}
	}
}
func minJumps(nums []int) (ans int) {
	n := len(nums)
	groups := map[int][]int{}
	for i, x := range nums {
		for _, p := range primeFactors[x] {
			// 对于质数p 可以跳到下标i
			groups[p] = append(groups[p], i)
		}
	}
	vis := make([]bool, n)
	vis[0] = true
	q := []int{0}
	for {
		tmp := q
		q = nil
		for _, i := range tmp {
			if i == n-1 {
				return
			}
			idx := groups[nums[i]]
			idx = append(idx, i+1)
			if i > 0 {
				idx = append(idx, i-1)
			}
			for _, j := range idx {
				if !vis[j] {
					vis[j] = true
					q = append(q, j)
				}
			}
			// 避免重复访问下标列表
			delete(groups, nums[i])
		}
		ans++
	}
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func subarrayGCD(nums []int, k int) (ans int) {
	// i表示右端点
	type result struct{ v, i int }
	var a []result
	i0 := -1
	for i, v := range nums {
		if v%k > 0 {
			a = nil
			i0 = i
			continue
		}
		for j, p := range a {
			a[j].v = gcd(p.v, v)
		}
		a = append(a, result{v, i})
		j := 0
		for _, q := range a[1:] {
			if a[j].v != q.v {
				j++
				a[j] = q
			} else {
				a[j].i = q.i
			}
		}
		a = a[:j+1]
		if a[0].v == k {
			ans += a[0].i - i0
		}
	}
	return
}

func minimumTotalPrice(n int, edges [][]int, price []int, trips [][]int) int {
	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	cnt := make([]int, n)
	for _, t := range trips {
		start, end := t[0], t[1]
		var dfs func(int, int) bool
		dfs = func(x, fa int) bool {
			if x == end {
				// 到终点了 记录线段的右端点出现的次数
				cnt[x]++
				return true
			}
			for _, y := range g[x] {
				if y != fa && dfs(y, x) {
					// 记录的是线段的左端点
					cnt[x]++
					return true
				}
			}
			return false
		}
		dfs(start, -1)
	}
	var dfs func(int, int) (int, int)
	dfs = func(x, fa int) (int, int) {
		notHalf := price[x] * cnt[x]
		half := notHalf / 2
		for _, y := range g[x] {
			if y != fa {
				nh, h := dfs(y, x)
				// x不变 那y可以随意
				notHalf += min(nh, h)
				// x减半  那么y只能不变
				half += nh
			}
		}
		return notHalf, half
	}
	// 任何点都可以作为起点 这里是用0作为起点
	return min(dfs(0, -1))
}

func sortByBits222(arr []int) []int {
	slices.SortFunc(arr, func(x, y int) int {
		xCnt := bits.OnesCount(uint(x))
		yCnt := bits.OnesCount(uint(y))
		return cmp.Or(cmp.Compare(xCnt, yCnt), cmp.Compare(x, y))
	})
	return arr
}
func sortByBits(arr []int) []int {
	sort.Slice(arr, func(i, j int) bool {
		x, y := arr[i], arr[j]
		xCnt := bits.OnesCount(uint(x))
		yCnt := bits.OnesCount(uint(y))
		return xCnt < yCnt || xCnt == yCnt && x < y
	})
	return arr
}
