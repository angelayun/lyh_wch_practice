package a0727

import (
	"fmt"
	"slices"
	"strings"
)

func maximumMedianSum(nums []int) int64 {
	slices.Sort(nums)
	n := len(nums)
	i, j := 0, n-1
	ans := 0
	for i < j {
		// a, b, c := nums[i], nums[j-1], nums[j]
		b := nums[j-1]
		ans += b
		i++
		j -= 2
	}
	return int64(ans)
}

func numOfSubsequences3333(s string) int64 {
	n := len(s)
	// 记录前面L的个数
	pre := make([]int, n+1)
	for i := 0; i < n; i++ {
		pre[i+1] = pre[i]
		if s[i] == 'L' {
			pre[i+1]++
		}
	}
	// 记录后面T的个数
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1]
		if s[i] == 'T' {
			suffix[i]++
		}
	}
	fmt.Println(pre)
	fmt.Println(suffix)
	// 记录C的个数
	cnt := 0
	ans := 0
	for i, x := range s {
		if x == 'C' {
			cnt++
		}
		arr := []int{pre[i+1], suffix[i+1], cnt}
		slices.Sort(arr)
		arr[0]++
		ans = max(ans, arr[0]*arr[1])
		fmt.Println(ans, i)
	}
	return int64(ans)
}

func numOfSubsequences333(s string) int64 {
	n := len(s)
	preL := make([]int, n+1) // 前缀中 'L' 的个数
	sufT := make([]int, n+1) // 后缀中 'T' 的个数

	for i := 0; i < n; i++ {
		preL[i+1] = preL[i]
		if s[i] == 'L' {
			preL[i+1]++
		}
	}

	for i := n - 1; i >= 0; i-- {
		sufT[i] = sufT[i+1]
		if s[i] == 'T' {
			sufT[i]++
		}
	}

	cntC := 0
	total := 0
	for i := 0; i < n; i++ {
		if s[i] == 'C' {
			total += preL[i+1] * sufT[i+1]
			cntC++
		}
	}

	// 插入一个 'L'
	maxL := 0
	for i := 0; i <= n; i++ {
		// 插入 'L' 在位置 i，前面的 'L' 数量增加 1
		// 所有在 i 之后的 C 的贡献都会增加 sufT[i] * 1
		// 所有在 i 之前或等于 i 的 C 的贡献不会增加
		for j := i; j < n; j++ {
			if s[j] == 'C' {
				maxL = max(maxL, total+sufT[j+1])
			}
		}
	}

	// 插入一个 'T'
	maxT := 0
	for i := 0; i <= n; i++ {
		for j := 0; j < i && j < n; j++ {
			if s[j] == 'C' {
				maxT = max(maxT, total+preL[j+1])
			}
		}
	}

	// 插入一个 'C'
	maxC := total + cntC // 每个 C 都可以与它形成一个新的 LCT
	for i := 0; i < n; i++ {
		if s[i] == 'C' {
			maxC = max(maxC, total+preL[i+1]*sufT[i+1])
		}
	}

	return int64(max(max(total, maxL), max(maxT, maxC)))
}
func numOfSubsequences222(s string) int64 {
	n := len(s)

	// preL[i] 表示前i个字符中 'L' 的数量
	preL := make([]int, n+1)
	for i := 0; i < n; i++ {
		preL[i+1] = preL[i]
		if s[i] == 'L' {
			preL[i+1]++
		}
	}

	// sufT[i] 表示从i到末尾的 'T' 的数量
	sufT := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		sufT[i] = sufT[i+1]
		if s[i] == 'T' {
			sufT[i]++
		}
	}

	// 计算原始的 "LCT" 子序列数量
	original := 0
	for i := 0; i < n; i++ {
		if s[i] == 'C' {
			original += preL[i] * sufT[i+1]
		}
	}

	// 计算插入 'L' 后的最大增量
	sum_c_after := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		sum_c_after[i] = sum_c_after[i+1]
		if s[i] == 'C' {
			sum_c_after[i] += sufT[i+1]
		}
	}
	max_insert_L := 0
	for i := 0; i <= n; i++ {
		if sum_c_after[i] > max_insert_L {
			max_insert_L = sum_c_after[i]
		}
	}

	// 计算插入 'T' 后的最大增量
	sum_c_before := make([]int, n+1)
	current_sum := 0
	for i := 0; i < n; i++ {
		if s[i] == 'C' {
			current_sum += preL[i]
		}
		sum_c_before[i+1] = current_sum
	}
	max_insert_T := 0
	for i := 0; i <= n; i++ {
		if sum_c_before[i] > max_insert_T {
			max_insert_T = sum_c_before[i]
		}
	}

	// 计算插入 'C' 后的最大增量
	max_insert_C := 0
	for i := 0; i <= n; i++ {
		temp := preL[i] * sufT[i]
		if temp > max_insert_C {
			max_insert_C = temp
		}
	}

	// 计算最终结果
	ans := original
	ans = max(ans, original+max_insert_L)
	ans = max(ans, original+max_insert_T)
	ans = max(ans, original+max_insert_C)

	return int64(ans)
}

const mx = 1e5 + 1

var np = [mx]bool{0: true, 1: true}
var lpf [mx + 1]int

// 也可以写成下面这样
// var np = [mx]bool{true, true} // 0 和 1 不是质数
func init() {
	// 质数=false，非质数=true
	for i := 2; i*i < mx; i++ {
		if !np[i] {
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
	for i := 2; i <= mx; i++ {
		if lpf[i] == 0 {
			for j := i; j <= mx; j += i {
				if lpf[j] == 0 {
					lpf[j] = i
				}
			}
		}
	}
}
func minJumps333(nums []int) int {
	n := len(nums)
	if n == 1 {
		return 0
	}

	// 记录每个质数 p 对应的最大索引 j（nums[j] % p == 0）
	cnt := make(map[int]int)
	for i, x := range nums {
		if x == 1 {
			continue // 1 没有质因数
		}
		temp := x
		seen := make(map[int]bool)
		for temp > 1 {
			p := lpf[temp]
			seen[p] = true
			for temp%p == 0 {
				temp /= p
			}
		}
		for p := range seen {
			if i > cnt[p] {
				cnt[p] = i
			}
		}
	}

	curRight := 0  // 当前已到达的最远位置
	nextRight := 0 // 下一步可到达的最远位置
	ans := 0       // 跳跃次数

	for i := 0; i < n-1; i++ {
		nextRight = max(nextRight, i+1) // 正常移动一步

		num := nums[i]
		if !np[num] && num != 1 { // 如果当前数字是质数
			if j, ok := cnt[num]; ok {
				nextRight = max(nextRight, j) // 通过质数传送可以到达的位置
			}
		}

		// 如果当前已经到达当前最远位置，必须跳跃
		if i == curRight {
			ans++
			curRight = nextRight
		}
	}

	return ans
}
func minJumps(nums []int) (ans int) {
	cnt := map[int]int{}
	for i, x := range nums {
		cnt[lpf[x]] = max(cnt[lpf[x]], i)
	}
	mxCnt := map[int]int{}
	for i, x := range nums {
		mxCnt[x] = i
	}
	curRight := 0  // 已建造的桥的右端点
	nextRight := 0 // 下一座桥的右端点的最大值
	for i, num := range nums[:len(nums)-1] {
		// 遍历的过程中，记录下一座桥的最远点
		nextRight = max(nextRight, i+1)
		if !np[num] {
			nextRight = max(nextRight, cnt[num])
			for k := range cnt {
				if j, ok := mxCnt[k*num]; ok {
					nextRight = max(nextRight, j)
				}
			}
		}
		if i == curRight { // 无路可走，必须建桥
			curRight = nextRight // 建桥后，最远可以到达 next_right
			ans++
		}
	}
	return
}

func countHillValley(nums []int) (ans int) {
	nums = slices.Compact(nums)
	for i := 1; i < len(nums)-1; i++ {
		if (nums[i-1] < nums[i]) == (nums[i+1] < nums[i]) {
			ans++
		}
	}
	return
}

func numDistinct(s string, t string) int {
	m, n := len(s), len(t)
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i < j {
			return 0
		}
		if j < 0 {
			return 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		res = dfs(i-1, j)
		if s[i] == t[j] {
			res += dfs(i-1, j-1)
		}
		return
	}
	return dfs(m-1, n-1)
}
func calcInsert(s string) (res int) {
	cntT := strings.Count(s, "T")
	cntL := 0
	for _, c := range s {
		if c == 'T' {
			cntT--
		}
		if c == 'L' {
			cntL++
		}
		res = max(res, cntL*cntT)
	}
	return
}
func numOfSubsequences(s string) int64 {
	extra := max(numDistinct(s, "CT"), numDistinct(s, "LC"), calcInsert((s)))
	return int64(numDistinct(s, "LCT") + extra)
}
