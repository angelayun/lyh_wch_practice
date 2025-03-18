package tree

import (
	"math"
	"reflect"

	"go.starlark.net/resolve"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// 144
func preorderTraversal1(root *TreeNode) (vals []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		vals = append(vals, node.Val)
		dfs(node.Left)
		dfs(node.Right)
	}
	dfs(root)
	return
}
func preorderTraversal(root *TreeNode) (ans []int) {
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		cur := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if cur != nil {
			ans = append(ans, cur.Val)
			stack = append(stack, cur.Right)
			stack = append(stack, cur.Left)
		}
	}
	return
}

// 94
func inorderTraversal1(root *TreeNode) (vals []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Left)
		vals = append(vals, node.Val)
		dfs(node.Right)
	}
	dfs(root)
	return
}
func inorderTraversal(root *TreeNode) []int {
	ans := []int{}
	stack := []*TreeNode{}
	for root != nil || len(stack) > 0 {
		for root != nil {
			stack = append(stack, root)
			root = root.Left
		}
		root = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		ans = append(ans, root.Val)
		root = root.Right
	}
	return ans
}

// 145
func postorderTraversal1(root *TreeNode) (vals []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Left)
		dfs(node.Right)
		vals = append(vals, node.Val)
	}
	dfs(root)
	return
}
func postorderTraversal(root *TreeNode) []int {
	ans := []int{}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		cur := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if cur != nil {
			ans = append([]int{cur.Val}, ans...)
			stack = append(stack, cur.Left)
			stack = append(stack, cur.Right)
		}
	}
	return ans
}

// 872
func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {
	var dfs func(*TreeNode)
	vals := []int{}
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		if node.Left == node.Right {
			vals = append(vals, node.Val)
		}
		dfs(node.Left)
		dfs(node.Right)
	}
	dfs(root1)
	vals1 := append([]int(nil), vals...)
	vals = []int{}
	dfs(root2)
	/* if len(vals1) != len(vals) {
			return false
		}
		for i, v := range vals1 {
			if v != vals[i] {
				return false
			}
		}
	  return true */
	if reflect.DeepEqual(vals1, vals) {
		return true
	}
	return false
}

// 971
func flipMatchVoyage(root *TreeNode, voyage []int) (ans []int) {
	i := 0
	var dfs func(*TreeNode) bool
	dfs = func(node *TreeNode) bool {
		if node == nil {
			return true
		}
		if i >= len(voyage) || voyage[i] != node.Val {
			return false
		}
		i++
		if dfs(node.Left) && dfs(node.Right) {
			return true
		}
		if dfs(node.Right) && dfs(node.Left) {
			ans = append(ans, node.Val)
			return true
		}
		return false
	}
	if dfs(root) {
		return
	}
	return []int{-1}
}

// 100
func isSameTree(p *TreeNode, q *TreeNode) bool {
	if p == nil || q == nil {
		return p == q
	}
	return p.Val == q.Val && isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
}

// 101
func isSymmetric(root *TreeNode) bool {
	var isSameTree func(*TreeNode, *TreeNode) bool
	isSameTree = func(p, q *TreeNode) bool {
		if p == nil || q == nil {
			return p == q
		}
		return p.Val == q.Val && isSameTree(p.Left, q.Right) && isSameTree(p.Right, q.Left)
	}
	return isSameTree(root.Left, root.Right)
}

// 951
func flipEquiv(root1 *TreeNode, root2 *TreeNode) bool {
	if root1 == nil || root2 == nil {
		return root1 == root2
	}
	return root1.Val == root2.Val && ((flipEquiv(root1.Left, root2.Right) && flipEquiv(root1.Right, root2.Left)) || (flipEquiv(root1.Left, root2.Left) && flipEquiv(root1.Right, root2.Right)))
}

// 110
func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func isBalanced(root *TreeNode) bool {
	// 如果是非平衡的 就返回-1 否则返回树的高度
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftDepth := dfs(node.Left)
		if leftDepth == -1 {
			return -1
		}
		rightDepth := dfs(node.Right)
		if rightDepth == -1 || abs(rightDepth-leftDepth) > 1 {
			return -1
		}
		return max(leftDepth, rightDepth) + 1
	}
	return dfs(root) != -1
}

// 98
func isValidBST1(root *TreeNode) (ans bool) {
	ans = true
	// 中序遍历的方式
	var dfs func(*TreeNode)
	prev := math.MinInt
	dfs = func(node *TreeNode) {
		if node == nil || !ans {
			return
		}
		dfs(node.Left)
		if node.Val <= prev {
			ans = false
		}
		prev = node.Val
		dfs(node.Right)
	}
	dfs(root)
	return ans
}

// isValidBST 函数用于判断二叉树是否为有效的二叉搜索树
func isValidBST(root *TreeNode) bool {
	// 定义深度优先搜索函数
	var dfs func(*TreeNode) (int, int, bool)
	// dfs 函数返回当前树的最小值、最大值以及是否为有效的二叉搜索树
	dfs = func(node *TreeNode) (int, int, bool) {
		if node == nil {
			return math.MaxInt, math.MinInt, true
		}
		// 递归处理左子树
		lMin, lMax, lValid := dfs(node.Left)
		if !lValid {
			return math.MinInt, math.MaxInt, false
		}
		// 递归处理右子树
		rMin, rMax, rValid := dfs(node.Right)
		if !rValid {
			return math.MinInt, math.MaxInt, false
		}
		// 判断当前节点是否满足二叉搜索树的条件
		if node.Val <= lMax || node.Val >= rMin {
			return math.MinInt, math.MaxInt, false
		}
		// 返回当前树的最小值、最大值以及是否为有效的二叉搜索树
		return min(lMin, node.Val), max(rMax, node.Val), true
	}
	// 调用 dfs 函数并获取结果
	_, _, isValid := dfs(root)
	return isValid
}

func isValidBST2(root *TreeNode) bool {
	var dfs func(*TreeNode, int, int) bool
	dfs = func(node *TreeNode, mn, mx int) bool {
		if node == nil {
			return true
		}
		if node.Val >= mx || node.Val <= mn {
			return false
		}
		return dfs(node.Left, mn, node.Val) && dfs(node.Right, node.Val, mx)
	}
	return dfs(root, math.MinInt, math.MaxInt)
}

// 236
func lowestCommonAncestor1(root, p, q *TreeNode) *TreeNode {
	if root == nil || p == root || q == root {
		return root
	}
	left := lowestCommonAncestor(root.Left, p, q)
	right := lowestCommonAncestor(root.Right, p, q)
	if left != nil && right != nil {
		return root
	}
	if left != nil {
		return left
	}
	return right
}

// 235
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	if p.Val < root.Val && q.Val < root.Val {
		return lowestCommonAncestor(root.Left, p, q)
	} else if p.Val > root.Val && q.Val > root.Val {
		return lowestCommonAncestor(root.Right, p, q)
	}
	return root
}
