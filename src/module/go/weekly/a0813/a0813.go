package a0813

import (
	"cmp"
	"container/heap"
	"fmt"
	"math"
	"slices"
	"sort"
	"strconv"
	"strings"
)

const mx = 1e5 + 1

var np = [mx]bool{0: true, 1: true}

// 也可以写成下面这样
// var np = [mx]bool{true, true} // 0 和 1 不是质数
func init() {
	// 质数=false，非质数=true
	for i := 2; i*i < mx; i++ {
		if !np[i] {
			for j := i * i; j < mx; j += i {
				np[j] = true
			}
		}
	}
}
func isPrime(x int) bool {
	for i := 2; i*i <= x; i++ {
		if x%i == 0 {
			return false
		}
	}
	return x > 1
}
func sumOfLargestPrimes(s string) int64 {
	arr := []int{}
	cnt := map[int]bool{}
	n := len(s)
	for i := 0; i < n; i++ {
		for j := i; j < n; j++ {
			v, _ := strconv.Atoi(s[i : j+1])
			if (v < mx && !np[v]) || (v > mx && isPrime(v)) {
				if !cnt[v] {
					arr = append(arr, v)
					cnt[v] = true
				}
			}
		}
	}
	slices.SortFunc(arr, func(x, y int) int { return y - x })
	fmt.Println(arr)
	sum := 0
	for _, v := range arr[:min(len(arr), 3)] {
		sum += v
	}
	return int64(sum)
}

func maxSubstrings222(word string) (ans int) {
	n := len(word)
	if n < 2 {
		return
	}
	type pair struct{ first, last int }
	pos := [26]pair{}
	for i := range pos {
		pos[i] = pair{first: -1}
	}
	for i, ch := range word {
		index := ch - 'a'
		item := pos[index]
		if item.first == -1 {
			pos[index] = pair{i, i}
		} else if item.first == item.last {
			item.last = i
			pos[index] = item
		}
	}
	fn := func(index int) (ans int) {
		for i := index; i < n; i++ {
			end := pos[word[i]-'a'].last
			if end-i+1 >= 4 {
				ans++
				i = end
			}
		}
		return ans
	}
	for i := 0; i < pos[word[i]-'a'].last; i++ {
		ans = max(ans, fn(i))
	}
	return
}

func maxSubstrings(word string) (ans int) {
	pos := [26]int{}
	for i, b := range word {
		b -= 'a'
		if pos[b] == 0 {
			pos[b] = i + 1
		} else if i+1-pos[b]+1 >= 4 {
			ans++
			clear(pos[:])
		}
	}
	return
}

func assignEdgeWeights(edges [][]int) int {
	n := len(edges) + 1
	g := make([][]int, n+1)
	for _, e := range edges {
		x, y := e[0], e[1]
		g[x] = append(g[x], y)
		g[y] = append(g[y], x)
	}

	var dfs func(int, int) int
	dfs = func(x, fa int) (d int) {
		for _, y := range g[x] {
			if y != fa { // 不递归到父节点
				d = max(d, dfs(y, x)+1)
			}
		}
		return
	}

	k := dfs(1, 0)
	return pow(2, k-1)
}

func pow(x, n int) int {
	const mod = 1_000_000_007
	res := 1
	for ; n > 0; n /= 2 {
		if n%2 > 0 {
			res = res * x % mod
		}
		x = x * x % mod
	}
	return res
}

func areSimilar(mat [][]int, k int) bool {
	n := len(mat[0])
	k %= n
	if k == 0 {
		return true
	}
	for _, r := range mat {
		if !slices.Equal(r, append(r[k:], r[:k]...)) {
			return false
		}
	}
	return true
}

func oddString(words []string) string {
	cnt := map[string][]string{}
	d := make([]byte, len(words)-1)
	for _, s := range words {
		for i := 0; i < len(s)-1; i++ {
			d[i] = s[i+1] - s[i]
		}
		cnt[string(d)] = append(cnt[string(d)], s)
	}
	for _, ls := range cnt {
		if len(ls) == 1 {
			return ls[0]
		}
	}
	return ""
}
func findRotation(mat [][]int, target [][]int) bool {
	// 检查原始矩阵是否已经匹配
	if equals(mat, target) {
		return true
	}

	// 最多旋转3次（加上原始状态共4种可能）
	for i := 0; i < 3; i++ {
		mat = rotate(mat)
		if equals(mat, target) {
			return true
		}
	}

	return false
}

// 检查两个矩阵是否相等
func equals(a, b [][]int) bool {
	n := len(a)
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}

// 将矩阵顺时针旋转90度
func rotate(mat [][]int) [][]int {
	n := len(mat)
	// 创建新矩阵存储旋转结果
	rotated := make([][]int, n)
	for i := range rotated {
		rotated[i] = make([]int, n)
	}

	// 旋转逻辑：原位置(i,j)会旋转到(j, n-1-i)
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			rotated[j][n-1-i] = mat[i][j]
		}
	}

	return rotated
}

/* func findRotation(mat [][]int, target [][]int) bool {
	fn := func(mat [][]int, target [][]int) bool {
		m, n := len(mat), len(mat[0])
		ans:=make([][]int,n)
		for i:=range ans{
			ans[i]=make([]int, m)
		}
		for i:=range mat{
			for j:=range mat[i]{
				ans[j][i]=mat[i][j]
			}
		}
		return ans==target
	}
	for i:=range 4{
		if fn(mat,target){
			return true
		}
	}

} */

/* 1 2 3 4 5
6 7 8 9 10

1 6
2 7
3 8
4 9
5 10 */

func minCostToMoveChips(position []int) int {
	sum := [2]int{}
	for i, x := range position {
		sum[i&1] += x
	}
	if sum[0] > sum[1] {
		return sum[0] - sum[1]
	} else {
		return sum[1] - sum[0]
	}
}

func checkPowersOfThree(n int) bool {
	for n >= 0 {
		if n%3 == 0 || n%3 == 1 {
			n /= 3
		} else {
			return false
		}
	}
	return true
}

func smallestIndex(nums []int) int {
	for i, x := range nums {
		sum := 0
		for ; x > 0; x /= 10 {
			sum += x % 10
		}
		if sum == i {
			return i
		}
	}
	return -1
}

// 链接 https://leetcode.cn/discuss/post/mOr1u6/
type unionFind struct {
	fa []int // 代表元
	sz []int // 集合大小
	cc int   // 连通块个数
}

func newUnionFind(n int) unionFind {
	fa := make([]int, n)
	sz := make([]int, n)
	// 一开始有 n 个集合 {0}, {1}, ..., {n-1}
	// 集合 i 的代表元是自己，大小为 1
	for i := range fa {
		fa[i] = i
		sz[i] = 1
	}
	return unionFind{fa, sz, n}
}

// 返回 x 所在集合的代表元
// 同时做路径压缩，也就是把 x 所在集合中的所有元素的 fa 都改成代表元
func (u unionFind) find(x int) int {
	// 如果 fa[x] == x，则表示 x 是代表元
	if u.fa[x] != x {
		u.fa[x] = u.find(u.fa[x]) // fa 改成代表元
	}
	return u.fa[x]
}

// 判断 x 和 y 是否在同一个集合
func (u unionFind) same(x, y int) bool {
	// 如果 x 的代表元和 y 的代表元相同，那么 x 和 y 就在同一个集合
	// 这就是代表元的作用：用来快速判断两个元素是否在同一个集合
	return u.find(x) == u.find(y)
}

// 把 from 所在集合合并到 to 所在集合中
// 返回是否合并成功
func (u *unionFind) merge(from, to int) bool {
	x, y := u.find(from), u.find(to)
	if x == y { // from 和 to 在同一个集合，不做合并
		return false
	}
	u.fa[x] = y        // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
	u.sz[y] += u.sz[x] // 更新集合大小（注意集合大小保存在代表元上）
	// 无需更新 sz[x]，因为我们不用 sz[x] 而是用 sz[find(x)] 获取集合大小，但 find(x) == y，我们不会再访问 sz[x]
	u.cc-- // 成功合并，连通块个数减一
	return true
}

// 返回 x 所在集合的大小
func (u unionFind) size(x int) int {
	return u.sz[u.find(x)] // 集合大小保存在代表元上
}
func minSwaps(nums []int) int {
	n := len(nums)
	type pair struct{ s, v, i int }
	a := []pair{}
	for i, x := range nums {
		s := 0
		for v := x; v > 0; v /= 10 {
			s += v % 10
		}
		a = append(a, pair{s, x, i})
	}
	slices.SortFunc(a, func(x, y pair) int {
		return cmp.Or(cmp.Compare(x.s, y.s), cmp.Compare(x.v, y.v))
	})
	uf := newUnionFind(n)
	for i, item := range a {
		uf.merge(i, item.i)
	}
	return n - uf.cc
}

func minMoves(target int, maxDoubles int) (ans int) {
	if maxDoubles == 0 {
		return target - 1
	}
	if target == 1 {
		return 0
	}
	for target > 1 {
		if target&1 == 1 {
			target--
		} else if maxDoubles > 0 {
			target /= 2
			maxDoubles--
		} else {
			target--
		}
		ans++
	}
	return
}

func maxSatisfied(customers []int, grumpy []int, minutes int) int {
	cnt := [2]int{}
	maxS1 := 0
	for i, x := range customers {
		cnt[grumpy[i]] += x
		if i < minutes-1 {
			continue
		}
		maxS1 = max(maxS1, cnt[1])
		if grumpy[i] == 1 {
			cnt[grumpy[i]] -= customers[i-minutes+1]
		}
	}
	return cnt[0] + maxS1
}

func minStoneSum(piles []int, k int) (ans int) {
	h := hp{piles}
	heap.Init(&h)
	for k > 0 {
		k--
		top := heap.Pop(&h).(int)
		top -= top / 2
		if top > 0 {
			heap.Push(&h, top)
		}
	}
	for h.Len() > 0 {
		ans += heap.Pop(&h).(int)
	}
	return
}

type hp struct{ sort.IntSlice }

// 从大到小
func (h hp) Less(i, j int) bool  { return h.IntSlice[i] > h.IntSlice[j] }
func (h *hp) Push(v interface{}) { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() interface{} {
	a := h.IntSlice
	v := a[len(a)-1]
	h.IntSlice = a[:len(a)-1]
	return v
}
func maximum69Number22(num int) int {
	v := strconv.Itoa(num)
	v = strings.Replace(v, "6", "9", 1)
	res, _ := strconv.Atoi(v)
	return res
}

func maximum69Number(num int) int {
	maxBase := 0
	base := 1
	for v := num; v > 0; v /= 10 {
		x := v % 10
		if x == '6' {
			maxBase = base
		}
		base *= 10
	}
	return num + (maxBase * 3)
}

func edgeScore222(edges []int) (ans int) {
	n := len(edges)
	deg := make([]int, n)
	for i, pa := range edges {
		deg[pa] += i
	}
	mx := math.MinInt
	for i, d := range deg {
		if d > mx {
			mx = d
			ans = i
		}
	}
	return
}

func edgeScore(edges []int) (ans int) {
	n := len(edges)
	deg := make([]int, n)
	mx := math.MinInt
	for i, pa := range edges {
		deg[pa] += i
		if deg[pa] > mx {
			mx = deg[pa]
			ans = pa
		}
	}
	return
}

func longestAlternatingSubarray(nums []int, threshold int) (ans int) {
	n := len(nums)
	for i := 0; i < n; {
		if nums[i]%2 != 0 || nums[i] > threshold {
			i++
			continue
		}
		i0 := 0
		for i++; i < n && nums[i-1]%2 != nums[i]%2 && nums[i] <= threshold; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt-1)
	}
	return
}

func numMovesStones(a int, b int, c int) []int {
	arr := []int{a, b, c}
	slices.Sort(arr)
	if arr[0]+1 == arr[1] && arr[1]+1 == arr[2] {
		return []int{0, 0}
	}
	leftMin, leftMax := 0, 0
	if arr[0]+1 != arr[1] {
		leftMin = 1
		leftMax = arr[1] - arr[0] - 1
	}
	rightMin, rightMax := 0, 0
	if arr[1]+1 != arr[2] {
		rightMin = 1
		rightMax = arr[2] - arr[1] - 1
	}
	if arr[0]+2 == arr[1] || arr[1]+2 == arr[2] {
		return []int{1, rightMax}
	}
	return []int{leftMin + rightMin, leftMax + rightMax}
}

func checkArithmeticSubarrays(nums []int, l []int, r []int) []bool {
	m := len(l)
	ans := make([]bool, m)
	isDiff := func(a []int) bool {
		slices.Sort(a)
		if len(a) < 2 {
			return false
		}
		diff := a[1] - a[0]
		for i := 2; i < len(a); i++ {
			if a[i]-a[i-1] != diff {
				return false
			}
		}
		return true
	}
	for i, lp := range l {
		rp := r[i]
		// tmp := slices.Clone(nums[lp : rp+1])
		ans[i] = isDiff(nums[lp : rp+1])

	}
	return ans
}

func maximumCostSubstring(s string, chars string, vals []int) (ans int) {
	cnt := [26]int{}
	for i := range cnt {
		cnt[i] = i + 1
	}
	for i, ch := range chars {
		idx := ch - 'a'
		cnt[idx] = vals[i]
	}
	f0 := 0
	ans = f0
	for i := 0; i < len(s); i++ {
		f0 = max(f0, 0) + cnt[s[i]-'a']
		ans = max(ans, f0)
	}
	return
}
func minimumSteps(s string) int64 {
	cnt1 := 0
	ans := 0
	for _, ch := range s {
		if ch == '1' {
			cnt1++
		} else {
			ans += cnt1
		}
	}
	return int64(ans)
}

func longestSubarray(nums []int) (ans int) {
	left := 0
	cnt := [2]int{}
	for right, x := range nums {
		cnt[x]++
		for cnt[0] > 1 {
			cnt[nums[left]]--
			left++
		}
		ans = max(ans, right-left)
	}
	return
}

func lastNonEmptyString(s string) string {
	// 出现在哪些下标
	cnt := [26]int{}
	last := [26]int{}
	mx := 0
	for i, ch := range s {
		cnt[ch-'a']++
		last[ch-'a'] = i
		if cnt[ch-'a'] > mx {
			mx = cnt[ch-'a']
		}
	}
	ans := []byte{}
	for i, ch := range s {
		if cnt[ch-'a'] == mx && i == last[ch-'a'] {
			ans = append(ans, byte(ch))
		}
	}
	return string(ans)
}

func filterRestaurants(restaurants [][]int, veganFriendly int, maxPrice int, maxDistance int) []int {
	type pair struct{ id, rating int }
	ls := []pair{}
	for _, r := range restaurants {
		id, rating, vegan, price, distance := r[0], r[1], r[2], r[3], r[4]
		if !(vegan == 0 && veganFriendly == 1) && price <= maxPrice && distance <= maxDistance {
			ls = append(ls, pair{id, rating})
		}
	}
	slices.SortFunc(ls, func(x, y pair) int { return cmp.Or(cmp.Compare(y.rating, x.rating), cmp.Compare(y.id, x.id)) })
	ans := []int{}
	for _, item := range ls {
		ans = append(ans, item.id)
	}
	return ans
}

func isValid(s string) bool {
	st := []byte{}
	for _, ch := range s {
		st = append(st, byte(ch))
		for len(st) > 2 && st[len(st)-1] == 'c' && st[len(st)-2] == 'b' && st[len(st)-3] == 'a' {
			st = st[:len(st)-3]
		}
	}
	return len(st) == 0
}

func perfectPairs(nums []int) int64 {
	slices.Sort(nums)
	
}