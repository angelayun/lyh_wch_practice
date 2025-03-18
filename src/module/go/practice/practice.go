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
//