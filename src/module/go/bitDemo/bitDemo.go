package bitdemo

import (
	"cmp"
	"sort"
	"strconv"

	// "container/ring"
	"fmt"
	// "go/types"
	"math"
	"math/big"
	"math/bits"
	"slices"
	"strings"
	// "github.com/go-delve/delve/service/debugger"
)

// 2680
func maximumOr111(nums []int, k int) (ans int64) {
	n := len(nums)
	// suf[i] 表示 nums[i+1] 到 nums[n-1] 的 OR
	suffix := make([]int, n)
	for i := n - 2; i >= 0; i-- {
		suffix[i] |= suffix[i+1] | nums[i+1]
	}
	prefix := 0
	for i, x := range nums {
		cur := x >> k
		curSum := int64(prefix | cur | suffix[i])
		if curSum > ans {
			ans = int64(curSum)
		}
		prefix |= x
	}
	return
}

func smallestNumber(n int) int {
	return 1<<bits.Len(uint(n)) - 1
}
func minChanges(n int, k int) int {
	if n&k != k {
		return -1
	}
	return bits.OnesCount(uint(n ^ k))
}
func sortByBits(arr []int) []int {
	slices.SortFunc(arr, func(x, y int) int {
		xCnt := bits.OnesCount(uint(x))
		yCnt := bits.OnesCount(uint(y))
		return cmp.Or(cmp.Compare(xCnt, yCnt), cmp.Compare(x, y))
	})
	return arr
}
func hammingDistance(x int, y int) int {
	return bits.OnesCount(uint(x ^ y))
}
func minBitFlips(x int, y int) int {
	return bits.OnesCount(uint(x ^ y))
}
func numberOfSteps(num int) int {
	l := bits.Len(uint(num))
	k := bits.OnesCount(uint(num))
	return max(0, l-1+k)
}
func findComplement1(num int) (ans int) {
	shift := 1
	for num>>shift > 0 {
		if num>>shift&1 == 0 {
			ans |= 1 << shift
		}
		shift++
	}
	return
}
func findComplement(num int) int {
	highLead := 64 - bits.LeadingZeros64(uint64(num))
	mask := 1<<highLead - 1
	return num ^ mask
}
func bitwiseComplement(n int) int {
	if n == 0 {
		return 1
	}
	highLead := 64 - bits.LeadingZeros64(uint64(n))
	mask := 1<<highLead - 1
	return n ^ mask
}
func binaryGap(n int) (ans int) {
	shift := 0
	lastBit := -1
	for n>>shift > 0 {
		if n>>shift&1 == 1 {
			if lastBit >= 0 {
				ans = max(ans, shift-lastBit)
			}
			lastBit = shift
		}
		shift++
	}
	return
}

// validStrings 函数用于生成满足一定条件的二进制字符串切片
// 参数 n 表示二进制字符串的长度
// 返回值 res 是满足条件的二进制字符串切片
func validStrings(n int) (res []string) {
	// 生成一个掩码，用于限定二进制数的范围，例如 n=3 时，掩码为 7（二进制 111）
	mask := 1<<n - 1
	// 遍历从 0 到 2^n - 1 的所有整数，这些整数可以表示为 n 位的二进制数
	for i := 0; i < 1<<n; i++ {
		// 这里条件有误，推测原本意图是判断是否有相邻的1
		// 正确的判断相邻1的逻辑应该更复杂，此处假设是简单判断相邻1的情况（实际代码逻辑可能需要调整）
		// 目前代码 i>>1&i == 0 这个条件逻辑可能不准确，若要判断相邻1，一般需要更复杂位运算逻辑
		if i>>1&i == 0 {
			// 将符合条件的整数转换为 n 位宽度的二进制字符串，并追加到结果切片 res 中
			res = append(res, fmt.Sprintf("%0*b", n, i^mask))
		}
	}
	return
}

func findKOr(nums []int, k int) (ans int) {
	for i := 0; i < 32; i++ {
		cnt := 0
		for _, x := range nums {
			if x>>i&1 == 1 {
				cnt++
			}
		}
		if cnt >= k {
			ans |= 1 << i
		}
	}
	return
}
func hasAlternatingBits(n int) bool {
	a := n ^ (n >> 1)
	return a&(a+1) == 0
}
func findThePrefixCommonArray(A []int, B []int) []int {
	var prefixA, prefixB int64
	n := len(A)
	ans := make([]int, n)
	for i, x := range A {
		y := B[i]
		prefixA |= 1 << x
		prefixB |= 1 << y
		ans[i] = bits.OnesCount(uint(prefixA & prefixB))
	}
	return ans
}
func isPowerOfTwo1(n int) bool {
	return n > 0 && n&(n-1) == 0
}
func isPowerOfTwo(n int) bool {
	return n > 0 && n&(-n) == n
}
func isPowerOfFour(n int) bool {
	return n > 0 && n&(-n) == n && n%3 == 1
}
func hammingWeight(n int) int {
	return bits.OnesCount(uint(n))
}
func evenOddBit(n int) []int {
	ans := []int{0, 0}
	shift := 0
	for n>>shift > 0 {
		if n>>shift&1 == 1 {
			ans[shift&1]++
		}
		shift++
	}
	return ans
}
func countBits(n int) []int {
	ans := make([]int, n+1)
	for i := 1; i <= n; i++ {
		ans[i] = ans[i>>1] + i&1
	}
	return ans
}
func xorOperation(n int, start int) (ans int) {
	for i := 0; i < n; i++ {
		cur := start + 2*i
		ans ^= cur
	}
	return
}
func decode1(encoded []int, first int) []int {
	n := len(encoded)
	ans := make([]int, n+1)
	ans[0] = first
	for i, x := range encoded {
		ans[i+1] = ans[i] ^ x
	}
	return ans
}
func findArray(pref []int) []int {
	n := len(pref)
	ans := make([]int, n)
	ans[0] = pref[0]
	for i := 1; i < n; i++ {
		x := pref[i]
		ans[i] ^= pref[i-1] ^ x
	}
	return ans
}
func xorQueries(arr []int, queries [][]int) []int {
	n := len(arr)
	prefix := make([]int, n+1)
	for i, x := range arr {
		prefix[i+1] = prefix[i] ^ x
	}
	m := len(queries)
	ans := make([]int, m)
	for i, q := range queries {
		l, r := q[0], q[1]
		ans[i] = prefix[r+1] ^ prefix[l]
	}
	return ans
}

func doesValidArrayExist(derived []int) bool {
	xor := 0
	for _, x := range derived {
		xor ^= x
	}
	return xor == 0
}
func getMaximumXor23(nums []int, maximumBit int) []int {
	n := len(nums)
	ans := make([]int, n)
	xor := 0
	for i, x := range nums {
		xor ^= x
		k := 0
		for j := 0; j < maximumBit; j++ {
			if xor&(1<<j) == 0 {
				k |= 1 << j
			}
		}
		ans[n-1-i] = k
	}
	return ans
}
func minOperations1(nums []int, k int) int {
	xor := 0
	for _, x := range nums {
		xor ^= x
	}
	return bits.OnesCount(uint(xor ^ k))
}

// countTriplets 函数用于计算满足条件的三元组数量
func countTriplets111(arr []int) int {
	n := len(arr)
	// 初始化结果变量
	ans := 0
	// 枚举 i 的所有可能取值
	for i := range arr {
		// 初始化异或和变量
		xorSum := 0
		// 枚举 k 的所有可能取值，从 i 开始
		for k := i; k < n; k++ {
			// 计算从 i 到 k 的异或和
			xorSum ^= arr[k]
			// 如果异或和为 0，说明存在满足条件的三元组
			if xorSum == 0 {
				// 计算满足条件的 j 的数量，即 k - i
				ans += k - i
			}
		}
	}
	return ans
}
func minimizeXor(num1 int, num2 int) int {
	c1, c2 := bits.OnesCount(uint(num1)), bits.OnesCount(uint(num2))
	for c2 > c1 {
		num1 |= num1 + 1
		c2--
	}
	for c1 > c2 {
		num1 &= num1 - 1
		c1--
	}
	return num1
}
func beautifulSubarrays1(nums []int) (ans int64) {
	n := len(nums)
	xorPrefix := make([]int, n+1)
	cnt := map[int]int64{0: 1}
	for i, x := range nums {
		xorPrefix[i+1] = xorPrefix[i] ^ x
		ans += cnt[xorPrefix[i+1]]
		cnt[xorPrefix[i+1]]++
	}
	return ans
}
func beautifulSubarrays(nums []int) (ans int64) {
	xorPrefix := 0
	cnt := map[int]int64{0: 1}
	for _, x := range nums {
		xorPrefix = xorPrefix ^ x
		ans += cnt[xorPrefix]
		cnt[xorPrefix]++
	}
	return ans
}
func substringXorQueries(s string, queries [][]int) [][]int {
	n := len(s)
	type pair struct{ l, r int }
	m := map[int]pair{}
	if i := strings.IndexByte(s, '0'); i >= 0 {
		m[0] = pair{i, i}
	}
	for l, c := range s {
		if c == '0' {
			continue
		}
		for r, x := l, 0; r < l+30 && r < n; r++ {
			x = x<<1 + int(s[r]-'0')
			if _, ok := m[x]; !ok {
				m[x] = pair{l, r}
			}
		}
	}
	ans := make([][]int, len(queries))
	for i := range queries {
		left, right := queries[i][0], queries[i][1]
		if v, ok := m[left^right]; ok {
			ans[i] = []int{v.l, v.r}
		} else {
			ans[i] = []int{-1, -1}
		}
	}
	return ans
}
func decode(encoded []int) []int {
	xor := 0
	n := len(encoded)
	for i := 1; i <= n+1; i++ {
		xor ^= i
	}
	/* for _, x := range encoded {
		xor ^= x
	} */
	for i := 1; i < len(encoded); i += 2 {
		xor ^= encoded[i]
	}
	ans := make([]int, n+1)
	ans[0] = xor
	for i, x := range encoded {
		ans[i+1] = ans[i] ^ x
	}
	return ans
}
func countPairs1(coordinates [][]int, k int) (ans int) {
	type pair struct{ x, y int }
	cnt := map[pair]int{}
	for _, p := range coordinates {
		x, y := p[0], p[1]
		for i := 0; i <= k; i++ {
			ans += cnt[pair{x ^ i, y ^ (k - i)}]
		}
		cnt[pair{x, y}]++
	}
	return
}
func longestSubarray1(nums []int) (ans int) {
	mx := slices.Max(nums)
	cnt := 0
	for _, x := range nums {
		if x == mx {
			cnt++
			ans = max(ans, cnt)
		} else {
			cnt = 0
		}
	}
	return
}
func longestSubarray(nums []int) (ans int) {
	mx, cnt := 0, 0
	for _, x := range nums {
		if x > mx {
			mx = x
			cnt = 1
			ans = cnt
		} else if x == mx {
			cnt++
			ans = max(cnt, ans)
		} else {
			cnt = 0
		}
	}
	return
}
func maxSubarrays(nums []int) (ans int) {
	and := -1
	n := len(nums)
	for i, x := range nums {
		and &= x
		if and == 0 || i == n-1 {
			ans++
			and = -1
		}
	}
	return
}
func longestNiceSubarray(nums []int) (ans int) {
	n := len(nums)
	or := 0
	for left, right := 0, 0; right < n; right++ {
		for or&nums[right] != 0 {
			or ^= nums[left]
			left++
		}
		or |= nums[right]
		ans = max(ans, right-left+1)
	}
	return
}

func maximumOr(nums []int, k int) (ans int64) {
	n := len(nums)
	suffix := make([]int, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1] | nums[i]
	}
	prefix := 0
	for i, x := range nums {
		curSum := int64(prefix | suffix[i+1] | x<<k)
		if curSum > ans {
			ans = curSum
		}
		prefix |= x
	}
	return
}

func minEnd111(n int, x int) int64 {
	n--
	// 把n的位放到x的0的空位置上
	i, j := 0, 0
	for n>>j > 0 {
		if x>>i&1 == 0 {
			x |= n >> j & 1 << i
			j++
		}
		i++
	}
	return int64(x)
}
func minEnd1(n int, x int) int64 {
	n--
	j := 0
	for t, lb := ^x, 0; n>>j > 0; t ^= lb {
		lb = t & -t
		x |= n >> j & 1 * lb
		j++
	}
	return int64(x)
}
func minimumCost(n int, edges [][]int, query [][]int) []int {
	type pair struct{ y, w int }
	g := make([][]pair, n)
	for _, e := range edges {
		x, y, w := e[0], e[1], e[2]
		g[x] = append(g[x], pair{y, w})
		g[y] = append(g[y], pair{x, w})
	}
	ids := make([]int, n)
	for i := range ids {
		ids[i] = -1
	}
	ccAnd := []int{}
	var dfs func(int) int
	dfs = func(x int) int {
		and := -1
		ids[x] = len(ccAnd)
		for _, obj := range g[x] {
			y, w := obj.y, obj.w
			and &= w
			if ids[y] < 0 {
				and &= dfs(y)
			}
		}
		return and
	}
	for i, v := range ids {
		if v < 0 {
			ccAnd = append(ccAnd, dfs(i))
		}
	}
	m := len(query)
	ans := make([]int, m)
	for i, q := range query {
		s, e := q[0], q[1]
		if ids[e] == ids[s] {
			ans[i] = ccAnd[ids[s]]
		} else {
			ans[i] = -1
		}
	}
	return ans
}

func minimumValueSum(nums []int, andValues []int) (ans int) {
	const Inf = math.MaxInt / 2
	n, m := len(nums), len(andValues)
	// i索引位 j表示已经划分了多少段 and当前这一段的and值
	type pair struct{ i, j, and int }
	memo := map[pair]int{}
	var dfs func(int, int, int) int
	dfs = func(i, j, and int) (res int) {
		if n-i < m-j {
			return Inf
		}
		if j == m {
			if i == n {
				return 0
			}
			return Inf
		}
		key := pair{i, j, and}
		if v, ok := memo[key]; ok {
			return v
		}
		defer func() {
			memo[key] = res
		}()
		and &= nums[i]
		res = dfs(i+1, j, and)
		if and == andValues[j] {
			res = min(res, dfs(i+1, j+1, -1)+nums[i])
		}
		return
	}
	ans = dfs(0, 0, -1)
	if ans == Inf {
		return -1
	}
	return ans
}
func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

/* const mx = 101

var div [mx][]int

func init() {
	for i := 1; i < mx; i++ {
		for j := i; j < mx; j += i {
			// 比方说j=10 它对应的数组存放的是[1,2,5,10] 也就是它所有的因子
			div[j] = append(div[j], i)
		}
	}
}
func countPairs(nums []int, k int) (ans int) {
	type pair struct{ v, d int }
	cnt := map[pair]int{}
	for j, x := range nums { // 枚举 j，计算左边有多少个符合要求的 i
		if j > 0 && x == nums[0] {
			ans++ // 单独统计 i=0 的情况
		}
		k2 := k / gcd(k, j)
		ans += cnt[pair{x, k2}]    // 统计左边有多少个数，值为 x 且下标是 k2 的倍数
		for _, d := range div[j] { // j 是 d 的倍数
			cnt[pair{x, d}]++
		}
	}
	return
} */

/*
	func countPairs(nums []int, k int) int64 {

}
*/
const mx = 101

var div [mx][]int

func init() {
	for i := 1; i < mx; i++ {
		for j := i; j < mx; j += i {
			div[j] = append(div[j], i)
		}
	}
}

func countPairs(nums []int, k int) (ans int) {
	type pair struct{ v, d int }
	cnt := map[pair]int{}
	for j, x := range nums {
		if j > 0 && x == nums[0] {
			ans++
		}
		k2 := k / gcd(k, j)
		ans += cnt[pair{x, k2}]
		for _, d := range div[j] {
			cnt[pair{x, d}]++
		}
	}
	return ans
}
func minimumSubarrayLength(nums []int, k int) (ans int) {
	ans = math.MaxInt
	n := len(nums)
	for right := 0; right < n; right++ {
		if nums[right] >= k {
			return 1
		}
		for left := right - 1; left >= 0 && nums[left] != nums[left]|nums[right]; left-- {
			nums[left] |= nums[right]
			if nums[left] >= k {
				ans = min(ans, right-left+1)
			}
		}
	}
	if ans == math.MaxInt {
		return -1
	}
	return ans
}
func smallestSubarrays(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	for right := 0; right < n; right++ {
		ans[right] = 1
		for left := right - 1; left >= 0 && nums[left] != nums[left]|nums[right]; left-- {
			nums[left] |= nums[right]
			ans[left] = right - left + 1
		}
	}
	return ans
}
func countSubarrays1(nums []int, k int) (ans int64) {
	n := len(nums)
	for right := 0; right < n; right++ {
		for left := right - 1; left >= 0 && nums[left] != nums[left]&nums[right]; left-- {
			nums[left] &= nums[right]
		}
		a := nums[:right+1]
		ans += int64(sort.SearchInts(a, k+1)) - int64(sort.SearchInts(a, k))
	}
	return ans
}
func countSubarrays4(nums []int, k int) (ans int64) {
	n := len(nums)
	leftPoint, rightPoint := 0, 0
	for right := 0; right < n; right++ {
		for left := right - 1; left >= 0 && nums[left] != nums[left]&nums[right]; left-- {
			nums[left] &= nums[right]
		}
		for leftPoint < right && nums[leftPoint] < k {
			leftPoint++
		}
		for rightPoint < right && nums[rightPoint] <= k {
			rightPoint++
		}
		ans += int64(rightPoint - leftPoint)
	}
	return ans
}

func minimumDifference(nums []int, k int) int {
	minDiff := math.MaxInt
	n := len(nums)
	for right := 0; right < n; right++ {
		if abs(nums[right]-k) < minDiff {
			minDiff = abs(nums[right] - k)
		}
		for left := right - 1; left >= 0 && nums[left] != nums[left]|nums[right]; left-- {
			nums[left] |= nums[right]
			if abs(nums[left]-k) < minDiff {
				minDiff = abs(nums[left] - k)
			}
		}
	}
	return minDiff
}
func closestToTarget(nums []int, k int) int {
	minDiff := math.MaxInt
	n := len(nums)
	for right := 0; right < n; right++ {
		if abs(nums[right]-k) < minDiff {
			minDiff = abs(nums[right] - k)
		}
		for left := right - 1; left >= 0 && nums[left] != nums[left]&nums[right]; left-- {
			nums[left] &= nums[right]
			if abs(nums[left]-k) < minDiff {
				minDiff = abs(nums[left] - k)
			}
		}
	}
	return minDiff
}
func subarrayBitwiseORs(nums []int) int {
	n := len(nums)
	set := map[int]struct{}{}
	for right := 0; right < n; right++ {
		set[nums[right]] = struct{}{}
		for left := right - 1; left >= 0 && nums[left] != nums[left]|nums[right]; left-- {
			nums[left] |= nums[right]
			set[nums[left]] = struct{}{}
		}
	}
	return len(set)
}
func minOperations111(n int) (ans int) {
	ans = 1
	for n&(n-1) > 0 {
		lb := n & -n
		if n&(lb<<1) > 0 {
			n += lb
		} else {
			n -= lb
		}
		ans++
	}
	return
}
func minBitwiseArray(nums []int) []int {
	for i, x := range nums {
		if x&1 == 1 {
			t := ^x
			lb := t & -t
			nums[i] ^= lb >> 1
		} else {
			nums[i] = -1
		}
	}
	return nums
}
func minImpossibleOR111(nums []int) int {
	set := map[int]bool{}
	for _, x := range nums {
		set[x] = true
	}
	for i := 1; ; i <<= 1 {
		if !set[i] {
			return i
		}
	}
}
func minImpossibleOR(nums []int) int {
	mask := 0
	for _, x := range nums {
		if x&(x-1) == 0 {
			mask |= x
		}
	}
	mask = ^mask
	return mask & -mask
}
func cycleLengthQueries(n int, queries [][]int) []int {
	ans := make([]int, len(queries))
	for i, q := range queries {
		res := 1
		for a, b := q[0], q[1]; a != b; res++ {
			if a > b {
				a >>= 1
			} else {
				b >>= 1
			}
		}
		ans[i] = res
	}
	return ans
}

func getXORSum(arr1 []int, arr2 []int) int {
	aXor := 0
	for _, x := range arr1 {
		aXor ^= x
	}
	bXor := 0
	for _, x := range arr2 {
		bXor ^= x
	}
	return aXor & bXor
}
func sumDigitDifferences(nums []int) (ans int64) {
	cnt := make([][10]int, len(strconv.Itoa(nums[0])))
	for k, x := range nums {
		for i := 0; x > 0; x /= 10 {
			d := x % 10
			ans += int64(k - cnt[i][d])
			cnt[i][d]++
			i++
		}
	}
	return
}
func countExcellentPairs(nums []int, k int) (ans int64) {
	vis := map[int]bool{}
	cnt := map[int]int{}
	for _, x := range nums {
		if !vis[x] {
			cnt[bits.OnesCount(uint(x))]++
			vis[x] = true
		}
	}
	for cx, ccx := range cnt {
		for cy, ccy := range cnt {
			if cx+cy >= k {
				ans += int64(ccx) * int64(ccy)
			}
		}
	}
	return
}
func minOrAfterOperations(nums []int, k int) (ans int) {
	mask := 0
	for b := 29; b >= 0; b-- {
		mask |= 1 << b
		cnt := 0
		and := -1
		for _, x := range nums {
			and &= x & mask
			if and == 0 {
				and = -1
			} else {
				cnt++
			}
		}
		if cnt > k {
			ans |= 1 << b
			mask ^= 1 << b
		}
	}
	return
}

func maxSum(nums []int, k int) (ans int) {
	n := bits.Len(uint(slices.Max(nums)))
	const mod = 1e9 + 7
	cnt := make([]int, n)
	for _, x := range nums {
		for i := range cnt {
			cnt[i] += x >> i & 1
		}
	}
	for ; k > 0; k-- {
		x := 0
		for i := range cnt {
			if cnt[i] > 0 {
				cnt[i]--
				x |= 1 << i
			}
		}
		ans = (ans + x*x) % mod
	}
	return
}
func makeTheIntegerZero(num1, num2 int) int {
	for k := 1; k <= num1-num2*k; k++ {
		if k >= bits.OnesCount(uint(num1-num2*k)) {
			return k
		}
	}
	return -1
}
func grayCode(n int) []int {
	ans := make([]int, 1, 1<<n)
	for i := 1; i <= n; i++ {
		for j := len(ans) - 1; j >= 0; j-- {
			ans = append(ans, ans[j]|1<<(i-1))
		}
	}
	return ans
}
func circularPermutation(n int, start int) []int {
	ans := make([]int, 1, 1<<n)
	ans[0] = start
	for i := 1; i <= n; i++ {
		for j := len(ans) - 1; j >= 0; j-- {
			ans = append(ans, ((ans[j] ^ start) | 1<<(i-1) ^ start))
		}
	}
	return ans
}

func countTriplets11(nums []int) (ans int) {
	cnt := [1 << 16]int{}
	for _, x := range nums {
		for _, y := range nums {
			cnt[x&y]++
		}
	}
	for x, c := range cnt {
		for _, y := range nums {
			if x&y == 0 {
				ans += c
			}
		}
	}
	return
}
func countTriplets(nums []int) (ans int) {
	cnt := [1 << 16]int{}
	for _, x := range nums {
		for _, y := range nums {
			cnt[x&y]++
		}
	}
	for _, x := range nums {
		m := x ^ 0xffff
		s := m
		for {
			ans += cnt[s]
			s = (s - 1) & m
			if s == m {
				break
			}
		}
	}
	return
}
func kthCharacter1(k int64, operations []int) (ans byte) {
	n := len(operations)
	if n == 0 {
		return 'a'
	}
	n--
	op := operations[n]
	operations = operations[:n]
	if k <= 1<<n {
		return kthCharacter1(k, operations)
	}
	ans = kthCharacter1(k-1<<n, operations)
	return 'a' + (ans-'a'+byte(op))%26
}
func kthCharacter222(k int64, operations []int) byte {
	inc := 0
	n := len(operations)
	for i := n - 1; i >= 0; i-- {
		op := operations[i]
		m := 1 << i
		if i < 63 && k > int64(m) {
			inc += op
			k -= int64(m)
		}
	}
	return 'a' + byte(inc%26)
}
func kthCharacte1(k int64, operations []int) byte {
	inc := 0
	n := bits.Len64(uint64(k - 1))
	for i := n - 1; i >= 0; i-- {
		op := operations[i]
		m := 1 << i
		if k > int64(m) {
			inc += op
			k -= int64(m)
		}
	}
	return 'a' + byte(inc%26)
}
func kthCharacter333(k int) byte {
	inc := 0
	n := bits.Len64(uint64(k - 1))
	for i := n - 1; i >= 0; i-- {
		op := 1
		m := 1 << i
		if k > (m) {
			inc += op
			k -= (m)
		}
	}
	return 'a' + byte(inc%26)
}

func kthCharacter2(k int) byte {
	inc := 0
	n := bits.Len64(uint64(k - 1))
	for i := n - 1; i >= 0; i-- {
		op := 1
		m := 1 << i
		if k-1 >= (m) {
			inc += op
			k -= (m)
		}
	}
	return 'a' + byte(inc%26)
}
func kthCharacter(k int) byte {
	k--
	return 'a' + byte(bits.OnesCount(uint(k)))
}

// minOperations 计算将数组元素组合成目标值所需的最小操作次数
// @param nums 输入的整数数组
// @param target 目标值
// @return 最小操作次数，如果无法组合成目标值则返回 -1
func minOperations(nums []int, target int) int {
	// 把nums数组从小到大排序
	sort.Ints(nums)
	// 将目标值转换为 big.Int 类型
	targetBig := big.NewInt(int64(target))
	sum := big.NewInt(0)
	// 把整个数组加起来
	for _, num := range nums {
		sum.Add(sum, big.NewInt(int64(num)))
	}
	// 加起来都小于target，直接返回-1
	if sum.Cmp(targetBig) < 0 {
		return -1
	}
	res := 0
	// 循环直到目标值为 0
	for targetBig.Cmp(big.NewInt(0)) > 0 {
		lastIndex := len(nums) - 1
		// 把数组里最后最大的数字拿出来
		b := big.NewInt(int64(nums[lastIndex]))
		nums = nums[:lastIndex]

		newSum := new(big.Int).Sub(sum, b)
		// 如果不用这个数字，靠前面的数字都能凑出来target，这个数字直接扔掉
		if newSum.Cmp(targetBig) >= 0 {
			// 扔掉数字，继续循环
			sum = newSum
			// 如果这个数字本身就比target大
		} else if b.Cmp(targetBig) > 0 {
			// 那就要拆一次，拆操作的计数+1
			res++
			half := new(big.Int).Rsh(b, 1)
			// 拆完了塞回去数组尾部
			nums = append(nums, int(half.Int64()))
			// 拆完了塞回去数组尾部，继续循环
			nums = append(nums, int(half.Int64()))
			// 如果这个数字刚好是target或者小于target
		} else {
			// 那就把target减去这个数字，剩下的继续循环
			targetBig.Sub(targetBig, b)
			// 扔掉数字，继续循环
			sum.Sub(sum, b)
		}
	}
	// 返回拆操作的次数
	return res
}
func getMaximumXor(nums []int, maximumBit int) []int {
	n := len(nums)
	ans := make([]int, n)
	xor := 0
	for i, x := range nums {
		xor ^= x
		k := 0
		for j := 0; j < maximumBit; j++ {
			if xor&(1<<j) == 0 {
				k |= 1 << j
			}
		}
		ans[n-i-1] = k
	}
	return ans
}
func minEnd(n int, x int) int64 {
	n--
	j := 0
	for t := ^x; n>>j > 0; j++ {
		lb := t & -t
		x |= n >> j * lb
		t ^= lb
	}
	return int64(x)
}
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
func findClosest(x int, y int, z int) int {
	a := abs(x - z)
	b := abs(y - z)
	if a < b {
		return 1
	} else if a > b {
		return 2
	}
	return 0
}
func calculateScore(instructions []string, values []int) int64 {
	n := len(instructions)
	ans := 0
	vis := make([]bool, n)
	index := 0
	for !vis[index] {
		vis[index] = true
		if instructions[index] == "jump" {
			index += values[index]
		} else {
			ans += values[index]
			index++
		}
		if index < 0 || index >= n {
			break
		}
	}
	return int64(ans)
}

func countSubarrays(nums []int, k int) int {
	// 找到k所在的位置
	pos := 0
	for nums[pos] != k {
		pos++
	}
	cnt := map[int]int{0: 1}
	preSum := 0
	for i := pos - 1; i >= 0; i-- {
		if nums[i] < k {
			preSum++
		} else {
			preSum--
		}
		cnt[preSum]++
	}
	ans := cnt[0] + cnt[-1]
	preSum = 0
	for i := pos + 1; i < len(nums); i++ {
		if nums[i] > k {
			preSum++
		} else {
			preSum--
		}
		ans += cnt[preSum] + cnt[preSum-1]
	}
	return ans
}
func maximumPossibleSize(nums []int) int {
	st := []int{}
	n := len(nums)
	for i := n - 1; i >= 0; i-- {
		x := nums[i]
		for len(st) > 0 && st[len(st)-1] < x {
			st = st[:len(st)-1]
		}
		st = append(st, x)
	}
	if len(st) == n {
		return 0
	}
	return n - len(st) - 1
}

func maxScore(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	ans := math.MinInt
	dp := make([][]int, m+1)
	dp[0] = make([]int, n+1)
	for i := range dp[0] {
		dp[0][i] = math.MaxInt
	}
	for i, rows := range grid {
		dp[i+1] = make([]int, n+1)
		dp[i+1][0] = math.MaxInt
		for j, col := range rows {
			mn := min(dp[i+1][j], dp[i][j+1])
			ans = max(ans, col-mn)
			dp[i+1][j+1] = min(mn, col)
		}
	}
	return ans
}

func numberOfPoints(nums [][]int) (ans int) {
	mx := 102
	diff := make([]int, mx)
	for _, d := range nums {
		start, end := d[0], d[1]
		diff[start]++
		diff[end+1]--
	}
	s := 0
	for _, x := range diff {
		s += x
		if s > 0 {
			ans++
		}
	}
	return
}

func isCovered1(ranges [][]int, left int, right int) bool {
	mx := 52
	diff := make([]int, mx)
	for _, d := range ranges {
		start, end := d[0], d[1]
		diff[start]++
		diff[end+1]--
	}
	s := 0
	for i, x := range diff {
		s += x
		if i >= left && i <= right && s <= 0 {
			return false
		}
	}
	return true
}

func isCovered(ranges [][]int, left int, right int) bool {
	mx := 52
	diff := make([]int, mx)
	for _, d := range ranges {
		start, end := d[0], d[1]
		if end < left {
			continue
		}
		diff[max(start, left)]++
		diff[end+1]--
	}
	s := 0
	for _, x := range diff[left : right+1] {
		s += x
		if s <= 0 {
			return false
		}
	}
	return true
}
func maximumPopulation(logs [][]int) int {
	mx := 101
	diffYear := 1950
	diff := make([]int, mx)
	for _, lg := range logs {
		start, end := lg[0]-diffYear, lg[1]-diffYear
		diff[start]++
		diff[end]--
	}
	mxCount := 0
	ans := -1
	s := 0
	for i, d := range diff {
		s += d
		if s > mxCount {
			ans = i + diffYear
			mxCount = s
		}
	}
	return ans
}
func countTestedDevices223(batteryPercentages []int) (ans int) {
	cnt := 0
	for _, x := range batteryPercentages {
		x -= cnt
		if x > 0 {
			ans++
			cnt += x
		}
	}
	return
}

func countTestedDevices1(batteryPercentages []int) (ans int) {
	for i, x := range batteryPercentages {
		if x > 0 {
			ans++
			for j := range batteryPercentages[i+1:] {
				batteryPercentages[j+i+1] -= 1
			}
		}
	}
	return
}
func countTestedDevices2(batteryPercentages []int) (ans int) {
	dec := 0
	for _, x := range batteryPercentages {
		if x-dec > 0 {
			ans++
			dec++
		}
	}
	return
}
func countTestedDevices(batteryPercentages []int) (ans int) {
	for _, x := range batteryPercentages {
		if x-ans > 0 {
			ans++
		}
	}
	return
}

func carPooling(trips [][]int, capacity int) bool {
	mx := 1002
	diff := make([]int, mx)
	for _, t := range trips {
		numPassengers, from, to := t[0], t[1], t[2]
		diff[from] += numPassengers
		diff[to+1] -= numPassengers
	}
	s := 0
	for _, x := range diff {
		s += x
		if s > capacity {
			return false
		}
	}
	return true
}
func corpFlightBookings(bookings [][]int, n int) []int {
	diff := make([]int, n+2)
	for _, book := range bookings {
		first, last, seat := book[0], book[1], book[2]
		diff[first] += seat
		diff[last+1] -= seat
	}
	ans := make([]int, n+2)
	s := 0
	for i, d := range diff {
		s += d
		ans[i] = s
	}
	return ans[1 : len(ans)-1]
}
func isZeroArray(nums []int, queries [][]int) bool {
	n := len(nums)
	diff := make([]int, n+1)
	for _, q := range queries {
		start, end := q[0], q[1]
		diff[start]++
		diff[end+1]--
	}
	s := 0
	for i, d := range diff {
		s += d
		if i < n && nums[i] > s {
			return false
		}
	}
	return true
}
func countLargestGroup(n int) (ans int) {
	mx := 0
	cnt := map[int]int{}
	for i := 1; i <= n; i++ {
		sum := 0
		for x := i; x > 0; x /= 10 {
			sum += x % 10
		}
		cnt[sum]++
		if cnt[sum] > mx {
			mx = cnt[sum]
			ans = 1
		} else if cnt[sum] == mx {
			ans++
		}
	}
	return
}

func minZeroArray(nums []int, queries [][]int) int {
	n := len(nums)
	diff := make([]int, n+1)
	m := len(queries)
	ans := sort.Search(m+1, func(k int) bool {
		clear(diff)
		for _, q := range queries[:k] {
			start, end, val := q[0], q[1], q[2]
			diff[start] += val
			diff[end+1] -= val
		}
		s := 0
		for i, x := range nums {
			s += diff[i]
			if x > s {
				return false
			}
		}
		return true
	})
	if ans > m {
		return -1
	}
	return ans
}

func countDays(days int, meetings [][]int) int {
	mt := merge(meetings)
	for _, m := range mt {
		l, r := m[0], m[1]
		days -= r - l + 1
	}
	return days
}
func merge(intervals [][]int) [][]int {
	// 按照起点从小到大排序
	/* slices.SortFunc(intervals, func(x, y []int) int {
		return x[0] - y[0]
	}) */
	ans := [][]int{}
	ans = append(ans, intervals[0])
	for i := 1; i < len(intervals); i++ {
		item := intervals[i]
		end := ans[len(ans)-1][1]
		start := item[0]
		if start <= end {
			ans[len(ans)-1][1] = max(ans[len(ans)-1][1], item[1])
		} else {
			ans = append(ans, item)
		}
	}
	return ans
}
func insert(intervals [][]int, newInterval []int) [][]int {
	newStart := newInterval[0]
	flag := false
	for i, inter := range intervals {
		if inter[0] > newStart {
			// 插入元素
			intervals = append(intervals[:i], append([][]int{newInterval}, intervals[i:]...)...)
			flag = true
			break
		}
	}
	if !flag {
		intervals = append(intervals, newInterval)
	}
	return merge(intervals)
	/* n := len(intervals)
	ans := [][]int{}
	ans = append(ans, intervals[0])
	for i := 1; i < n; i++ {
		item := intervals[i]
		end := ans[len(ans)-1][1]
		start := item[0]
		if start <= end {
			ans[len(ans)-1][1] = max(ans[len(ans)-1][1], item[1])
		} else {
			ans = append(ans, item)
		}
	}
	return ans */
}
