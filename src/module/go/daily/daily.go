package daily

import (
	"fmt"
	"math"
	"math/bits"
	"slices"
	"sort"
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
func longestCycle(edges []int) int {
	ans := -1
	curTime := 1
	visTime := make([]int, len(edges))
	for x := range edges {
		startTime := curTime
		for x != -1 && visTime[x] == 0 {
			visTime[x] = curTime
			curTime++
			x = edges[x]
		}
		if x != -1 && visTime[x] >= startTime {
			ans = max(ans, curTime-visTime[x])
		}
	}
	return ans
}
func addSpaces(s string, spaces []int) string {
	ans := []byte{}
	j := 0
	for i, ch := range s {
		if j < len(spaces) && i == spaces[j] {
			ans = append(ans, ' ')
			j++
		}
		ans = append(ans, byte(ch))
	}
	return string(ans)
}
func percentageLetter(s string, letter byte) int {
	n := len(s)
	cnt := 0
	for _, ch := range s {
		if ch == rune(letter) {
			cnt++
		}
	}
	return cnt * 100 / n
}
func mostPoints(questions [][]int) int64 {
	n := len(questions)
	memo := make([]int64, n)
	var dfs func(int) int64
	dfs = func(i int) int64 {
		if i >= n {
			return 0
		}
		remb := &memo[i]
		if *remb == 0 {
			q := questions[i]
			*remb = max(dfs(i+1), dfs(i+q[1]+1)+int64(q[0]))
		}
		return *remb
	}
	return dfs(0)
}
func maximumTripletValue(nums []int) (ans int64) {
	maxI := 0
	maxDiff := 0
	for _, v := range nums {
		curVal := int64(maxDiff * v)
		if curVal > ans {
			ans = curVal
		}
		maxDiff = max(maxDiff, maxI-v)
		maxI = max(maxI, v)
	}
	return ans
}

func minRectanglesToCoverPoints(points [][]int, w int) (ans int) {
	prevX := -1
	// 按照x轴从左到右
	slices.SortFunc(points, func(p, q []int) int {
		return p[0] - q[0]
	})
	for _, item := range points {
		if item[0] > prevX {
			ans++
			prevX = item[0] + w
		}
	}
	return
}
func removeAlmostEqualCharacters(word string) (ans int) {
	n := len(word)
	for i := 1; i < n; i++ {
		if abs(int(word[i])-int(word[i-1])) <= 1 {
			ans++
			i++
		}
	}
	return
}

func minOperations22(nums []int) (k int) {
	for _, x := range nums {
		if x == (k % 2) {
			k++
		}
	}
	return
}
func minFlips(target string) (k int) {
	for _, x := range target {
		// 如果x是0 而之前的操作次数是偶数  那必须要操作
		// 如果x是1 而之前的操作次数是奇数（奇数+奇数是偶数  变成了0） 还是要操作变成1
		if int(x) == k%2 {
			k++
		}
	}
	return
}

func maxOperations(s string) (ans int) {
	cnt1 := 0
	for i, ch := range s {
		if ch == '1' {
			cnt1++
		} else if i > 0 && s[i-1] == '1' {
			ans += cnt1
		}
	}
	return
}
func minimumBuckets(hamsters string) (ans int) {
	prevPos := -2
	n := len(hamsters)
	for i := 0; i < n; i++ {
		ch := hamsters[i]
		if ch == 'H' {
			if prevPos == i-1 {
				continue
			} else if i < n-1 && hamsters[i+1] == '.' {
				ans++
				prevPos = i
			} else if i > 0 && hamsters[i-1] == '.' {
				ans++
			} else {
				return -1
			}
		}
	}
	return
}
func findKthNumber(n, k int) int {
	// 逐层统计 node 子树大小
	countSubtreeSize := func(node int) (size int) {
		left, right := node, node+1
		for left <= n {
			// 这一层的最小值是 left，最大值是 min(right, n+1) - 1
			size += min(right, n+1) - left
			left *= 10 // 继续，计算下一层
			right *= 10
		}
		return
	}

	node := 1
	k-- // 访问节点 node
	for k > 0 {
		size := countSubtreeSize(node)
		if size <= k { // 向右，跳过 node 子树
			node++    // 访问 node 右侧兄弟节点
			k -= size // 访问子树中的每个节点，以及新的 node 节点
		} else { // 向下，深入 node 子树
			node *= 10 // 访问 node 的第一个儿子
			k--        // 访问新的 node 节点
		}
	}
	return node
}

func minSwaps1(grid [][]int) int {
	n := len(grid)
	zeros := make([]int, n)
	for i := range grid {
		j := n - 1
		for ; j >= 0 && grid[i][j] == 0; j-- {
		}
		zeros[i] = n - 1 - j
	}
	swaps := 0
	for i := 0; i < n; i++ {
		need := n - 1 - i
		j := i
		for ; j < n && zeros[j] < need; j++ {
		}
		if j == n {
			return -1
		}
		for k := j; k > i; k-- {
			grid[k], grid[k-1] = grid[k-1], grid[k]
		}
		swaps += j - 1
	}
	return swaps
}
func minSwaps(grid [][]int) (ans int) {
	n := len(grid)
	zeros := make([]int, n)
	for i := range n {
		j := n - 1
		for ; j >= 0 && grid[i][j] == 0; j-- {
		}
		zeros[i] = n - 1 - j
	}

	for i := range n {
		need := n - 1 - i
		j := i
		for ; j < n && zeros[j] < need; j++ {
		}
		if j == n {
			return -1
		}
		for k := j; k > i; k-- {
			zeros[k], zeros[k-1] = zeros[k-1], zeros[k]
		}
		ans += j - i
	}
	return
}
func minOperations2(n int) (ans int) {
	ans = 1
	for n&(n-1) > 0 {
		lb := n & (-n)
		if n&(lb<<1) > 0 {
			n += lb
		} else {
			n -= lb
		}
		ans++
	}
	return
}

const mx = 1_000_001

var lpf = make([]int, mx)

func init() {
	for i := 2; i < mx; i++ {
		if lpf[i] == 0 {
			for j := i; j < mx; j += i {
				if lpf[j] == 0 {
					lpf[j] = i
				}
			}
		}
	}
}
func minOperations(nums []int) (ans int) {
	n := len(nums)
	for i := n - 2; i >= 0; i-- {
		if nums[i] > nums[i+1] {
			nums[i] = lpf[nums[i]]
			if nums[i] > nums[i+1] {
				return -1
			}
			ans++
		}
	}
	return
}
func matrixScore(grid [][]int) (ans int) {
	// slices.SortedFunc()
	m, n := len(grid), len(grid[0])
	// 确保每一行第一列都是0
	for i := range m {
		if grid[i][0] == 0 {
			for j := 0; j < n; j++ {
				grid[i][j] ^= 1
			}
		}
	}
	for j := 0; j < n; j++ {
		ones := 0
		for i := 0; i < m; i++ {
			if grid[i][j] == 1 {
				ones++
			}
		}
		mx := max(ones, m-ones)
		ans += mx * (1 << (n - j - 1))
	}
	return
}
func maximumTotalSum111(maximumHeight []int) int64 {
	n := len(maximumHeight)
	set := map[int]bool{}
	ans := 0
	for i := n - 1; i >= 0; i-- {
		x := maximumHeight[i]
		for set[x] {
			x--
			if x <= 0 {
				return -1
			}
		}
		ans += x
		set[x] = true
	}
	return int64(ans)
}
func maximumTotalSum(nums []int) int64 {
	// 从大到小
	slices.SortFunc(nums, func(x, y int) int { return y - x })
	ans := nums[0]
	n := len(nums)
	for i := 1; i < n; i++ {
		x := min(nums[i], nums[i-1]-1)
		if x <= 0 {
			return -1
		}
		ans += x
		nums[i] = x
	}
	return int64(ans)
}
func minIncrementForUnique(nums []int) (ans int) {
	slices.Sort(nums)
	prev := nums[0]
	for _, x := range nums[1:] {
		v := max(x, prev+1)
		ans += v - x
		prev = v
	}
	return
}
func maximumElementAfterDecrementingAndRearranging(arr []int) int {
	slices.Sort(arr)
	// 初始化要为1
	ans := 1
	arr[0] = 1
	prev := 1
	n := len(arr)
	for i := 1; i < n; i++ {
		v := min(prev+1, arr[i])
		arr[i] = v
		ans = max(ans, v)
		prev = v
	}
	return ans
}
func minDeletions(s string) int {
	cnt := [26]int{}
	for _, ch := range s {
		cnt[ch-'a']++
	}
	slices.SortFunc(cnt[:], func(a, b int) int { return b - a })
	maxSave := cnt[0]
	for i := 1; i < len(cnt); i++ {
		if cnt[i] >= cnt[i-1] {
			cnt[i] = cnt[i-1] - 1
		}
		if cnt[i] <= 0 {
			break
		}
		maxSave += cnt[i]
	}
	return len(s) - maxSave
}
func maximumEvenSplit11(finalSum int64) (ans []int64) {
	if finalSum&1 == 0 {
		for i := int64(2); i <= finalSum; i++ {
			ans = append(ans, i)
			finalSum -= i
		}
		ans[len(ans)-1] += finalSum
	}
	return
}
func minimizeSum(nums []int) int {
	slices.Sort(nums)
	n := len(nums)
	return max(nums[n-1]-nums[2], nums[n-2]-nums[1], nums[n-3]-nums[0])
}
func minDifference(nums []int) int {
	n := len(nums)
	if n < 4 {
		return 0
	}
	slices.Sort(nums)
	return min(nums[n-1]-nums[3], nums[n-2]-nums[2], nums[n-3]-nums[1], nums[n-4]-nums[0])
}

func maxDistinctElements(nums []int, k int) (ans int) {
	slices.Sort(nums)
	prev := math.MinInt
	for _, x := range nums {
		v := min(x+k, max(x-k, prev+1))
		if v > prev {
			ans++
		}
		prev = v
	}
	return
}
func maxWeight(pizzas []int) int64 {
	slices.SortFunc(pizzas, func(a, b int) int { return b - a })
	days := len(pizzas) / 4
	// 奇数天
	odd := (days + 1) / 2
	ans := 0
	for _, x := range pizzas[:odd] {
		ans += x
	}
	for i := 0; i < days/2; i++ {
		ans += pizzas[odd+(2*i)+1]
	}
	return int64(ans)
}

func maximumScore(cards []int, cnt int) int {
	n := len(cards)
	// 从大到小
	slices.SortFunc(cards, func(a, b int) int { return b - a })
	s := 0
	for _, x := range cards[:cnt] {
		s += x
	}
	if s%2 == 0 {
		return s
	}
	x := cards[cnt-1]
	s1 := s - x
	// 最小的奇数  从后面加一个最大的偶数进来
	// 最小的偶数  从后面加一个最大的奇数进来
	for i := cnt; i < n; i++ {
		if cards[i]&1 != x&1 {
			return s1 + cards[i]
		}
	}
	return 0
}
func rob1(nums []int) int {
	n := len(nums)
	memo := make([]int, n)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		if i < 0 {
			return 0
		}
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		res = max(dfs(i-1), dfs(i-2)+nums[i])
		return res
	}
	return dfs(n - 1)
}
func rob2(nums []int) int {
	n := len(nums)
	dp := make([]int, n+2)
	for i, x := range nums {
		dp[i+2] = max(dp[i+1], dp[i]+x)
	}
	return dp[n+1]
}
func rob(nums []int) int {
	f0, f1 := 0, 0
	for _, x := range nums {
		// newF := max(f1, f0+x)
		f0, f1 = f1, max(f1, f0+x)
	}
	return f1
}
func findTargetSumWays3(nums []int, target int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	target += sum
	if target < 0 || target%2 == 1 {
		return 0
	}
	n := len(nums)
	target /= 2
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, target+1)
	}
	dp[0][0] = 1
	for i, x := range nums {
		for c := range target + 1 {
			if c < x {
				dp[i+1][c] = dp[i][c]
			} else {
				dp[i+1][c] = dp[i][c] + dp[i][c-x]
			}
		}
	}
	return dp[n][target]
}

func findTargetSumWays22(nums []int, target int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	target += sum
	if target < 0 || target%2 == 1 {
		return 0
	}
	n := len(nums)
	target /= 2
	dp := make([][]int, 2)
	for i := range dp {
		dp[i] = make([]int, target+1)
	}
	dp[0][0] = 1
	for i, x := range nums {
		for c := range target + 1 {
			if c < x {
				dp[(i+1)%2][c] = dp[i%2][c]
			} else {
				dp[(i+1)%2][c] = dp[i%2][c] + dp[i%2][c-x]
			}
		}
	}
	return dp[n%2][target]
}

func findTargetSumWays(nums []int, target int) int {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	target += sum
	if target < 0 || target%2 == 1 {
		return 0
	}
	target /= 2
	dp := make([]int, target+1)
	dp[0] = 1
	for _, x := range nums {
		for c := target; c >= x; c-- {
			dp[c] = dp[c] + dp[c-x]
		}
	}
	return dp[target]
}
func findTargetSumWays2(nums []int, target int) int {
	// 添加正号的数为p 添加铅的数为s-p
	// p-(s-p)=target
	// 2p=target+s
	sum := 0
	for _, x := range nums {
		sum += x
	}
	target += sum
	if target < 0 || target%2 == 1 {
		return 0
	}
	n := len(nums)
	target /= 2
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, target+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, c int) (res int) {
		if i < 0 {
			if c == 0 {
				return 1
			} else {
				return 0
			}
		}
		p := &memo[i][c]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if c < nums[i] {
			res = dfs(i-1, c)
			return
		}
		res = dfs(i-1, c) + dfs(i-1, c-nums[i])
		return res
	}
	return dfs(n-1, target)
}
func coinChange2(coins []int, amount int) int {
	n := len(coins)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, amount+1)
	}
	for j := 1; j <= amount; j++ {
		dp[0][j] = math.MaxInt / 2
	}
	for i, x := range coins {
		for c := 1; c < amount+1; c++ {
			if c < x {
				dp[i+1][c] = dp[i][c]
			} else {
				dp[i+1][c] = min(dp[i][c], dp[i+1][c-x]+1)
			}
		}
	}
	ans := dp[n][amount]
	if ans < math.MaxInt/2 {
		return ans
	}
	return -1
}
func coinChange(coins []int, amount int) int {
	dp := make([]int, amount+1)
	for j := 1; j <= amount; j++ {
		dp[j] = math.MaxInt / 2
	}
	for _, x := range coins {
		for c := 1; c < amount+1; c++ {
			if c < x {
				dp[c] = dp[c]
			} else {
				dp[c] = min(dp[c], dp[c-x]+1)
			}
		}
	}
	ans := dp[amount]
	if ans < math.MaxInt/2 {
		return ans
	}
	return -1
}

func coinChange222(coins []int, amount int) int {
	n := len(coins)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, amount+1)
		for j := range memo[i] {
			memo[i][j] = -1 // -1 表示没有访问过
		}
	}
	var dfs func(int, int) int
	dfs = func(i, c int) (res int) {
		if i < 0 {
			if c == 0 {
				return 0
			}
			return math.MaxInt / 2 // 除 2 防止下面 + 1 溢出
		}
		p := &memo[i][c]
		if *p != -1 {
			return *p
		}
		defer func() { *p = res }()
		if c < coins[i] {
			return dfs(i-1, c)
		}
		return min(dfs(i-1, c), dfs(i, c-coins[i])+1)
	}
	ans := dfs(n-1, amount)
	if ans < math.MaxInt/2 {
		return ans
	}
	return -1
}

func longestCommonSubsequence1(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i < 0 || j < 0 {
			return 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if text1[i] == text2[j] {
			return dfs(i-1, j-1) + 1
		}
		return max(dfs(i-1, j), dfs(i, j-1))
	}
	return dfs(m-1, n-1)
}
func longestCommonSubsequence2(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for i, x := range text1 {
		for j, y := range text2 {
			if x == y {
				dp[i+1][j+1] = dp[i][j] + 1
			} else {
				dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
			}
		}
	}
	return dp[m][n]
}

func longestCommonSubsequenced2(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	dp := make([][]int, 2)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for i, x := range text1 {
		for j, y := range text2 {
			if x == y {
				dp[(i+1)%2][j+1] = dp[i%2][j] + 1
			} else {
				dp[(i+1)%2][j+1] = max(dp[i%2][j+1], dp[(i+1)%2][j])
			}
		}
	}
	return dp[m%2][n]
}
func longestCommonSubsequence(text1 string, text2 string) int {
	n := len(text2)
	dp := make([]int, n+1)
	for _, x := range text1 {
		pre := dp[0]
		for j, y := range text2 {
			if x == y {
				dp[j+1], pre = pre+1, dp[j+1]
			} else {
				pre = dp[j+1]
				dp[j+1] = max(dp[j+1], dp[j])
			}
		}
	}
	return dp[n]
}
func minDistance2(word1 string, word2 string) int {
	m, n := len(word1), len(word2)
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i < 0 {
			return j + 1
		}
		if j < 0 {
			return i + 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if word1[i] == word2[j] {
			return dfs(i-1, j-1)
		}
		// 删除  插入 替换
		return min(dfs(i-1, j), dfs(i, j-1), dfs(i-1, j-1)) + 1
	}
	return dfs(m-1, n-1)
}
func minDistance3(word1 string, word2 string) int {
	m, n := len(word1), len(word2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for j := 0; j < n; j++ {
		dp[0][j+1] = j + 1
	}
	for i, x := range word1 {
		dp[i+1][0] = i + 1
		for j, y := range word2 {
			if x == y {
				dp[i+1][j+1] = dp[i][j]
			} else {
				dp[i+1][j+1] = min(dp[i][j+1], dp[i+1][j], dp[i][j]) + 1
			}
		}
	}
	return dp[m][n]
}

func minDistance35(word1 string, word2 string) int {
	m, n := len(word1), len(word2)
	dp := make([][]int, 2)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for j := 0; j < n; j++ {
		dp[0][j+1] = j + 1
	}
	for i, x := range word1 {
		dp[(i+1)%2][0] = i + 1
		for j, y := range word2 {
			if x == y {
				dp[(i+1)%2][j+1] = dp[i%2][j]
			} else {
				dp[(i+1)%2][j+1] = min(dp[i%2][j+1], dp[(i+1)%2][j], dp[i%2][j]) + 1
			}
		}
	}
	return dp[m%2][n]
}
func minDistance(word1 string, word2 string) int {
	n := len(word2)
	dp := make([]int, n+1)
	for j := 0; j < n; j++ {
		dp[j+1] = j + 1
	}
	for _, x := range word1 {
		pre := dp[0]
		// dp[0] = i + 1
		dp[0]++
		for j, y := range word2 {
			if x == y {
				// dp[(i+1)%2][j+1] = dp[i%2][j]
				pre, dp[j+1] = dp[j], pre
			} else {
				dp[j+1], pre = min(dp[j+1], dp[j], pre)+1, dp[j+1]
				// dp[(i+1)%2][j+1] = min(dp[i%2][j+1], dp[(i+1)%2][j], dp[i%2][j]) + 1
			}
		}
	}
	return dp[n]
}

func lengthOfLIS1(nums []int) (ans int) {
	n := len(nums)
	memo := make([]int, n)
	for i := range memo {
		memo[i] = -1
	}
	var dfs func(int) int
	dfs = func(i int) (res int) {
		p := &memo[i]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		for j, x := range nums[:i] {
			if x < nums[i] {
				res = max(res, dfs(j))
			}
		}
		return res + 1
	}
	for i := range n {
		ans = max(ans, dfs(i))
	}
	return
}
func lengthOfLIS2(nums []int) (ans int) {
	n := len(nums)
	dp := make([]int, n)
	for i := range n {
		for j := range i {
			if nums[j] < nums[i] {
				dp[i] = max(dp[i], dp[j]+1)
			}
		}
		ans = max(ans, dp[i])
	}
	return
}
func lengthOfLIS(nums []int) int {
	g := []int{}
	for _, x := range nums {
		j := sort.SearchInts(g, x)
		if j == len(g) {
			g = append(g, x)
		} else {
			g[j] = x
		}
	}
	return len(g)
}

func maxProfit433442(prices []int) int {
	n := len(prices)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, 2)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, hold int) (res int) {
		if i < 0 {
			if hold == 0 {
				return 0
			}
			return math.MinInt / 2
		}
		p := &memo[i][hold]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if hold == 1 {
			return max(dfs(i-1, hold), dfs(i-1, hold^1)-prices[i])
		}
		return max(dfs(i-1, hold), dfs(i-2, hold^1)+prices[i])
	}
	return dfs(n-1, 0)
}

func maxProfit2(prices []int) int {
	n := len(prices)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, 2)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, hold int) (res int) {
		if i < 0 {
			if hold == 0 {
				return 0
			}
			return math.MinInt / 2
		}
		p := &memo[i][hold]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if hold == 1 {
			return max(dfs(i-1, hold), dfs(i-1, hold^1)-prices[i])
		}
		return max(dfs(i-1, hold), dfs(i-1, hold^1)+prices[i])
	}
	return dfs(n-1, 0)
}

func maxProfit1(prices []int) int {
	n := len(prices)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, 2)
	}
	dp[0][1] = math.MinInt / 2
	for i, v := range prices {
		dp[i+1][0] = max(dp[i][0], dp[i][1]+v)
		dp[i+1][1] = max(dp[i][1], dp[i][0]-v)
	}
	return dp[n][0]
}

func maxProfit4(prices []int) int {
	f0, f1 := 0, math.MinInt/2
	for _, v := range prices {
		newF := max(f0, f1+v)
		f1 = max(f1, f0-v)
		f0 = newF
	}
	return f0
}
func maxProfit34(prices []int) int {
	n := len(prices)
	dp := make([][]int, n+2)
	for i := range dp {
		dp[i] = make([]int, 2)
	}
	dp[1][1] = math.MinInt / 2
	for i, v := range prices {
		dp[i+2][0] = max(dp[i+1][0], dp[i][1]+v)
		dp[i+2][1] = max(dp[i+1][1], dp[i+1][0]-v)
	}
	return dp[n+1][0]
}
func maxProfit453(prices []int) int {
	pre0, f0, f1 := 0, 0, math.MinInt/2
	for _, v := range prices {
		pre0, f0, f1 = f0, max(f0, f1+v), max(f1, pre0-v)
	}
	return f0
}

func maxProfit3454(k int, prices []int) int {
	n := len(prices)
	memo := make([][][]int, n)
	for i := range memo {
		memo[i] = make([][]int, k+1)
		for j := range memo[i] {
			memo[i][j] = make([]int, 2)
			for k := range memo[i][j] {
				memo[i][j][k] = -1
			}
		}
	}
	var dfs func(int, int, int) int
	dfs = func(i, j, hold int) (res int) {
		if j < 0 {
			return math.MinInt / 2
		}
		if i < 0 {
			if hold == 0 {
				return 0
			}
			return math.MinInt / 2
		}
		p := &memo[i][j][hold]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if hold == 1 {
			return max(dfs(i-1, j, hold), dfs(i-1, j-1, hold^1)-prices[i])
		}
		return max(dfs(i-1, j, hold), dfs(i-1, j, hold^1)+prices[i])
	}
	return dfs(n-1, k, 0)
}

func maxProfit4543(k int, prices []int) int {
	n := len(prices)
	f := make([][][2]int, n+1)
	for i := range f {
		f[i] = make([][2]int, k+2)
		for j := range f[i] {
			f[i][j] = [2]int{math.MinInt / 2, math.MinInt / 2} // 防止溢出
		}
	}
	for j := 1; j <= k+1; j++ {
		f[0][j][0] = 0
	}
	for i, p := range prices {
		for j := 1; j <= k+1; j++ {
			f[i+1][j][0] = max(f[i][j][0], f[i][j][1]+p)
			f[i+1][j][1] = max(f[i][j][1], f[i][j-1][0]-p)
		}
	}
	return f[n][k+1][0]
}

func numberOfSets(n, maxDistance int, roads [][]int) (ans int) {
	g := make([][]int, n)
	for i := range g {
		g[i] = make([]int, n)
		for j := range g[i] {
			g[i][j] = math.MaxInt / 2 // 防止加法溢出
		}
	}
	for _, e := range roads {
		x, y, wt := e[0], e[1], e[2]
		g[x][y] = min(g[x][y], wt)
		g[y][x] = min(g[y][x], wt)
	}

	f := make([][]int, n)
	for i := range f {
		f[i] = make([]int, n)
	}
next:
	for s := 1; s < 1<<n; s++ { // 枚举子集
		for i, row := range g {
			if s>>i&1 == 0 {
				continue
			}
			copy(f[i], row)
		}

		// Floyd 算法（只考虑在 s 中的节点）
		for k := range f {
			if s>>k&1 == 0 {
				continue
			}
			for i := range f {
				if s>>i&1 == 0 {
					continue
				}
				for j := range f {
					f[i][j] = min(f[i][j], f[i][k]+f[k][j])
				}
			}
		}

		// 判断保留的节点之间的最短路是否均不超过 maxDistance
		for i, di := range f {
			if s>>i&1 == 0 {
				continue
			}
			for j, dij := range di[:i] {
				if s>>j&1 > 0 && dij > maxDistance {
					continue next
				}
			}
		}
		ans++
	}
	return
}
func maxProfit(k int, prices []int) int {
	dp := make([][]int, k+2)
	for j := range dp {
		dp[j] = make([]int, 2)
		for k := range dp[j] {
			dp[j][k] = math.MinInt / 2
		}
	}

	// 这个初始条件确实是记忆化搜索出来的
	for j := 1; j <= k+1; j++ {
		dp[j][0] = 0
	}
	for _, x := range prices {
		for j := k + 1; j >= 1; j-- {
			dp[j][0] = max(dp[j][0], dp[j][1]+x)
			dp[j][1] = max(dp[j][1], dp[j-1][0]-x)
		}
	}
	return dp[k+1][0]
}
func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}
func maxAdjacentDistance(nums []int) int {
	n := len(nums)
	ans := abs(nums[n-1] - nums[0])
	for i := 1; i < n; i++ {
		ans = max(ans, abs(nums[i]-nums[i-1]))
	}
	return ans
}

func longestPalindromeSubseq2(s string) int {
	n := len(s)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i > j {
			return 0
		}
		if i == j {
			return 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if s[i] == s[j] {
			return dfs(i+1, j-1) + 2
		}
		return max(dfs(i+1, j), dfs(i, j-1))
	}
	return dfs(0, n-1)
}
func longestPalindromeSubseq(s string) int {
	n := len(s)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for i := n - 1; i >= 0; i-- {
		dp[i][i] = 1
		x := s[i]
		for j := i + 1; j < n; j++ {
			if (x) == s[j] {
				dp[i][j] = dp[i+1][j-1] + 2
			} else {
				dp[i][j] = max(dp[i+1][j], dp[i][j-1])
			}
		}
	}
	return dp[0][n-1]
}
func minScoreTriangulation2(values []int) int {
	n := len(values)
	memo := make([][]int, n)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}
	var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i+1 == j {
			return 0
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		res = math.MaxInt
		for k := i + 1; k < j; k++ {
			res = min(res, dfs(i, k)+dfs(k, j)+values[i]*values[j]*values[k])
		}
		return res
	}
	return dfs(0, n-1)
}
func minScoreTriangulation(values []int) int {
	n := len(values)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for i := n - 3; i >= 0; i-- {
		for j := i + 2; j < n; j++ {
			dp[i][j] = math.MaxInt
			for k := i + 1; k < j; k++ {
				dp[i][j] = min(dp[i][j], dp[i][k]+dp[k][j]+values[i]*values[j]*values[k])
			}
		}
	}
	return dp[0][n-1]
}
func longestPalindromeSubseq343(s string) int {
	n := len(s)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
		for j := range dp[i] {
			if j == i {
				dp[i][j] = 1
			}
		}
	}
	for i := n - 1; i >= 0; i-- {
		x := s[i]
		for j := i + 1; j < n; j++ {
			if (x) == s[j] {
				dp[i+1][j+1] = dp[i+1][j] + 2
			} else {
				dp[i+1][j+1] = max(dp[i+1][j+1], dp[i+1][j])
			}
		}
	}
	return dp[1][n]
	/* var dfs func(int, int) int
	dfs = func(i, j int) (res int) {
		if i > j {
			return 0
		}
		if i == j {
			return 1
		}
		p := &memo[i][j]
		if *p != -1 {
			return *p
		}
		defer func() {
			*p = res
		}()
		if s[i] == s[j] {
			return dfs(i+1, j-1) + 2
		}
		return max(dfs(i+1, j), dfs(i, j-1))
	}
	return dfs(0, n-1) */
}

func longestPath(parent []int, s string) (ans int) {
	n := len(parent)
	g := make([][]int, n)
	for i := 1; i < n; i++ {
		pa := parent[i]
		// 从父节点到子节点的方向
		g[pa] = append(g[pa], i)
	}
	var dfs func(int) int
	// 当前x的最长链长
	dfs = func(x int) (maxLength int) {
		// maxLen 表示遍历过的父、子间的最长路径
		// len 表示当前这一条路径长度，遍历一遍后，可以覆盖所有情况；最终找到父到最长的两个子的路径长度和
		for _, y := range g[x] {
			len := dfs(y) + 1
			if s[y] != s[x] {
				ans = max(ans, len+maxLength)
				maxLength = max(maxLength, len)
			}
		}
		return
	}
	dfs(0)
	// 链长加自身
	return ans + 1
}

func letterCombinations(digits string) (ans []string) {
	n := len(digits)
	/* if n == 0 {
	   return
	 } */
	mapping := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
	path := make([]byte, n)
	var dfs func(int)
	dfs = func(i int) {
		if i >= n {
			ans = append(ans, string(path))
			return
		}
		for _, ch := range mapping[int(digits[i]-'0')] {
			path[i] = byte(ch)
			dfs(i + 1)
		}
	}
	dfs(0)
	return
}
func subsetXORSum22(nums []int) (ans int) {
	xorSum := 0
	n := len(nums)
	var dfs func(int)
	dfs = func(i int) {
		if i >= n {
			ans += xorSum
			return
		}
		dfs(i + 1)
		xorSum ^= nums[i]
		dfs(i + 1)
		xorSum ^= nums[i]
	}
	dfs(0)
	return
}
func subsetXORSum2(nums []int) (ans int) {
	xorSum := 0
	n := len(nums)
	var dfs func(int)
	dfs = func(i int) {
		ans += xorSum
		for j := i; j < n; j++ {
			xorSum ^= nums[j]
			dfs(j + 1)
			xorSum ^= nums[j]
		}
	}
	dfs(0)
	return
}
func subsetXORSum12(nums []int) (ans int) {
	xorSum := 0
	n := len(nums)
	var dfs func(int)
	dfs = func(i int) {
		if i >= n {
			ans += xorSum
			return
		}
		dfs(i + 1)
		xorSum ^= nums[i]
		dfs(i + 1)
		xorSum ^= nums[i]
	}
	dfs(0)
	return
}

func subsetXORSum(nums []int) (ans int) {
	n := len(nums)
	for mask := 1; mask < 1<<n; mask++ {
		xor := 0
		for j, x := range nums {
			if mask>>j&1 == 1 {
				xor ^= x
			}
		}
		ans += xor
	}
	return
}

