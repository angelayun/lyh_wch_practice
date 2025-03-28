package daily

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"strconv"
	"strings"
	"unicode"
)

// 3462
func maxSum(grid [][]int, limits []int, k int) (ans int64) {
	fmt.Println('t')
	temp := []int{}
	cmp := func(a, b int) int { return b - a }
	for i, rows := range grid {
		slices.SortFunc(rows, cmp)
		for _, col := range rows {
			if limits[i] > 0 {
				temp = append(temp, col)
				limits[i]--
			} else {
				break
			}
		}
	}
	slices.SortFunc(temp, cmp)
	for _, v := range temp[:k] {
		ans += int64(v)
	}
	return ans
}

// 3456
func hasSpecialSubstring1(s string, k int) bool {
	n := len(s)
	cnt := 0
	for i, _ := range s {
		cnt++
		if i == n-1 || s[i+1] != s[i] {
			if cnt == k {
				return true
			}
			cnt = 0
		}
	}
	return false
}
func hasSpecialSubstring(s string, k int) bool {
	n := len(s)
	i := 0
	for i < n {
		start := i
		i++
		for i < n && s[i-1] == s[i] {
			i++
		}
		if i-start == k {
			return true
		}
	}
	return false
}

// 3452
func sumOfGoodNumbers(nums []int, k int) (ans int) {
	n := len(nums)
	for i, v := range nums {
		if (i-k < 0 || v > nums[i-k]) && (i+k >= n || v > nums[i+k]) {
			ans += v
		}
	}
	return
}

// 3447
func assignElements(groups []int, elements []int) []int {
	mx := slices.Max(groups)
	target := make([]int, mx+1)
	for i := range target {
		target[i] = -1
	}
	for i, x := range elements {
		// target[x] 比方说2把8标记过了 这时候x为8 就..
		if x > mx || target[x] >= 0 {
			continue
		}
		for y := x; y <= mx; y += x {
			// 没有被标记过 标记为i
			if target[y] < 0 {
				target[y] = i
			}
		}
	}
	for i, x := range groups {
		groups[i] = target[x]
	}
	return groups
}

// 1328
func breakPalindrome(palindrome string) string {
	s := []byte(palindrome)
	n := len(s)
	if n <= 1 {
		return ""
	}
	for i := 0; i < n>>1; i++ {
		if s[i] != 'a' {
			s[i] = 'a'
			return string(s)
		}
	}
	s[n-1] = 'a'
	return string(s)
}

// 3442
func maxDifference(s string) int {
	// 最大奇数次  - 最小正偶数次
	cnt := [26]int{}
	for _, c := range s {
		cnt[c-'a']++
	}
	mx := 0
	mn := math.MaxInt
	for _, v := range cnt {
		if v > 0 {
			if v&1 == 1 {
				mx = max(mx, v)
			} else {
				mn = min(mn, v)
			}

		}
	}
	return mx - mn
}

// 3443

func maxDistance(s string, k int) (ans int) {
	cnt := ['X']int{}
	for _, ch := range s {
		cnt[ch]++
		left := k
		f := func(a, b int) int {
			d := min(a, b, left)
			left -= d
			return abs(a-b) + d*2
		}
		ans = max(ans, f(cnt['N'], cnt['S'])+f(cnt['E'], cnt['W']))
	}
	return
}

// 2444
func countSubarrays(nums []int, minK int, maxK int) (ans int64) {
	minI, maxI, i0 := -1, -1, -1
	for i, x := range nums {
		if x == minK {
			minI = i
		}
		if x == maxK {
			maxI = i
		}
		if x < minK || x > maxK {
			i0 = i
		}
		ans += int64(max(0, min(minI, maxI)-i0))
	}
	return
}

// 3306
func f_3306(word string, k int) (ans int64) {
	// strconv.FormatUint()
	strconv.Atoi(word)
	cnt := map[rune]int{}
	cnt0 := 0
	left := 0
	for _, ch := range word {
		if strings.ContainsRune("aeiou", ch) {
			cnt[ch]++
		} else {
			cnt0++
		}
		for len(cnt) >= 5 && cnt0 >= k {
			y := word[left]
			if strings.ContainsRune("aeiou", rune(y)) {
				cnt[rune(y)]--
				if cnt[rune(y)] == 0 {
					delete(cnt, rune(y))
				}
			} else {
				cnt0--
			}
			left++
		}
		ans += int64(left)
	}
	return
}
func countOfSubstrings(word string, k int) (ans int64) {
	// vowels := "aeiou"
	return f_3306(word, k) - f_3306(word, k+1)
}

// 3438
func findValidPair(s string) string {
	cnt := [10]int{}
	for _, ch := range s {
		cnt[ch-'0']++
	}
	for i := 0; i < len(s)-1; i++ {
		x, y := s[i]-'0', s[i+1]-'0'
		if x != y && cnt[x] == int(x) && cnt[y] == int(y) {
			return s[i : i+2]
		}
	}
	return ""
}

// 3432
func countPartitions(nums []int) (ans int) {
	n := len(nums)
	sum := 0
	for _, v := range nums {
		sum += v
	}
	if sum&1 == 0 {
		return n - 1
	}
	return 0
}

// 3433
func countMentions(numberOfUsers int, events [][]string) []int {
	return []int{}
}

// 2597
func beautifulSubsets1(nums []int, k int) int {
	// 去掉空集
	ans := -1
	cnt := map[int]int{}
	var dfs func(int)
	dfs = func(i int) {
		if i == len(nums) {
			ans++
			return
		}
		// 不选
		dfs(i + 1)
		x := nums[i]
		if cnt[x-k] == 0 && cnt[x+k] == 0 {
			cnt[x]++
			dfs(i + 1)
			cnt[x]--
		}
	}
	dfs(0)
	return ans
}
func beautifulSubsets(nums []int, k int) int {
	// 去掉空集
	ans := -1
	cnt := map[int]int{}
	var dfs func(int)
	dfs = func(i int) {
		ans++
		if i == len(nums) {
			return
		}
		for j := i; j < len(nums); j++ {
			x := nums[j]
			if cnt[x-k] == 0 && cnt[x+k] == 0 {
				cnt[x]++
				dfs(j + 1)
				cnt[x]--
			}
		}
	}
	dfs(0)
	return ans
}

// 1763
// longestNiceSubstring 函数用于找到字符串 s 中最长的美好子字符串
// longestNiceSubstring 函数用于找到字符串 s 中最长的美好子字符串
func longestNiceSubstring(s string) string {
	n := len(s)
	mxLen := 0
	mxStart := 0
	// 遍历不同的字母个数限制，从 1 到 26
	for limit := 1; limit <= 26; limit++ {
		l, r := 0, 0
		cnt := 0
		// 用于记录小写字母和大写字母的出现情况
		lower, upper := 0, 0
		// 用于记录小写字母和大写字母的出现次数
		lowerCnt := make(map[rune]int)
		upperCnt := make(map[rune]int)
		for r < n {
			char := rune(s[r])
			lowerChar := unicode.ToLower(char)
			// 如果当前字母第一次出现，增加字母个数
			if lowerCnt[lowerChar] == 0 && upperCnt[lowerChar] == 0 {
				cnt++
			}
			if unicode.IsLower(char) {
				pos := int(char - 'a')
				// if lowerCnt[char] == 0 {
				lower |= (1 << pos)
				// }
				lowerCnt[char]++
			} else {
				pos := int(lowerChar - 'a')
				// if upperCnt[lowerChar] == 0 {
				upper |= (1 << pos)
				// }
				upperCnt[lowerChar]++
			}
			r++
			// 当字母个数超过限制时，移动左指针
			for cnt > limit {
				char := rune(s[l])
				lowerChar := unicode.ToLower(char)
				if unicode.IsLower(char) {
					pos := int(char - 'a')
					lowerCnt[char]--
					if lowerCnt[char] == 0 {
						lower ^= (1 << pos)
					}
				} else {
					pos := int(lowerChar - 'a')
					upperCnt[lowerChar]--
					if upperCnt[lowerChar] == 0 {
						upper ^= (1 << pos)
					}
				}
				if lowerCnt[lowerChar] == 0 && upperCnt[lowerChar] == 0 {
					cnt--
				}
				l++
			}
			// 如果当前子字符串是美好子字符串且长度更长，更新最长美好子字符串的信息
			if lower^upper == 0 && r-l > mxLen {
				mxLen = r - l
				mxStart = l
			}
		}
	}
	return s[mxStart : mxStart+mxLen]
}

// 3340
func isBalanced(num string) bool {
	cnt := [2]int{}
	for i, x := range num {
		cnt[i&1] += int(x - '0')
	}
	return cnt[0] == cnt[1]
}

// 3110
func scoreOfString(s string) (ans int) {
	for i := 1; i < len(s); i++ {
		ans += abs(int(s[i]) - int(s[i-1]))
	}
	return
}

// 3483
func totalNumbers1(digits []int) int {
	cnt := map[int]bool{}
	n := len(digits)
	for i := 0; i < n; i++ {
		if digits[i] == 0 {
			continue
		}
		for j := 0; j < n; j++ {
			if j == i {
				continue
			}
			for k := 0; k < n; k++ {
				if k == j || k == i {
					continue
				}
				cur := digits[i]*100 + digits[j]*10 + digits[k]
				if cur&1 == 0 {
					cnt[cur] = true
				}
			}
		}
	}
	return len(cnt)
}
func totalNumbers(digits []int) int {
	cnt := map[int]struct{}{}
	for i, c := range digits {
		// 个数数不是偶数
		if c&1 == 1 {
			continue
		}
		for j, b := range digits {
			// 每个数字只能选择1次
			if j == i {
				continue
			}
			for k, a := range digits {
				// 不能有前导0  所以百倍数不能是0
				if a == 0 || k == i || k == j {
					continue
				}
				cnt[a*100+b*10+c] = struct{}{}
			}
		}
	}
	return len(cnt)
}

// 3471
func largestInteger(nums []int, k int) int {
	n := len(nums)
	var fn func([]int, int) int
	fn = func(nums []int, x int) int {
		// 判断某个数是否存在数组中
		if slices.Contains(nums, x) {
			return -1
		}
		return x
	}
	if k == n {
		// 每一个数字都可能是答案  找最大的
		return slices.Max(nums)
	} else if k == 1 {
		// 最大的只出现一次的数字
		cnt := map[int]int{}
		for _, x := range nums {
			cnt[x]++
		}
		// 可能会出现没有出现1次的情况 初始值-1
		ans := -1
		for x, c := range cnt {
			if c == 1 && x > ans {
				ans = x
			}
		}
		return ans
	} else {
		return max(fn(nums[1:], nums[0]), fn(nums[:n-1], nums[n-1]))
	}
}

// 2614
func isPrime(x int) bool {
	for i := 2; i*i <= x; i++ {
		if x%i == 0 {
			return false
		}
	}
	return x > 1
}
func diagonalPrime(nums [][]int) (ans int) {
	n := len(nums[0])
	for i, row := range nums {
		for j, v := range row {
			if (i == j || (j == n-i-1)) && v > ans && isPrime(v) {
				ans = max(ans, v)
			}
		}
	}
	return
}

// 2610
func findMatrix1(nums []int) [][]int {
	ans := [][]int{}
	type pair struct{ v, freq int }
	// v 及其对应出现的次数
	cnt := map[int]int{}
	for _, v := range nums {
		// cnt = append(cnt, pair{v, 1})
		cnt[v]++
	}
	pairList := []pair{}
	for v, freq := range cnt {
		pairList = append(pairList, pair{v, freq})
	}
	// 按照出现次数从大到小排序
	slices.SortFunc(pairList, func(x, y pair) int {
		return y.freq - x.freq
	})
	for len(pairList) > 0 && pairList[0].freq > 0 {
		ans = append(ans, []int{})
		for i, p := range pairList {
			if p.freq > 0 {
				ans[len(ans)-1] = append(ans[len(ans)-1], p.v)
				pairList[i].freq--
			}
		}
	}
	return ans
}
func findMatrix2(nums []int) (ans [][]int) {
	// v 及其对应出现的次数
	cnt := map[int]int{}
	for _, v := range nums {
		cnt[v]++
	}
	for len(cnt) > 0 {
		// 预分配空间
		row := make([]int, 0, len(cnt))
		for x := range cnt {
			row = append(row, x)
			cnt[x]--
			if cnt[x] == 0 {
				// 删除当前正在遍历的元素是安全的
				delete(cnt, x)
			}
		}
		ans = append(ans, row)
	}
	return
}
func findMatrix(nums []int) (ans [][]int) {
	cnt := make([]int, len(nums)+1)
	for _, x := range nums {
		c := cnt[x]
		// 应该新起一行了
		if c == len(ans) {
			ans = append(ans, []int{})
		}
		ans[c] = append(ans[c], x)
		cnt[x]++
	}
	return ans
}

// 2643
func rowAndMaximumOnes(mat [][]int) []int {
	ans := make([]int, 2)
	for i, rows := range mat {
		cnt := 0
		for _, col := range rows {
			cnt += col
		}
		if cnt > ans[1] {
			ans[0] = i
			ans[1] = cnt
		}
	}
	return ans
}

// 3492
func maxContainers(n int, w int, maxWeight int) int {
	return min(maxWeight/w, n*n)
}

// 149
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}
func maxPoints(points [][]int) (ans int) {
	n := len(points)
	if n <= 2 {
		return n
	}
	for i := 0; i < n-1; i++ {
		x1, y1 := points[i][0], points[i][1]
		res := 0
		cnt := map[[2]int]int{}
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dx, dy := x2-x1, y2-y1
			if dx < 0 {
				dx = -dx
				dy = -dy
			} else if dx == 0 {
				dy = 1
			} else if dy == 0 {
				dx = 1
			}
			g := gcd(dx, dy)
			cnt[[2]int{dx / g, dy / g}]++
			res = max(res, cnt[[2]int{dx / g, dy / g}])
		}
		ans = max(ans, res+1)
	}
	return
}

// 2255
func countPrefixes1(words []string, s string) (ans int) {
	isPrefix := func(w, s string) bool {
		i := 0
		j := 0
		for i < len(w) && j < len(s) && w[i] == s[j] {
			i++
			j++
		}
		return i == len(w)
	}
	for _, w := range words {
		if isPrefix(w, s) {
			ans++
		}
	}
	return
}
func countPrefixes(words []string, s string) (ans int) {
	for _, w := range words {
		if strings.HasPrefix(s, w) {
			ans++
		}
	}
	return
}

// 2711
func abs1(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func differenceOfDistinctValues1(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	set := map[int]struct{}{}
	for i, rows := range grid {
		ans[i] = make([]int, n)
		for j := range rows {
			// 左上角个数
			clear(set)
			ii := i - 1
			jj := j - 1
			for ii >= 0 && jj >= 0 {
				set[grid[ii][jj]] = struct{}{}
				ii -= 1
				jj -= 1
			}
			sz := len(set)
			clear(set)
			ii = i + 1
			jj = j + 1
			for ii < m && jj < n {
				set[grid[ii][jj]] = struct{}{}
				ii += 1
				jj += 1
			}
			ans[i][j] = abs(sz - len(set))
		}
	}
	return ans
}
func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func differenceOfDistinctValues2(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	for i := 0; i < m; i++ {
		ans[i] = make([]int, n)
	}
	set := map[int]struct{}{}
	// 令 k=i-j+n，那么右上角 k=1，左下角 k=m+n-1
	for k := 1; k < m+n; k++ {
		minJ := max(0, n-k)
		maxJ := min(n-1, m-1-k+n)
		clear(set)
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			ans[i][j] = len(set)
			set[grid[i][j]] = struct{}{}
		}
		clear(set)
		for j := maxJ; j >= minJ; j-- {
			i := k + j - n
			ans[i][j] = abs(ans[i][j] - len(set))
			set[grid[i][j]] = struct{}{}
		}
	}
	return ans
}
func differenceOfDistinctValues(grid [][]int) [][]int {
	m, n := len(grid), len(grid[0])
	ans := make([][]int, m)
	for i := 0; i < m; i++ {
		ans[i] = make([]int, n)
	}

	// 令 k=i-j+n，那么右上角 k=1，左下角 k=m+n-1
	for k := 1; k < m+n; k++ {
		minJ := max(0, n-k)
		maxJ := min(n-1, m-1-k+n)
		set := uint(0)
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			ans[i][j] = bits.OnesCount(set)
			set |= 1 << grid[i][j]
		}
		set = uint(0)
		for j := maxJ; j >= minJ; j-- {
			i := k + j - n
			ans[i][j] = abs(ans[i][j] - bits.OnesCount(set))
			set |= 1 << grid[i][j]
		}
	}
	return ans
}

// 1329
func diagonalSort(mat [][]int) [][]int {
	m, n := len(mat), len(mat[0])
	// 令 k=i-j+n，那么右上角 k=1，左下角 k=m+n-1
	for k := 1; k < m+n; k++ {
		minJ := max(0, n-k)
		maxJ := min(n-1, m-1-k+n)
		a := []int{}
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			a = append(a, mat[i][j])
		}
		slices.Sort(a)
		index := 0
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			mat[i][j] = a[index]
			index++
		}
	}
	return mat
}
func sortMatrix(mat [][]int) [][]int {
	m, n := len(mat), len(mat[0])
	// 令 k=i-j+n，那么右上角 k=1，左下角 k=m+n-1
	for k := 1; k < m+n; k++ {
		minJ := max(0, n-k)
		maxJ := min(n-1, m-1-k+n)
		a := []int{}
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			a = append(a, mat[i][j])
		}
		if minJ > 0 {
			slices.Sort(a)
		} else {
			// slices.SortFunc()
		}
		index := 0
		for j := minJ; j <= maxJ; j++ {
			i := k + j - n
			mat[i][j] = a[index]
			index++
		}
	}
	return mat
}

// 2829
func minimumSum(n int, k int) int {
	m := min(k/2, n)
	return m*(1+m)/2 + (k+k+n-m-1)*(n-m)/2
}
func minimumCost(s string) (ans int64) {
	n := len(s)
	for i := 1; i < n; i++ {
		if s[i] != s[i-1] {
			ans += int64(min(i, n-i))
		}
	}
	return ans
}
