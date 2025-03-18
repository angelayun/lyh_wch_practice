package monotonicstack

import (
	"fmt"
	"strconv"
)

// 739
func dailyTemperatures1(temperatures []int) []int {
	n := len(temperatures)
	ans := make([]int, n)
	st := []int{}
	// 从右到左的思路
	for i := n - 1; i >= 0; i-- {
		// 当前的数比栈顶更大  及时去掉无用数据
		for len(st) > 0 && temperatures[i] >= temperatures[st[len(st)-1]] {
			st = st[:len(st)-1]
		}
		if len(st) > 0 {
			ans[i] = st[len(st)-1] - i
		}
		st = append(st, i)
	}
	return ans
}
func dailyTemperatures(temperatures []int) []int {
	n := len(temperatures)
	ans := make([]int, n)
	st := []int{}
	// 从左到右
	for i, t := range temperatures {
		// 当前的数比栈顶更大  及时去掉无用数据
		for len(st) > 0 && t > temperatures[st[len(st)-1]] {
			j := st[len(st)-1]
			ans[j] = i - j
			st = st[:len(st)-1]
		}
		st = append(st, i)
	}
	return ans
}

// 42
func trap(height []int) (ans int) {
	// 相当于横向的看怎么把坑填平
	st := []int{}
	for i, h := range height {
		// 当前柱子高度比栈顶高 h作为右边柱子 栈顶作为左边柱子
		for len(st) > 0 && h >= height[st[len(st)-1]] {
			// 底部柱子的高度
			bottomH := height[st[len(st)-1]]
			st = st[:len(st)-1]
			// 没有左边柱子
			if len(st) == 0 {
				break
			}
			left := st[len(st)-1]
			// 当前能接水的高度
			dh := min(height[left], h) - bottomH
			ans += dh * (i - left - 1)
		}
		st = append(st, i)
	}
	return ans
}

// 239
func maxSlidingWindow(nums []int, k int) []int {
	n := len(nums)
	// ans := make([]int, n-k+1)
	ans := make([]int, 0, n-k+1)
	q := []int{}
	for i, x := range nums {
		// 入 入队列之前去除无用数据
		for len(q) > 0 && nums[q[len(q)-1]] <= x {
			q = q[:len(q)-1]
		}
		q = append(q, i)
		// 出
		if i-q[0]+1 > k {
			q = q[1:]
		}
		// 记录答案
		if i >= k-1 {
			// 下面这两句都行
			// ans[i-k+1] = nums[q[0]]
			ans = append(ans, nums[q[0]])
		}
	}
	return ans
}

// 1475
func finalPrices1(prices []int) []int {
	st := []int{}
	for j, x := range prices {
		for len(st) > 0 && prices[st[len(st)-1]] >= x {
			i := st[len(st)-1]
			st = st[:len(st)-1]
			prices[i] -= prices[j]
		}
		st = append(st, j)
	}
	return prices
}

// 496
func nextGreaterElement1(nums1 []int, nums2 []int) []int {
	n := len(nums1)
	ans := make([]int, n)
	for i := range ans {
		ans[i] = -1
	}
	cnt := map[int]int{}
	for i, x := range nums1 {
		cnt[x] = i
	}
	st := []int{}
	// 从左到右的思路
	for j, x := range nums2 {
		for len(st) > 0 && x > nums2[st[len(st)-1]] {
			i := st[len(st)-1]
			st = st[:len(st)-1]
			if v, ok := cnt[nums2[i]]; ok {
				ans[v] = x
			}
		}
		st = append(st, j)
	}
	return ans
}
func nextGreaterElement(nums1 []int, nums2 []int) []int {
	n := len(nums1)
	ans := make([]int, n)
	for i := range ans {
		ans[i] = -1
	}
	cnt := map[int]int{}
	for i, x := range nums1 {
		cnt[x] = i
	}
	st := []int{}
	// 从左到右的思路
	for i := len(nums2) - 1; i >= 0; i-- {
		x := nums2[i]
		for len(st) > 0 && nums2[st[len(st)-1]] < x {
			st = st[:len(st)-1]
		}
		if len(st) > 0 {
			// 栈顶的一定比当前大
			j := st[len(st)-1]
			if v, ok := cnt[nums2[i]]; ok {
				ans[v] = nums2[j]
			}
		}
		st = append(st, i)
	}
	return ans
}

// 503
func nextGreaterElements(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	for i := range ans {
		ans[i] = -1
	}
	st := []int{}
	// 从左到右
	for i := 0; i < 2*n; i++ {
		t := nums[i%n]
		// 栈中元素相当于没有找到下一个更大温度
		for len(st) > 0 && t > nums[st[len(st)-1]%n] {
			j := st[len(st)-1]
			ans[j] = nums[i]
			st = st[:len(st)-1]
		}
		st = append(st, i%n)
	}
	return ans
}
func nextGreaterElements1(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	for i := range ans {
		ans[i] = -1
	}
	st := []int{}
	// 从右到左
	for i := 2*n - 1; i >= 0; i-- {
		t := nums[i%n]
		for len(st) > 0 && t >= nums[st[len(st)-1]] {
			st = st[:len(st)-1]
		}
		if len(st) > 0 {
			ans[i%n] = nums[st[len(st)-1]]
		}
		st = append(st, i%n)
	}
	return ans
}

// 2865
func maximumSumOfHeights1(a []int) (ans int64) {
	// 这是一个纯暴力的解法
	for i, x := range a {
		s, mn := x, x
		// 循环左边的
		for j := i - 1; j >= 0; j-- {
			y := a[j]
			// 如果y比mn小 取y 否则取mn
			mn = min(mn, y)
			s += mn
		}
		mn = x
		// 循环右边
		for _, y := range a[i+1:] {
			// 如果y比mn小 取y 否则取mn
			mn = min(mn, y)
			s += mn
		}
		ans = max(ans, int64(s))
	}
	return ans
}

// 2866
func maximumSumOfHeights(a []int) int64 {
	ans := 0
	n := len(a)
	suf := make([]int, n+1)
	st := []int{n} // 哨兵
	sum := 0
	for i := n - 1; i >= 0; i-- {
		x := a[i]
		for len(st) > 1 && x <= a[st[len(st)-1]] {
			j := st[len(st)-1]
			st = st[:len(st)-1]
			sum -= a[j] * (st[len(st)-1] - j) // 撤销之前加到 sum 中的
		}
		sum += x * (st[len(st)-1] - i) // 从 i 到 st[len(st)-1]-1 都是 x
		suf[i] = sum
		st = append(st, i)
	}
	ans = sum

	st = []int{-1} // 哨兵
	pre := 0
	for i, x := range a {
		for len(st) > 1 && x <= a[st[len(st)-1]] {
			j := st[len(st)-1]
			st = st[:len(st)-1]
			pre -= a[j] * (j - st[len(st)-1]) // 撤销之前加到 pre 中的
		}
		pre += x * (i - st[len(st)-1]) // 从 st[len(st)-1]+1 到 i 都是 x
		ans = max(ans, pre+suf[i+1])
		st = append(st, i)
	}
	return int64(ans)
}

// 962
func maxWidthRamp1(nums []int) (ans int) {
	n := len(nums)
	// 首先正序遍历数组 A，将以 A[0] 开始的递减序列的元素下标依次存入栈中。
	st := []int{0}
	for i := 1; i < n; i++ {
		if nums[i] < nums[st[len(st)-1]] {
			st = append(st, i)
		}
	}
	// 从右往左遍历
	for j := n - 1; j >= 0; j-- {
		for len(st) > 0 && nums[st[len(st)-1]] <= nums[j] {
			i := st[len(st)-1]
			st = st[:len(st)-1]
			ans = max(ans, j-i)
		}
	}
	return
}
func maxWidthRamp(nums []int) (ans int) {
	n := len(nums)
	// 构建一个单调递减的栈
	// 放的是s前缀和的索引位置 所以先放了个0进去
	st := []int{0}
	for i, h := range nums {
		// 有价值的数据才放到栈中
		if h < nums[st[len(st)-1]] {
			st = append(st, i)
		}
	}
	for i := n - 1; i > 0; i-- {
		for len(st) > 0 && nums[i] > nums[st[len(st)-1]] {
			ans = max(ans, i-st[len(st)-1])
			st = st[:len(st)-1]
		}
	}
	return
}

// 1124
func longestWPI1(hours []int) (ans int) {
	n := len(hours)
	s := make([]int, n+1)
	// 构建一个单调递减的栈
	// 放的是s前缀和的索引位置 所以先放了个0进去
	st := []int{0}
	for i, h := range hours {
		// 前缀和的索引位置都是比hours多一位
		i++
		s[i] = s[i-1]
		if h > 8 {
			s[i]++
		} else {
			s[i]--
		}
		// 有价值的数据才放到栈中
		if s[i] < s[st[len(st)-1]] {
			st = append(st, i)
		}
	}
	for i := n; i > 0; i-- {
		for len(st) > 0 && s[i] > s[st[len(st)-1]] {
			ans = max(ans, i-st[len(st)-1])
			st = st[:len(st)-1]
		}
	}
	return
}
func longestWPI(hours []int) (ans int) {
	// 记录前缀和首次出现的位置
	pos := map[int]int{}
	s := 0 // 前缀和
	for i, h := range hours {
		i++
		if h > 8 {
			s++
		} else {
			s--
		}
		if s > 0 {
			ans = i
		} else {
			if pos[s-1] > 0 { // 原本是 s-1，取反改为 s+1
				ans = max(ans, i-pos[s-1])
			}
			if _, ok := pos[s]; !ok {
				pos[s] = i
			}
		}
	}
	return
}

// 2454
func secondGreaterElement(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	for i := range ans {
		ans[i] = -1
	}
	// 存的是下标
	s := []int{}
	t := []int{}
	for i, x := range nums {
		for len(t) > 0 && nums[t[len(t)-1]] < x {
			// t栈顶的下下个更大元素是x
			ans[t[len(t)-1]] = x
			t = t[:len(t)-1]
		}
		j := len(s) - 1
		for j >= 0 && nums[s[j]] < x {
			j--
		}
		// 把从s弹出的这一整段元素加入到t中
		t = append(t, s[j+1:]...)
		// 当前元素的下标加入到s栈顶
		s = append(s[:j+1], i)
	}
	return ans
}

// 1673
func mostCompetitive(nums []int, k int) []int {
	n := len(nums)
	st := []int{}
	for i, v := range nums {
		// 后面还有足够的数  当前数比栈顶数小
		for len(st) > 0 && len(st)+n-i > k && v < st[len(st)-1] {
			st = st[:len(st)-1]
		}
		if len(st) < k {
			st = append(st, v)
		}
	}
	return st
}

// 402
func removeKdigits1(num string, k int) (ans string) {
	nums := []int{}
	for _, c := range num {
		nums = append(nums, int(c-'0'))
	}
	n := len(nums)
	k = n - k
	st := []int{}
	for i, v := range nums {
		// 后面还有足够的数  当前数比栈顶数小
		for len(st) > 0 && len(st)+n-i > k && v < st[len(st)-1] {
			st = st[:len(st)-1]
		}
		if len(st) < k {
			st = append(st, v)
		}
	}
	for _, num := range st {
		// 去除前导0
		if len(ans) == 0 && num == 0 {
			continue
		}
		ans += strconv.Itoa(num)
	}
	if len(ans) == 0 {
		return "0"
	}
	return
}
func removeKdigits(num string, k int) (ans string) {
	n := len(num)
	k = n - k
	st := []int{}
	for i, v := range num {
		// 后面还有足够的数  当前数比栈顶数小
		for len(st) > 0 && len(st)+n-i > k && int(v-'0') < st[len(st)-1] {
			st = st[:len(st)-1]
		}
		if len(st) < k {
			st = append(st, int(v-'0'))
		}
	}
	for _, num := range st {
		// 去除前导0
		if len(ans) == 0 && num == 0 {
			continue
		}
		ans += strconv.Itoa(num)
	}
	if len(ans) == 0 {
		return "0"
	}
	return
}

// 316
func removeDuplicateLetters_garb(s string) (ans string) {
	cnt := [26]int{}
	uniqueCnt := 0
	for _, c := range s {
		cnt[c-'a']++
		if cnt[c-'a'] == 1 {
			uniqueCnt++
		}
	}
	st := []int{}
	for i, c := range s {
		for len(st) > 0 && c < rune(s[st[len(st)-1]]) && cnt[s[st[len(st)-1]]-'a'] > 0 {
			st = st[:len(st)-1]
		}
		st = append(st, i)
		cnt[c-'a']--
	}

	for _, v := range st {
		ans = ans + string(s[v])
	}
	fmt.Println(st)
	return ans[:uniqueCnt]
}
func removeDuplicateLetters(s string) string {
	left := ['z' + 1]int{}
	for _, c := range s {
		left[c]++
	}
	ans := []rune{}
	// 字符是否在答案中
	inAns := ['z' + 1]bool{}
	for _, c := range s {
		left[c]--
		// 剪枝
		if inAns[c] {
			continue
		}
		for len(ans) > 0 && c < ans[len(ans)-1] && left[ans[len(ans)-1]] > 0 {
			// 如果 c < x，且右边还有 x，那么可以把 x 去掉，因为后面可以重新把 x 加到 ans 中
			x := ans[len(ans)-1]
			ans = ans[:len(ans)-1]
			inAns[x] = false
		}
		ans = append(ans, c)
		// 标记c在ans中
		inAns[c] = true
	}
	return string(ans)
}
// 2030
func smallestSubsequence(s string, k int, letter byte, repetition int) string {
    
}