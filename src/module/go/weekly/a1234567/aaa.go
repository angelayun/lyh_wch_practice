func solve(board [][]byte) {
	m := len(board)
	if m == 0 { // 处理空矩阵情况，避免后续panic
		return
	}
	n := len(board[0])
	if n == 0 {
		return
	}
	// 去掉m<3||n<3的判断，因为3x3矩阵也可能有需要处理的情况

	var closed bool
	var dfs func(int, int, byte, byte)
	dfs = func(x, y int, old, new byte) {
		// 越界判断放最前面
		if x < 0 || x >= m || y < 0 || y >= n {
			return
		}
		// 到达边界且当前是需要处理的目标字符（O或Y）
		if x == 0 || x == m-1 || y == 0 || y == n-1 {
			if board[x][y] == old {
				closed = false
			}
			return
		}
		if board[x][y] != old {
			return
		}
		board[x][y] = new // 标记已访问
		dfs(x-1, y, old, new)
		dfs(x+1, y, old, new)
		dfs(x, y-1, old, new)
		dfs(x, y+1, old, new)
	}

	for i := 1; i < m-1; i++ {
		for j := 1; j < n-1; j++ {
			if board[i][j] == 'O' {
				closed = true       // 初始假设是封闭的
				dfs(i, j, 'O', 'Y') // 先用Y标记遍历过的O

				if closed {
					// 确实封闭，把Y改成X
					dfs(i, j, 'Y', 'X')
				} else {
					// 不封闭，把Y改回O（关键修复：原来缺少这步）
					dfs(i, j, 'Y', 'O')
				}
			}
		}
	}
}
