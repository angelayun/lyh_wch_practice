package practice

import "math"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}
type ListNode struct {
	Val  int
	Next *ListNode
}

// 2058
func nodesBetweenCriticalPoints(head *ListNode) []int {
	a, b, c := head, head.Next, head.Next.Next
	first, last, minDiff := 0, 0, math.MaxInt
	for i, prev := 1, 0; c != nil; i++ {
		if (b.Val < a.Val && b.Val < c.Val) || (b.Val > a.Val && b.Val > c.Val) {
			// 遇到了一个局部极大值或者局部极小值
			if first == 0 {
				first = i
			}
			last = i
			if prev > 0 && i-prev < minDiff {
				// 更新最小距离
				minDiff = i - prev
			}
			// 上一次的极大值/极小值
			prev = i
		}
		a, b, c = b, c, c.Next
	}
	// 如果只有一个的话
	if first == last {
		return []int{-1, -1}
	}
	return []int{minDiff, last - first}
}

// 2181
func mergeNodes(head *ListNode) *ListNode {
	res := head
	p := head
	p = p.Next
	for p.Next != nil {
		if p.Val != 0 {
			head.Val += p.Val
		} else {
			head = head.Next
			head.Val = 0
		}
		p = p.Next
	}
	head.Next = nil
	return res
}

// 993
func isCousins1(root *TreeNode, x int, y int) bool {
	depth := 0
	var father *TreeNode
	var dfs func(*TreeNode, *TreeNode, int) bool
	dfs = func(node, fa *TreeNode, d int) bool {
		if node == nil {
			return false
		}
		if node.Val == x || node.Val == y {
			if depth > 0 {
				return depth == d && fa != father
			}
			father, depth = fa, d
		}
		d++
		return dfs(node.Left, node, d) || dfs(node.Right, node, d)
	}
	return dfs(root, nil, 1)
}
func isCousins(root *TreeNode, x int, y int) (ans bool) {
	depth := 0
	var father *TreeNode
	var dfs func(*TreeNode, *TreeNode, int) bool
	dfs = func(node, fa *TreeNode, d int) bool {
		// 如果已经找到了 x 和 y 的其中一个，此时 depth>0，我们无需递归深度超过 depth 的点。
		if node == nil || (depth > 0 && d > depth) {
			return false
		}
		if node.Val == x || node.Val == y {
			if depth > 0 {
				ans = depth == d && fa != father
				// 相当于这里如果ans为false就直接返回不会再递归下去了
				return true
			}
			father, depth = fa, d
		}
		d++
		return dfs(node.Left, node, d) || dfs(node.Right, node, d)
	}
	dfs(root, nil, 1)
	return
}

func mctFromLeafValues(arr []int) (ans int) {
	// 放一个哨兵节点
	st := []int{math.MaxInt32}
	for _, x := range arr {
		// 以示例1来看  4>=2  所以2要弹出来
		for len(st) > 1 && x >= st[len(st)-1] {
			mid := st[len(st)-1]
			st = st[:len(st)-1]
			// mid为2 它应该跟栈顶6 和要入栈的4 这俩中的最小值结合
			ans += mid * min(x, st[len(st)-1])
		}
		st = append(st, x)
	}
	for len(st) > 2 {
		mid := st[len(st)-1]
		st = st[:len(st)-1]
		ans += mid * st[len(st)-1]
	}
	return ans
}

func sumSubarrayMins22(arr []int) (ans int) {
	arr = append(arr, -1)
	st := []int{-1} // 哨兵
	for r, x := range arr {
		for len(st) > 1 && arr[st[len(st)-1]] >= x {
			i := st[len(st)-1]
			st = st[:len(st)-1]
			ans += arr[i] * (i - st[len(st)-1]) * (r - i) // 累加贡献
		}
		st = append(st, r)
	}
	return ans % (1e9 + 7)
}
func sumSubarrayMins(arr []int) (ans int) {
	n := len(arr)
	// 左边界 left[i] 为左侧严格小于 arr[i] 的最近元素位置（不存在时为 -1）
	left := make([]int, n)
	// 右边界 right[i] 为右侧小于等于 arr[i] 的最近元素位置（不存在时为 n）
	right := make([]int, n)
	for i := range right {
		right[i] = n
	}
	st := []int{-1} // 方便赋值 left
	for i, x := range arr {
		for len(st) > 1 && arr[st[len(st)-1]] >= x {
			j := st[len(st)-1]
			st = st[:len(st)-1] // 移除无用数据
			right[j] = i
		}
		left[i] = st[len(st)-1]
		st = append(st, i)
	}
	for i, x := range arr {
		ans += x * (i - left[i]) * (right[i] - i) // 累加贡献
	}
	return ans % (1e9 + 7)
}
func solve(nums []int) int64 {
	nums = append(nums, math.MaxInt)
	ans := 0
	st := []int{-1}
	for r, v := range nums {
		for len(st) > 1 && nums[st[len(st)-1]] <= v {
			i := st[len(st)-1]
			st = st[:len(st)-1]
			ans += (i - st[len(st)-1]) * (r - i) * (nums[i])
		}
		st = append(st, r)
	}
	return int64(ans)
}
func subArrayRanges(nums []int) int64 {
	ans := solve(nums)
	for i, v := range nums { // 小技巧：所有元素取反后算的就是最小值的贡献
		nums[i] = -v
	}
	return ans + solve(nums)
}

func maxSumMinProduct(nums []int) (ans int) {
	n := len(nums)
	preSum := make([]int, n+1)
	for i, x := range nums {
		preSum[i+1] = preSum[i] + x
	}
	nums = append(nums, -1)
	st := []int{-1}
	for r, x := range nums {
		for len(st) > 1 && nums[st[len(st)-1]] <= x {
			i := st[len(st)-1]
			st = st[:len(st)-1]
			ans += nums[i] * (preSum[r] - preSum[st[len(st)-1]+1])
		}
		st = append(st, r)
	}
	return ans % (1e9 + 7)
}
func longestSubarray(nums []int) (ans int) {
	left := 0
	cnt := [2]int{}
	for right, x := range nums {
		cnt[x]++
		if cnt[x] > 0 {
			cnt[nums[left]]--
			left++
		}
		ans = max(ans, right-left+1)
	}
	return
}

func numEquivDominoPairs(dominoes [][]int) (ans int) {
	type pair struct{ a, b int }
	cnt := map[pair]int{}
	for _, item := range dominoes {
		a, b := item[0], item[1]
		cur := pair{a, b}
		ans += cnt[cur]
		cnt[cur]++
		reverse := pair{b, a}
		cnt[reverse]++
	}
	return
}
func maxProduct(n int) int {
	mx, subMx := math.MinInt, math.MinInt
	for ; n > 0; n /= 10 {
		x := n % 10
		if x > mx {
			subMx = mx
			mx = x
		} else if x > subMx {
			subMx = x
		}
	}
	return mx * subMx
}
func specialGrid(n int) [][]int {
	ans := make([][]int, 1<<n)
	for i := range ans {
		ans[i] = make([]int, 1<<n)
	}
	val := 0
	var dfs func([][]int, int, int)
	dfs = func(a [][]int, l, r int) {
		// 左闭右开区间
		if len(a) == 1 {
			a[0][l] = val
			val++
			return
		}
		m := len(a) / 2
		dfs(a[:m], l+m, r)
		dfs(a[m:], l+m, r)
		dfs(a[m:], l, l+m)
		dfs(a[:m], l, l+m)
	}
	dfs(ans, 0, 1<<n)
	return ans
}
