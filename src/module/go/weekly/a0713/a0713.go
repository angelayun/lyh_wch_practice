package a0713

import (
	// "fmt"
	"math"
	"slices"
	"unicode"
)

func matchPlayersAndTrainers(players []int, trainers []int) int {
	slices.Sort(players)
	slices.Sort(trainers)
	j := 0
	n := len(players)
	for _, x := range trainers {
		if j < n && players[j] <= x {
			j++
		}
	}
	return j
}

func processStr222(s string) string {
	res := []byte{}
	for _, ch := range s {
		if unicode.IsLetter(ch) {
			res = append(res, byte(ch))
		} else if ch == '*' {
			if len(res) > 0 {
				res = res[:len(res)-1]
			}
		} else if ch == '#' {
			for _, cur := range res {
				res = append(res, cur)
			}
		} else {
			i, j := 0, len(res)-1
			for i < j {
				res[i], res[j] = res[j], res[i]
				i++
				j--
			}
		}
	}
	return string(res)
}
func minCost(n int, edges [][]int, k int) int {
	if k == n {
		return 0
	}
	type pair struct{ to, w int }
	g := make([][]pair, n)
	mx, mn := math.MinInt, math.MaxInt
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
		mx = max(w, mx)
		mn = min(w, mn)
	}
	left := mn - 1
	right := mx + 1
	check := func(mid int) bool {
		cnt := 0
		vis := make([]bool, n)
		// mid为边的最大成本
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = true
			for _, item := range g[x] {
				if !vis[item.to] && item.w <= mid {
					dfs(item.to)
				}
			}
		}
		for i, ok := range vis {
			if !ok {
				dfs(i)
				cnt++
			}
		}
		return cnt <= k
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}


func longestPalindromeLength(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	maxLen := 0
	// 尝试所有可能的子串终点
	for end := n; end > 0; end-- {
		if isPalindrome(s[:end]) {
			maxLen = end
			break
		}
	}
	return maxLen
}

// 判断字符串是否为回文
func isPalindrome(s string) bool {
	left, right := 0, len(s)-1
	for left < right {
		if s[left] != s[right] {
			return false
		}
		left++
		right--
	}
	return true
}
func reverse(slice []int) []int {
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		slice[i], slice[j] = slice[j], slice[i]
	}
	return slice
}
func maxLen(n int, edges [][]int, label string) int {

	g := make([][]int, n)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}
	left := -1
	right := n + 1
	check := func(mid int) bool {
		mxLen := 0
		vis := make([]bool, n)
		path := []byte{}
		// mid为回文串的长度
		var dfs func(int)
		dfs = func(x int) {
			vis[x] = true
			path = append(path, label[x])
			for _, y := range g[x] {
				if !vis[y] {
					dfs(y)
				}
			}
		}
		for i := range n {
			path = []byte{}
			clear(vis)
			dfs(i)
			curMx := longestPalindromeLength(string(path))
			mxLen = max(mxLen, curMx)

			for j := 1; j < len(path); j++ {
				tmp := string(path[j:]) + string(path[0:j])
				mxLen = max(mxLen, longestPalindromeLength(tmp))
			}

		}
		return mxLen >= mid
	}
	for left+1 < right {
		mid := left + ((right - left) >> 1)
		if check(mid) {
			left = mid
		} else {
			right = mid
		}
	}
	return left
}

func processStr(s string) string {
	ans := []byte{}
	for _, c := range s {
		if c == '*' {
			if len(ans) > 0 {
				ans = ans[:len(ans)-1]
			}
		} else if c == '#' {
			ans = append(ans, ans...)
		} else if c == '%' {
			slices.Reverse(ans)
			// ans[:]=ans[::-1]
		} else {
			ans = append(ans, byte(c))
		}
	}
	return string(ans)
}
