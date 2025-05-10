package newtree

import (
	"bytes"
	"fmt"
	"math"
	"slices"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func flatten2(root *TreeNode) {
	var head *TreeNode
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Right)
		dfs(node.Left)
		node.Left = nil
		node.Right = head
		head = node
	}
	dfs(root)
}
func flatten(root *TreeNode) {
	var dfs func(*TreeNode) *TreeNode
	dfs = func(node *TreeNode) *TreeNode {
		if node == nil {
			return nil
		}
		leftTails := dfs(node.Left)
		rightTails := dfs(node.Right)
		if leftTails != nil {
			leftTails.Right = node.Right
			node.Right = node.Left
			node.Left = nil
		}
		if rightTails != nil {
			return rightTails
		}
		if leftTails != nil {
			return leftTails

		}
		return node
	}
	dfs(root)
}
func findSecondMinimumValue(root *TreeNode) (ans int) {
	minVal := root.Val
	ans = -1
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil || (ans != -1 && node.Val > ans) {
			return
		}
		if node.Val > minVal {
			ans = node.Val
		}
		dfs(node.Left)
		dfs(node.Right)
	}
	return
}

func minDepth(root *TreeNode) (ans int) {
	if root == nil {
		return 0
	}
	ans = math.MaxInt
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, depth int) {
		if node == nil || depth > ans {
			return
		}
		depth++
		if root.Left == root.Right {
			ans = min(depth, ans)
		}
		dfs(node.Left, depth)
		dfs(node.Right, depth)
	}
	dfs(root, 0)
	return ans
}
func hasPathSum(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false
	}
	targetSum -= root.Val
	if root.Left == root.Right {
		if targetSum == 0 {
			return true
		} else {
			return false
		}
	}
	return hasPathSum(root.Left, targetSum) || hasPathSum(root.Right, targetSum)
}
func sumNumbers(root *TreeNode) int {
	var dfs func(*TreeNode, int) int
	dfs = func(node *TreeNode, sum int) int {
		if node == nil {
			return 0
		}
		sum = sum*10 + node.Val
		if node.Left == node.Right {
			return sum
		}
		leftSum := dfs(node.Left, sum)
		rightSum := dfs(node.Right, sum)
		return leftSum + rightSum
	}
	return dfs(root, 0)
}
func rightSideView(root *TreeNode) (ans []int) {
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, depth int) {
		if node == nil {
			return
		}
		if depth == len(ans) {
			ans = append(ans, node.Val)
		}
		depth++
		dfs(node.Right, depth)
		dfs(node.Left, depth)
	}
	dfs(root, 0)
	return ans
}
func goodNodes1(root *TreeNode) int {
	var dfs func(*TreeNode, int) int
	dfs = func(node *TreeNode, maxVal int) int {
		if node == nil {
			return 0
		}
		left := dfs(node.Right, max(maxVal, node.Val))
		right := dfs(node.Left, max(maxVal, node.Val))
		if node.Val >= maxVal {
			return 1 + left + right
		}
		return left + right
	}
	return dfs(root, root.Val)
}
func goodNodes_garb(root *TreeNode) int {
	var dfs func(*TreeNode, int) int
	dfs = func(node *TreeNode, maxVal int) int {
		if node == nil {
			return 0
		}
		if node.Left == node.Right {
			if node.Val >= maxVal {
				return 1
			} else {
				return 0
			}
		}
		left := dfs(node.Right, max(maxVal, node.Val))
		right := dfs(node.Left, max(maxVal, node.Val))
		return left + right
	}
	return dfs(root, root.Val)
}
func pseudoPalindromicPaths(root *TreeNode) (ans int) {
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, mask int) {
		if node == nil {
			return
		}
		mask ^= 1 << node.Val
		if node.Left == node.Right {
			if mask&(mask-1) == 0 {
				// if bits.OnesCount(uint(mask)) <= 1 {
				ans++
			}
			return
		}
		dfs(node.Left, mask)
		dfs(node.Right, mask)
	}
	dfs(root, 0)
	return
}
func sumEvenGrandparent1(root *TreeNode) (ans int) {
	var dfs func(*TreeNode, *TreeNode, *TreeNode)
	dfs = func(node, parent, grandParent *TreeNode) {
		if node == nil {
			return
		}
		if grandParent != nil && grandParent.Val%2 == 0 {
			ans += node.Val
		}
		dfs(node.Left, node, parent)
		dfs(node.Right, node, parent)
	}
	dfs(root, nil, nil)
	return
}
func sumEvenGrandparent(root *TreeNode) int {
	var dfs func(*TreeNode, *TreeNode, *TreeNode) int
	dfs = func(node, parent, grandParent *TreeNode) int {
		if node == nil {
			return 0
		}
		leftSum := dfs(node.Left, node, parent)
		rightSum := dfs(node.Right, node, parent)
		val := 0
		if grandParent != nil && grandParent.Val%2 == 0 {
			val = node.Val
		}
		return leftSum + rightSum + val
	}
	return dfs(root, nil, nil)
}

func smallestFromLeaf(root *TreeNode) string {
	ans := []byte{}
	var dfs func(*TreeNode, []byte)
	dfs = func(node *TreeNode, path []byte) {
		if node == nil {
			return
		}
		// 将节点值转换为对应的小写字母并添加到路径的开头
		path = append([]byte{byte(node.Val + 'a')}, path...)
		if node.Left == nil && node.Right == nil {
			if len(ans) == 0 || bytes.Compare(path, ans) < 0 {
				// 复制 path 到 ans
				ans = make([]byte, len(path))
				copy(ans, path)
			}
			return
		}
		dfs(node.Left, path)
		dfs(node.Right, path)
	}
	dfs(root, []byte{})
	return string(ans)
}

// 自顶向下
func maxAncestorDiff1(root *TreeNode) (ans int) {
	var dfs func(*TreeNode, int, int)
	dfs = func(node *TreeNode, mx, mn int) {
		if node == nil {
			ans = max(ans, mx-mn)
			return
		}
		mx = max(node.Val, mx)
		mn = min(node.Val, mn)
		dfs(node.Left, mx, mn)
		dfs(node.Right, mx, mn)
	}
	dfs(root, root.Val, root.Val)
	return ans
}

// 自底向上
func maxAncestorDiff(root *TreeNode) (ans int) {
	var dfs func(*TreeNode) (int, int)
	// 返回最大值   最小值
	dfs = func(node *TreeNode) (int, int) {
		if node == nil {
			return math.MinInt, math.MaxInt
		}
		lMx, lMn := dfs(node.Left)
		rMx, rMn := dfs(node.Right)
		curMax := max(rMx, lMx, node.Val)
		curMin := min(lMn, rMn, node.Val)
		ans = max(ans, node.Val-curMin, curMax-node.Val)
		return curMax, curMin
	}
	dfs(root)
	return ans
}
func sumRootToLeaf(root *TreeNode) int {
	var dfs func(*TreeNode, int) int
	// 返回最大值   最小值
	dfs = func(node *TreeNode, sum int) int {
		if node == nil {
			return 0
		}
		sum = sum<<1 + node.Val
		if node.Left == node.Right {
			return sum
		}
		leftSum := dfs(node.Left, sum)
		rightSum := dfs(node.Right, sum)
		return leftSum + rightSum
	}
	return dfs(root, root.Val)
}
func addOneRow(root *TreeNode, val int, depth int) *TreeNode {
	if depth == 1 {
		return &TreeNode{Val: -1, Left: root}
	}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, dpt int) {
		if node == nil {
			return
		}
		if dpt+1 == depth {
			node.Left = &TreeNode{Val: -1, Left: node.Left}
			node.Right = &TreeNode{Val: -1, Right: node.Right}
			return
		}
		dpt++
		dfs(node.Left, dpt)
		dfs(node.Right, dpt)
	}
	dfs(root, 1)
	return root
}
func longestZigZag(root *TreeNode) int {
	var dfs func(*TreeNode, bool, int) int
	dfs = func(node *TreeNode, isLeft bool, depth int) int {
		if node == nil {
			return depth
		}
		if isLeft {
			return max(dfs(node.Left, true, 1), dfs(node.Right, false, depth+1))
		}
		return max(dfs(node.Left, true, depth+1), dfs(node.Right, false, 1))
	}
	return max(dfs(root, false, 1), dfs(root, true, 1))
}
func flipMatchVoyage(root *TreeNode, voyage []int) (ans []int) {
	// voyage 是它的索引位置
	i := 0
	var dfs func(*TreeNode) bool
	dfs = func(node *TreeNode) bool {
		if node == nil {
			return true
		}
		if i > len(voyage) || voyage[i] != node.Val {
			return false
		}
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
	// 不能翻转成功
	return []int{}
}
func isUnivalTree(root *TreeNode) bool {
	if root == nil {
		return true
	}
	if root.Left != nil && root.Left.Val != root.Val {
		return false
	}
	if root.Right != nil && root.Right.Val != root.Val {
		return false
	}
	return isUnivalTree(root.Left) && isUnivalTree(root.Right)
}
func flipEquiv(root1 *TreeNode, root2 *TreeNode) bool {
	if root1 == nil || root2 == nil {
		return root1 == root2
	}
	return root1.Val == root2.Val && (flipEquiv(root1.Left, root2.Left) && flipEquiv(root1.Right, root2.Right) ||
		(flipEquiv(root1.Left, root2.Right) && flipEquiv(root1.Right, root2.Left)))
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func isBalanced(root *TreeNode) bool {
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
func invertTree1(root *TreeNode) *TreeNode {
	if root == nil {
		return root
	}
	left := invertTree(root.Left)
	right := invertTree(root.Right)
	root.Right = left
	root.Left = right
	return root
}
func invertTree(root *TreeNode) *TreeNode {
	if root == nil {
		return root
	}
	root.Left, root.Right = root.Right, root.Left
	invertTree(root.Left)
	invertTree(root.Right)
	return root
}
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
	if root1 == nil {
		return root2
	}
	if root2 == nil {
		return root1
	}
	root1.Val += root2.Val
	root1.Left = mergeTrees(root1.Left, root2.Left)
	root1.Right = mergeTrees(root1.Right, root2.Right)
	return root1
}
func evaluateTree(root *TreeNode) bool {
	if root == nil {
		return true
	}
	if root.Left == root.Right {
		return root.Val != 0
	}
	left := evaluateTree(root.Left)
	right := evaluateTree(root.Right)
	if root.Val == 2 {
		return left || right
	} else {
		return left && right
	}
}
func findFrequentTreeSum(root *TreeNode) []int {
	cnt := map[int]int{}
	maxCnt := 0
	ls := []int{}
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftSum := dfs(node.Left)
		rightSum := dfs(node.Right)
		curSum := leftSum + rightSum + node.Val
		fmt.Println(curSum)
		cnt[curSum]++
		if cnt[curSum] > maxCnt {
			maxCnt = cnt[curSum]
			ls = []int{curSum}
		} else if cnt[curSum] == maxCnt {
			ls = append(ls, curSum)
		}
		return curSum
	}
	dfs(root)
	return ls
}
func findTilt(root *TreeNode) (ans int) {
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftSum := dfs(node.Left)
		rightSum := dfs(node.Right)
		curSum := leftSum + rightSum + node.Val
		ans += abs(leftSum - rightSum)
		return curSum
	}
	dfs(root)
	return
}
func tree2str1(root *TreeNode) string {
	if root == nil {
		return ""
	}
	val := strconv.Itoa(root.Val)
	if root.Left == root.Right {
		return val
	}
	left := tree2str(root.Left)
	right := tree2str(root.Right)
	if right == "" {
		return val + "(" + left + ")"
	}
	return val + "(" + left + ")(" + right + ")"
}
func tree2str(root *TreeNode) string {
	if root == nil {
		return ""
	}
	val := strconv.Itoa(root.Val)
	if root.Left == root.Right {
		return val
	}
	left := tree2str(root.Left)
	right := tree2str(root.Right)
	if right == "" {
		return fmt.Sprintf("%s(%s)", val, left)
	}
	return fmt.Sprintf("%s(%s)(%s)", val, left, right)
}
func averageOfSubtree(root *TreeNode) (ans int) {
	var dfs func(*TreeNode) (int, int)
	// 返回子树和  子树元素个数
	dfs = func(node *TreeNode) (int, int) {
		if node == nil {
			return 0, 0
		}
		leftSum, leftCnt := dfs(node.Left)
		rightSum, rightCnt := dfs(node.Right)
		curSum := leftSum + rightSum + node.Val
		curCnt := leftCnt + rightCnt + 1
		if curCnt != 0 && curSum/curCnt == node.Val {
			ans++
		}
		return curSum, curCnt
	}
	dfs(root)
	return
}
func kthLargestPerfectSubtree(root *TreeNode, k int) int {
	hs := []int{}
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftH := dfs(node.Left)
		if leftH == -1 {
			return -1
		}
		rightH := dfs(node.Right)
		if rightH == -1 || leftH != rightH {
			return -1
		}
		curH := leftH + 1
		hs = append(hs, curH)
		return curH
	}
	dfs(root)
	if len(hs) < k {
		return -1
	}
	slices.SortFunc(hs, func(x, y int) int { return y - x })
	return 1<<hs[k-1] - 1
}
func btreeGameWinningMove(root *TreeNode, n int, x int) bool {
	lsz, rsz := 0, 0
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftSize := dfs(node.Left)
		rightSize := dfs(node.Right)
		if node.Val == x {
			lsz, rsz = leftSize, rightSize
		}
		return leftSize + rightSize + 1
	}
	dfs(root)
	n2 := max(lsz, rsz, n-1-lsz-rsz)
	n1 := n - n2
	return n2 > n1
}
func sameTree(p, q *TreeNode) bool {
	if p == nil || q == nil {
		return p == q
	}
	return p.Val == q.Val && sameTree(p.Left, q.Left) && sameTree(p.Right, q.Right)
}
func getHeight(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return max(getHeight(root.Left), getHeight(root.Right)) + 1
}
func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
	subHeight := getHeight(subRoot)
	var dfs func(*TreeNode) (int, bool)
	dfs = func(node *TreeNode) (int, bool) {
		if node == nil {
			return 0, false
		}
		leftHeight, lFound := dfs(node.Left)
		rightHeight, rFound := dfs(node.Right)
		if lFound || rFound {
			return 0, true
		}
		curHeight := max(leftHeight, rightHeight) + 1
		return curHeight, curHeight == subHeight && sameTree(node, subRoot)
	}
	_, found := dfs(root)
	return found
}
func countPairs(root *TreeNode, distance int) (ans int) {
	var dfs func(*TreeNode) []int
	dfs = func(node *TreeNode) []int {
		if node == nil {
			return []int{0}
		}
		if node.Left == node.Right {
			return []int{1}
		}
		lefts := dfs(node.Left)
		rights := dfs(node.Right)
		for _, l := range lefts {
			for _, r := range rights {
				if l+r <= distance {
					ans++
				}
			}
		}
		res := []int{}
		for _, l := range lefts {
			res = append(res, l+1)
		}
		for _, r := range rights {
			res = append(res, r+1)
		}
		return res
	}
	dfs(root)
	return ans
}
func expandBinaryTree(root *TreeNode) *TreeNode {
	var dfs func(*TreeNode) *TreeNode
	dfs = func(node *TreeNode) *TreeNode {
		if node == nil {
			return node
		}
		if node.Left != nil {
			node.Left = &TreeNode{Val: -1, Left: dfs(node.Left)}
		}
		if node.Right != nil {
			node.Right = &TreeNode{Val: -1, Right: dfs(node.Right)}
		}
		return node
	}
	return dfs(root)
}

func pruneTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Left == root.Right {
		if root.Val == 0 {
			return nil
		}
		return root
	}
	root.Left = pruneTree(root.Left)
	root.Right = pruneTree(root.Right)
	// 如果左右子树都是空
	if root.Left == root.Right && root.Val == 0 {
		return nil
	}
	return root
}
func removeLeafNodes(root *TreeNode, target int) *TreeNode {
	if root == nil {
		return root
	}
	if root.Left == root.Right {
		if root.Val == target {
			return nil
		}
		return root
	}
	root.Left = removeLeafNodes(root.Left, target)
	root.Right = removeLeafNodes(root.Right, target)
	if root.Left == root.Right && root.Val == target {
		return nil
	}
	return root
}
func delNodes(root *TreeNode, to_delete []int) (ans []*TreeNode) {
	cnt := map[int]int{}
	for _, x := range to_delete {
		cnt[x]++
	}
	var dfs func(*TreeNode) *TreeNode
	dfs = func(node *TreeNode) *TreeNode {
		if node == nil {
			return nil
		}
		node.Left = dfs(node.Left)
		node.Right = dfs(node.Right)

		if cnt[node.Val] > 0 {
			if node.Left != nil {
				ans = append(ans, node.Left)
			}
			if node.Right != nil {
				ans = append(ans, node.Right)
			}
			return nil
		}
		return node
	}
	if dfs(root) != nil {
		// root dfs之后其实已经是删除后的 所以可以直接加入
		ans = append(ans, root)
	}
	return ans
}
func convertBST(root *TreeNode) *TreeNode {
	var dfs func(*TreeNode)
	sum := 0
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Right)
		sum += node.Val
		node.Val = sum
		dfs(node.Left)
	}
	dfs(root)
	return root
}
func subtreeWithAllDeepest1(root *TreeNode) (ans *TreeNode) {
	var dfs func(*TreeNode, int) int
	maxDepth := 0
	dfs = func(node *TreeNode, depth int) int {
		if node == nil {
			maxDepth = max(maxDepth, depth)
			return depth
		}
		depth++
		leftDepth := dfs(node.Left, depth)
		rightDepth := dfs(node.Right, depth)
		if leftDepth == rightDepth && leftDepth == maxDepth {
			ans = node
		}
		return max(leftDepth, rightDepth)
	}
	dfs(root, 1)
	return ans
}
func subtreeWithAllDeepest(root *TreeNode) *TreeNode {
	var dfs func(*TreeNode) (int, *TreeNode)
	dfs = func(node *TreeNode) (int, *TreeNode) {
		if node == nil {
			return 0, nil
		}
		leftDepth, leftLca := dfs(node.Left)
		rightDepth, rightLca := dfs(node.Right)
		curDepth := max(leftDepth, rightDepth) + 1
		if leftDepth > rightDepth {
			return leftDepth + 1, leftLca
		} else if leftDepth < rightDepth {
			return rightDepth + 1, rightLca
		}
		return curDepth, node
	}
	_, ans := dfs(root)
	return ans
}
func sufficientSubset(root *TreeNode, limit int) *TreeNode {
	if root == nil {
		return root
	}
	limit -= root.Val
	if root.Left == root.Right {
		if limit > 0 {
			return nil
		} else {
			return root
		}
	}
	root.Left = sufficientSubset(root.Left, limit)
	root.Right = sufficientSubset(root.Right, limit)
	if root.Left == root.Right {
		return nil
	}
	return root
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
		return max(left, right)
	}
	dfs(root)
	return
}
func longestUnivaluePath(root *TreeNode) (ans int) {
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return -1
		}
		left := dfs(node.Left) + 1
		right := dfs(node.Right) + 1
		if node.Left != nil && node.Left.Val != node.Val {
			left = 0
		}
		if node.Right != nil && node.Right.Val != node.Val {
			right = 0
		}
		ans = max(ans, left+right)
		return max(left, right)
	}
	dfs(root)
	return
}
func maxPathSum(root *TreeNode) int {
	ans := math.MinInt
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftSum := dfs(node.Left)
		rightSum := dfs(node.Right)
		ans = max(ans, leftSum+rightSum+node.Val)
		return max(max(leftSum, rightSum)+node.Val, 0)
	}
	dfs(root)
	return ans
}
func amountOfTime(root *TreeNode, start int) (ans int) {
	var dfs func(*TreeNode) (int, bool)
	dfs = func(node *TreeNode) (int, bool) {
		if node == nil {
			return 0, false
		}
		leftDepth, leftFound := dfs(node.Left)
		rightDepth, rightFound := dfs(node.Right)
		if node.Val == start {
			ans = max(rightDepth, leftDepth)
			return 1, true
		}
		if leftFound || rightFound {
			ans = max(ans, rightDepth, leftDepth)
			if leftDepth > rightDepth {
				return leftDepth + 1, true
			} else {
				return rightDepth + 1, true
			}
		}
		return max(leftDepth, rightDepth) + 1, false
	}
	dfs(root)
	return
}
func pathSum11(root *TreeNode, targetSum int) (ans [][]int) {
	var dfs func(*TreeNode, int)
	path := []int{}
	dfs = func(node *TreeNode, sum int) {
		if node == nil {
			return
		}
		sum -= node.Val
		path = append(path, node.Val)
		if node.Left == node.Right {
			if sum == 0 {
				ans = append(ans, slices.Clone(path))
			}
			path = path[:len(path)-1]
			return
		}
		dfs(node.Left, sum)
		dfs(node.Right, sum)
		path = path[:len(path)-1]
	}
	dfs(root, targetSum)
	return ans
}

func lowestCommonAncestor2(root, p, q *TreeNode) *TreeNode {
	if p.Val < root.Val && q.Val < root.Val {
		return lowestCommonAncestor2(root.Left, p, q)
	} else if p.Val > root.Val && q.Val > root.Val {
		return lowestCommonAncestor2(root.Right, p, q)
	}
	return root
}
func pathSum(root *TreeNode, targetSum int) (ans int) {
	cnt := map[int]int{0: 1}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, sum int) {
		if node == nil {
			return
		}
		sum += node.Val
		if cnt[sum-targetSum] > 0 {
			ans += cnt[sum-targetSum]
		}
		cnt[sum]++
		dfs(node.Left, sum)
		dfs(node.Right, sum)
		cnt[sum]--
	}
	dfs(root, 0)
	return ans
}
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	if root == nil || root == p || root == q {
		return root
	}
	left := lowestCommonAncestor(root.Left, p, q)
	right := lowestCommonAncestor(root.Right, p, q)
	if left == nil {
		return right
	}
	if right == nil {
		return left
	}
	return root
}
func getDirections(root *TreeNode, startValue int, destValue int) string {
	// 内部全局变量 跟113题一致
	var path []byte // 声明就有默认值就可以直接append
	var dfs func(*TreeNode, int) bool
	dfs = func(node *TreeNode, target int) bool {
		if node == nil {
			return false
		}
		// 找到了就返回 path就不会变了
		if node.Val == target {
			return true
		}
		path = append(path, 'L')
		if dfs(node.Left, target) {
			return true
		}
		// 恢复现场同时把新路径 R放入
		path[len(path)-1] = 'R'
		if dfs(node.Right, target) {
			return true
		}
		// 恢复现场
		path = path[:len(path)-1]
		return false
	}
	dfs(root, startValue)
	startPath := path
	path = nil
	dfs(root, destValue)
	destPath := path
	// 去掉相同的前缀之后
	for len(startPath) > 0 && len(destPath) > 0 && startPath[0] == destPath[0] {
		startPath = startPath[1:]
		destPath = destPath[1:]
	}
	return strings.Repeat("U", len(startPath)) + string(destPath)
}

/*
	 func searchBST1(root *TreeNode, val int) *TreeNode {
		if root == nil || root.Val == val {
			return root
		}
		left := searchBST(root.Left, val)
		if left != nil {
			return left
		}
		right := searchBST(root.Right, val)
		if right != nil {
			return right
		}
		return nil
	}
*/
func searchBST(root *TreeNode, val int) *TreeNode {
	if root == nil || root.Val == val {
		return root
	}
	if val > root.Val {
		return searchBST(root.Right, val)
	}
	return searchBST(root.Left, val)
}

/*
	 func getMinimumDifference(root *TreeNode) (ans int) {
		ans = math.MaxInt
		var dfs func(*TreeNode, int, int)
		dfs = func(node *TreeNode, mn, mx int) {
			if node == nil {
				ans = min(ans, mx-mn)
				return
			}
			curMn := min(mn, node.Val)
			curMx := max(mx, node.Val)
			dfs(node.Left, curMn, curMx)
			dfs(node.Right, curMn, curMx)
		}
		dfs(root, math.MaxInt, math.MinInt)
		return ans
	}
*/
func insertIntoMaxTree(root *TreeNode, val int) *TreeNode {
	if root == nil || root.Val < val {
		return &TreeNode{Left: root, Val: val}
	}
	root.Right = insertIntoMaxTree(root.Right, val)
	return root
}
func bstFromPreorder(preorder []int) *TreeNode {
	var dfs func(int, int) *TreeNode
	dfs = func(left, right int) *TreeNode {
		if left > right {
			return nil
		}
		// mid指向右子树的第1个节点
		mid := left + 1
		for mid < right && preorder[mid] < preorder[left] {
			mid++
		}
		return &TreeNode{
			Left:  dfs(left+1, mid-1),
			Right: dfs(mid, right),
			Val:   preorder[left],
		}
	}
	return dfs(0, len(preorder)-1)
}
func balanceBST(root *TreeNode) *TreeNode {
	ls := []int{}
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Left)
		ls = append(ls, node.Val)
		dfs(node.Right)
	}
	dfs(root)
	var build func(int, int) *TreeNode
	build = func(left, right int) *TreeNode {
		if left > right {
			return nil
		}
		mid := left + ((right - left) >> 1)
		return &TreeNode{
			Left:  build(left, mid-1),
			Right: build(mid+1, right),
			Val:   ls[mid],
		}
	}
	return build(0, len(ls)-1)
}
func createBinaryTree(descriptions [][]int) *TreeNode {
	cnt := map[int]*TreeNode{}
	in := map[int]bool{}
	for _, v := range descriptions {
		parent, child, isLeft := v[0], v[1], v[2]
		if cnt[child] == nil {
			cnt[child] = &TreeNode{Val: child}
		}
		if cnt[parent] == nil {
			cnt[parent] = &TreeNode{Val: parent}
		}
		if isLeft == 1 {
			cnt[parent].Left = cnt[child]
		} else {
			cnt[parent].Right = cnt[child]
		}
		in[child] = true
	}
	for i, node := range cnt {
		// 入度为0的就 根节点
		if !in[i] {
			return node
		}
	}
	return nil
}

/*
	 func buildTree(preorder []int, inorder []int) *TreeNode {
		n := len(preorder)
		if n == 0 {
			return nil
		}
		leftSize := slices.Index(inorder, preorder[0])
		left := buildTree(preorder[1:1+leftSize], inorder[:leftSize])
		right := buildTree(preorder[1+leftSize:], inorder[1+leftSize:])
		return &TreeNode{Left: left, Right: right, Val: preorder[0]}
	}
*/
func buildTree(inorder []int, postorder []int) *TreeNode {
	n := len(postorder)
	if n == 0 {
		return nil
	}
	leftSize := slices.Index(inorder, postorder[n-1])
	left := buildTree(inorder[:leftSize], postorder[0:leftSize])
	right := buildTree(inorder[leftSize+1:], postorder[leftSize:n-1])
	return &TreeNode{Left: left, Right: right, Val: postorder[n-1]}
}
func constructFromPrePost(preorder []int, postorder []int) *TreeNode {
	n := len(preorder)
	if n == 0 {
		return nil
	}
	if n == 1 {
		return &TreeNode{Val: preorder[0]}
	}
	leftSize := slices.Index(postorder, preorder[1]) + 1
	left := constructFromPrePost(preorder[1:1+leftSize], postorder[0:leftSize])
	right := constructFromPrePost(preorder[1+leftSize:], postorder[leftSize:n-1])
	return &TreeNode{Val: preorder[0], Left: left, Right: right}
}
func insertIntoBST(root *TreeNode, val int) *TreeNode {
	if root == nil {
		return root
	}
	if root.Left == root.Right {
		if val > root.Val {
			root.Right = &TreeNode{Val: val}
		} else {
			root.Left = &TreeNode{Val: val}
		}
		return root
	}
	if val > root.Val {
		root.Right = insertIntoBST(root.Right, val)
	} else if val < root.Val {
		root.Left = insertIntoBST(root.Left, val)
	}
	return root
}
func deleteNode(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Val < key {
		// 去右子树中删除
		root.Right = deleteNode(root.Right, key)
	} else if root.Val > key {
		root.Left = deleteNode(root.Left, key)
	} else {
		if root.Left == nil {
			return root.Right
		} else if root.Right == nil {
			return root.Left
		} else {
			// 左右子树都存在的情况
			node := root.Right
			for node.Left != nil {
				node = node.Left
			}
			node.Left = root.Left
			// 走到右子树最左侧节点
			root = root.Right
		}
	}
	return root
}
func trimBST(root *TreeNode, low int, high int) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Val > high {
		return trimBST(root.Left, low, high)
	}
	if root.Val < low {
		return trimBST(root.Right, low, high)
	}
	root.Left = trimBST(root.Left, low, high)
	root.Right = trimBST(root.Right, low, high)

	return root
}
func rob(root *TreeNode) int {
	var dfs func(*TreeNode) (int, int)
	// 返回打劫可以得到的钱  不打劫可以得到的钱
	dfs = func(node *TreeNode) (int, int) {
		if node == nil {
			return 0, 0
		}
		if node.Left == node.Right {
			return node.Val, 0
		}
		leftRob, leftNot := dfs(node.Left)
		rightRob, rightNot := dfs(node.Right)
		return node.Val + leftNot + rightNot, max(leftRob, leftNot) + max(rightRob, rightNot)
	}
	robbed, notRob := dfs(root)
	return max(robbed, notRob)
}
func minCameraCover(root *TreeNode) int {
	var dfs func(*TreeNode) (int, int, int)
	dfs = func(node *TreeNode) (int, int, int) {
		if node == nil {
			return math.MaxInt / 2, 0, 0
		}
		l_choose, l_byFather, l_byChild := dfs(node.Left)
		r_choose, r_byFather, r_byChild := dfs(node.Right)
		// 当前节点选择了 那么子节点随便哪个都行
		choose := 1 + min(l_choose, l_byFather, l_byChild) + min(r_choose, r_byFather, r_byChild)
		// 当前节点被父节点覆盖的话 那么子节点要么选择被覆盖 要么被它的子节点覆盖
		byFather := min(l_choose, l_byChild) + min(r_choose, r_byChild)
		// 当前节点被子节点覆盖的话  那么子节点中必须得要有一个选中（或者俩都选中）
		// 当前节点是被子节点覆盖  那么肯定不能选择l_byFather或r_byFather
		byChild := min(l_choose+r_byChild, l_choose+r_choose, r_choose+l_byChild)
		return choose, byFather, byChild
	}
	choose, _, byChild := dfs(root)
	return min(choose, byChild)
}
func lcaDeepestLeaves(root *TreeNode) *TreeNode {
	var dfs func(*TreeNode) (int, *TreeNode)
	dfs = func(node *TreeNode) (int, *TreeNode) {
		if node == nil {
			return 0, nil
		}
		leftDepth, leftLca := dfs(node.Left)
		rightDepth, rightLca := dfs(node.Right)
		if leftDepth > rightDepth {
			return leftDepth + 1, leftLca
		} else if rightDepth > leftDepth {
			return rightDepth + 1, rightLca
		}
		return leftDepth + 1, node
	}
	_, lca := dfs(root)
	return lca
}
