func getDirections(root *TreeNode, startValue, destValue int) string {
	var path []byte
	var dfs func(*TreeNode, int) bool
	dfs = func(node *TreeNode, target int) bool {
		if node == nil {
			return false
		}
		if node.Val == target {
			return true
		}
		path = append(path, 'L')
		if dfs(node.Left, target) {
			return true
		}
		path[len(path)-1] = 'R'
		if dfs(node.Right, target) {
			return true
		}
		path = path[:len(path)-1]
		return false
	}
	dfs(root, startValue)
	pathToStart := path

	path = nil
	dfs(root, destValue)
	pathToDest := path

	for len(pathToStart) > 0 && len(pathToDest) > 0 && pathToStart[0] == pathToDest[0] {
		pathToStart = pathToStart[1:] // 去掉前缀相同的部分
		pathToDest = pathToDest[1:]
	}

	return strings.Repeat("U", len(pathToStart)) + string(pathToDest)
}
