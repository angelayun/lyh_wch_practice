package tree

import (
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
