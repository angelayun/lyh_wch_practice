package tree

import (
	"math"
	"reflect"
	"slices"
	"strconv"
	"strings"

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

// 437
func pathSum1(root *TreeNode, targetSum int) (ans int) {
	cnt := map[int]int{0: 1}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, sum int) {
		if node == nil {
			return
		}
		sum += node.Val
		ans += cnt[sum-targetSum]
		cnt[sum]++
		dfs(node.Left, sum)
		dfs(node.Right, sum)
	}
	dfs(root, 0)
	return ans
}

// 523
func checkSubarraySum1(nums []int, k int) bool {
	n := len(nums)
	if n < 2 {
		return false
	}
	cnt := make([]int, k)
	cnt[0] = -1
	preSum := 0
	for i, x := range nums {
		preSum += x
		preSum = (preSum%k + k) % k
		if cnt[preSum] != 0 {
			if i-cnt[preSum] >= 2 {
				return true
			}
		} else {
			cnt[preSum] = i
		}
	}
	return false
}

// 525
func findMaxLength(nums []int) (ans int) {
	cnt := map[int]int{}
	preSum := 0
	for i, x := range nums {
		preSum += x & 1
		preSum &= 1
		if j, ok := cnt[preSum]; ok {
			ans = max(ans, j-i)
		} else {

			cnt[preSum] = i
		}
	}
	return
}

// 3319
func kthLargestPerfectSubtree(root *TreeNode, k int) int {
	hs := []int{}
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftH := dfs(node.Left)
		rightH := dfs(node.Right)
		if leftH == -1 || rightH == -1 {
			return -1
		}
		if leftH != rightH {
			return -1
		}
		curH := leftH + 1
		hs = append(hs, curH)
		return curH
	}
	dfs(root)
	if k > len(hs) {
		return -1
	}
	slices.SortFunc(hs, func(x, y int) int { return y - x })
	return hs[k-1]
}
func maxPathSum(root *TreeNode) (ans int) {
	ans = math.MinInt
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftSum := dfs(node.Left)
		rightSum := dfs(node.Right)
		ans = max(ans, leftSum+rightSum+node.Val)
		return max(leftSum+rightSum, 0) + node.Val
	}
	dfs(root)
	return
}
func diameterOfBinaryTree(root *TreeNode) (ans int) {
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return -1
		}
		left := dfs(node.Left) + 1
		right := dfs(node.Right) + 1
		ans = max(ans, left+right)
		return max(right, left)
	}
	dfs(root)
	return
}
func amountOfTime1(root *TreeNode, start int) int {
	fa := map[*TreeNode]*TreeNode{}
	var dfs func(*TreeNode, *TreeNode)
	var startNode *TreeNode
	dfs = func(node *TreeNode, f *TreeNode) {
		if node == nil {
			return
		}
		// 记录每一个节点的父节点
		fa[node] = f
		if node.Val == start {
			startNode = node
		}
		dfs(node.Left, node)
		dfs(node.Right, node)
	}
	dfs(root, nil)
	var maxDepth func(*TreeNode, *TreeNode) int
	maxDepth = func(node, from *TreeNode) int {
		if node == nil {
			return -1
		}
		res := -1
		if node.Left != from {
			res = max(res, maxDepth(node.Left, node))
		}
		if node.Right != from {
			res = max(res, maxDepth(node.Right, node))
		}
		if fa[node] != from {
			res = max(res, maxDepth(fa[node], node))
		}
		return res + 1
	}
	return maxDepth(startNode, startNode)
}
func amountOfTime(root *TreeNode, start int) (ans int) {
	var dfs func(*TreeNode) (int, bool)
	dfs = func(node *TreeNode) (int, bool) {
		if node == nil {
			return -1, false
		}
		leftDepth, leftFound := dfs(node.Left)
		rightDepth, rightFound := dfs(node.Right)
		leftDepth++
		rightDepth++
		if node.Val == start {
			ans = max(leftDepth, rightDepth)
			return 1, true
		}
		if leftFound || rightFound {
			ans = max(ans, leftDepth+rightDepth)
			if leftFound {
				return leftDepth, true
			} else {
				return rightDepth, true
			}
		}
		return max(leftDepth, rightDepth), false
	}
	dfs(root)
	return
}

func binaryTreePaths(root *TreeNode) (ans []string) {
	var dfs func(*TreeNode, []string)
	dfs = func(node *TreeNode, path []string) {
		if node == nil {
			return
		}
		val := strconv.Itoa(node.Val)
		path = append(path, val)
		if node.Left == node.Right {
			ans = append(ans, strings.Join(path, "->"))
		}
		dfs(node.Left, path)
		dfs(node.Right, path)
		path = path[:len(path)-1]
	}
	dfs(root, []string{})
	return
}
func pathSum(root *TreeNode, targetSum int) (ans [][]int) {
	path := []int{}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, sum int) {
		if node == nil {
			return
		}
		path = append(path, node.Val)
		sum += node.Val
		if node.Left == node.Right && sum == targetSum {
			ans = append(ans, slices.Clone(path))
		}
		dfs(node.Left, sum)
		dfs(node.Right, sum)
		path = path[:len(path)-1]
	}
	dfs(root, 0)
	return
}
