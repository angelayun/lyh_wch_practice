package monotonicstack

import "math"
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}
func minDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	if root.Left == root.Right {
		return 1
	}
	leftDepth := math.MaxInt
	if root.Left != nil {
		leftDepth = minDepth(root.Left)
	}
	rightDepth := math.MaxInt
	if root.Right != nil {
		rightDepth = minDepth((root.Right))
	}
	return min(leftDepth, rightDepth) + 1
}
func minDepth2(root *TreeNode) int {
	if root == nil {
		return 0
	}
	if root.Left == nil {
		return minDepth2(root.Right) + 1
	}
	if root.Right == nil {
		return minDepth2(root.Left) + 1
	}
	return min(minDepth2(root.Left), minDepth2(root.Right)) + 1
}