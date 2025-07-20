package a07111

import (
	"math"
	"math/big"
	"math/bits"
)

func popcountDepth222(n int64, k int) int64 {
	N := int(n)
	ans := 0
	for i := 1; i <= N; i++ {
		if bits.OnesCount(uint(i)) == k && i > k {
			ans++
		}
	}
	return int64(ans)
}

func popcountDepth(n int64, k int) int64 {
	if n <= int64(k) {
		return 0
	}
	nBig := big.NewInt(n)
	bits := nBig.Bytes()
	binaryStr := make([]byte, 0, len(bits)*8)

	for i := len(bits) - 1; i >= 0; i-- {
		b := bits[i]
		for j := 7; j >= 0; j-- {
			if b&(1<<uint(j)) != 0 {
				binaryStr = append(binaryStr, '1')
			} else {
				binaryStr = append(binaryStr, '0')
			}
		}
	}
	for len(binaryStr) > 0 && binaryStr[0] == '0' {
		binaryStr = binaryStr[1:]
	}

	m := len(binaryStr)
	ans := 0
	for t := k + 1; t < m; t++ {
		if t < k {
			continue
		}
		ans += combination(t-1, k)
	}
	ones := 0
	for i := 0; i < m; i++ {
		if binaryStr[i] == '1' {
			remainingBits := m - i - 1
			remainingOnes := k - ones - 1

			if remainingOnes >= 0 {
				ans += combination(remainingBits, remainingOnes)
			}

			ones++

			if ones > k {
				break
			}
		}
	}

	return int64(ans)
}
func combination(n, k int) int {
	if k < 0 || k > n {
		return 0
	}
	if k == 0 || k == n {
		return 1
	}
	k = min(k, n-k)
	res := 1
	for i := 0; i < k; i++ {
		res = res * (n - i) / (i + 1)
	}
	return res
}

func findMaxPathScore(edges [][]int, online []bool, k int64) (ans int) {
	n := len(online)
	type pair struct{ to, w int }
	g := make([][]pair, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
	}
	ans = math.MaxInt
	vis := make([]bool, n)
	// 返回sum 和最小值
	var dfs func(int) (int, int)
	dfs = func(x int) (sum int, mn int) {
		mn = math.MaxInt
		vis[x] = true
		if x == n-1 {
			return
		}
		for _, item := range g[x] {
			y, w := item.to, item.w
			sum += w
			mn = min(mn, w)
			if !vis[y] && online[y] {
				subSum, subMn := dfs(y)
				sum += subSum
				mn = min(mn, subMn)
			}
		}
		return
	}

	for i, b := range vis {
		if !b && online[i] {
			sum, mn := dfs(i)
			if sum <= int(k) {
				ans = min(ans, mn)
			}
			vis[0] = false
			vis[n-1] = false
		}
	}
	if ans == math.MaxInt {
		return -1
	}
	return
}
