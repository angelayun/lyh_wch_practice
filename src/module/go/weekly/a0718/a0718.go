package a0718

import (
	"cmp"
	"container/heap"
	"fmt"
	"math"
	"slices"
	"sort"
	"strings"
)

func maxNumOfSubstrings(s string) (ans []string) {
	pos := [26][]int{}
	for i, b := range s {
		b -= 'a'
		pos[b] = append(pos[b], i)
	}
	g := [26][]int{}
	for i, p := range pos {
		if p == nil {
			continue
		}
		l, r := p[0], p[len(p)-1]
		for j, q := range pos {
			if q == nil || j == i {
				continue
			}
			k := sort.SearchInts(q, l)
			if k < len(q) && q[k] <= r {
				g[i] = append(g[i], j)
			}
		}
	}
	vis := [26]bool{}
	var l, r int
	var dfs func(int)
	dfs = func(x int) {
		vis[x] = true
		p := pos[x]
		l = min(l, p[0])
		r = max(r, p[len(p)-1])
		for _, y := range g[x] {
			if !vis[y] {
				dfs(y)
			}
		}
	}
	type pair struct{ l, r int }
	intervals := []pair{}
	for i, p := range pos {
		if p == nil {
			continue
		}
		vis = [26]bool{}
		l, r = len(s), 0
		dfs(i)
		intervals = append(intervals, pair{l, r})
	}
	slices.SortFunc(intervals, func(a, b pair) int { return a.r - b.r })
	preR := math.MinInt
	for _, item := range intervals {
		if item.l > preR {
			preR = item.r
			ans = append(ans, s[item.l:item.r+1])
		}
	}
	return
}

func jump(nums []int) (ans int) {
	curRight := 0
	nxtRight := 0
	for i, x := range nums[:len(nums)-1] {
		nxtRight = max(nxtRight, i+x)
		if i == curRight {
			ans++
			curRight = nxtRight
		}
	}
	return
}

func removeSubfolders222(folder []string) []string {
	slices.SortFunc(folder, func(a, b string) int { return len(a) - len(b) })
	cnt := map[string]bool{}
	for _, s := range folder {
		if cnt[s] {
			continue
		} else {
			isSub := false
			prefix := []string{}
			for _, sub := range strings.Split(s, "/") {
				if sub == "" {
					continue
				}
				prefix = append(prefix, sub)
				if cnt["/"+strings.Join(prefix, "/")] {
					isSub = true
					break
				}
			}
			if !isSub {
				cnt[s] = true
			}
		}
	}
	ans := []string{}
	for key := range cnt {
		ans = append(ans, key)
	}
	return ans
}

func removeSubfolders22233(folder []string) []string {
	slices.Sort(folder)
	ans := folder[:1]
	for _, s := range folder[1:] {
		last := ans[len(ans)-1]
		if !strings.HasPrefix(s, last) || s[len(last)] != '/' {
			ans = append(ans, s)
		}
	}
	return ans
}

func maximumScore(a int, b int, c int) int {
	sum := a + b + c
	mx := max(a, b, c)
	other := sum - mx
	if mx >= other {
		return other
	}
	return sum / 2
}

func rearrangeBarcodes(barcodes []int) (ans []int) {
	n := len(barcodes)
	cnt := map[int]int{}
	for _, x := range barcodes {
		cnt[x]++
	}
	arr := [][2]int{}
	for key, c := range cnt {
		arr = append(arr, [2]int{key, c})
	}
	// 按照出现次数从大到小排序
	slices.SortFunc(arr, func(x, y [2]int) int { return y[1] - x[1] })
	fmt.Println(arr)
	for len(ans) < n {
		addLen := 0
		for i, item := range arr {
			key, c := item[0], item[1]
			if c > 0 {
				addLen++
				ans = append(ans, key)
				arr[i][1] = c - 1
				if addLen >= 2 {
					break
				}
			}
		}
	}
	return
}
func numberOfWeeks(milestones []int) int64 {
	s := 0
	mx := 0
	for _, x := range milestones {
		s += x
		mx = max(mx, x)
	}
	if mx > s-mx+1 {
		return int64(2*(s-mx) + 1)
	}
	return int64(s)
}

func reorganizeString(s string) string {
	n := len(s)
	count := map[byte]int{}
	for _, ch := range s {
		count[byte(ch)]++
	}
	type pair struct {
		ch  byte
		cnt int
	}
	a := make([]pair, 0, len(count))
	for ch, cnt := range count {
		a = append(a, pair{ch, cnt})
	}
	// 按出现次数从大到小排序
	slices.SortFunc(a, func(x, y pair) int { return y.cnt - x.cnt })
	m := a[0].cnt
	if m > n-m+1 {
		// 比剩余一半元素还要大（考虑奇数情况 所以+1）
		return ""
	}
	ans := make([]byte, n)
	i := 0
	for _, p := range a {
		// 站在值的角度上  可以把它填到哪些下标
		for cnt := p.cnt; cnt > 0; cnt-- {
			ans[i] = p.ch
			i += 2 // 需要间隔着放
			if i >= n {
				// 填完偶数轮的再填奇数值
				i = 1
			}
		}
	}
	return string(ans)
}

func magicTower(nums []int) (ans int) {
	sum := 0
	for _, x := range nums {
		sum += x
	}
	if sum < 0 {
		return -1
	}
	// 为什么是小根堆呢  因为 拿出一个扣血量最大的数（最小的负数）
	count := 1 //血量最开始初始值为1
	h := hp{}
	for _, x := range nums {
		if x < 0 {
			heap.Push(&h, x)
		}
		count += x
		if count < 1 {
			count -= heap.Pop(&h).(int)
			ans++
		}
	}
	return
}

func (h *hp) replace(v int) int { top := h.IntSlice[0]; h.IntSlice[0] = v; heap.Fix(h, 0); return top }

type hp struct{ sort.IntSlice }

func (h hp) Less(i, j int) bool { return h.IntSlice[i] > h.IntSlice[j] } // 最大堆
func (h *hp) Push(v any)        { h.IntSlice = append(h.IntSlice, v.(int)) }
func (h *hp) Pop() any          { a := h.IntSlice; v := a[len(a)-1]; h.IntSlice = a[:len(a)-1]; return v }

func minRefuelStops(target int, startFuel int, stations [][]int) (ans int) {
	stations = append(stations, []int{target, 0})
	// miles 表示可以行驶的距离
	miles := startFuel
	h := hp{}
	for _, station := range stations {
		position, fuel := station[0], station[1]
		for h.Len() > 0 && miles < position {
			// 没有足够的油到达position
			miles += heap.Pop(&h).(int)
		}
		if miles < position {
			return -1
		}
		heap.Push(&h, fuel)
	}
	return
}

func scheduleCourse(courses [][]int) int {
	// 按照完成时间从小到大排序
	slices.SortFunc(courses, func(a, b []int) int {
		return a[1] - b[1]
	})
	h := hp{}
	day := 0
	for _, c := range courses {
		d := c[0]
		if day+d <= c[1] {
			// 没有超过lastday 直接学习
			day += d
			heap.Push(&h, d)
		} else if h.Len() > 0 && d < h.IntSlice[0] { // 该课程的时间比之前的最长时间要短
			// 反悔，撤销之前 duration 最长的课程，改为学习该课程  节省出来的时间，能在后面上完更多的课程
			day -= h.replace(d) - d
		}
	}
	// strings.Builder
	return h.Len()
}

func longestDiverseString(a int, b int, c int) string {
	var res strings.Builder
	for {
		// 找到当前剩余最多的字符
		maxCount := max(a, b, c)
		if maxCount == 0 {
			break
		}

		// 优先选择剩余最多的字符，避免连续三个相同
		if maxCount == a {
			if res.Len() >= 2 && res.String()[res.Len()-2] == 'a' && res.String()[res.Len()-1] == 'a' {
				// 如果前两个字符都是a，则选择次多的字符
				if b >= c && b > 0 {
					res.WriteByte('b')
					b--
				} else if c > 0 {
					res.WriteByte('c')
					c--
				} else {
					break // 没有可选字符，退出循环
				}
			} else {
				res.WriteByte('a')
				a--
			}
		} else if maxCount == b {
			if res.Len() >= 2 && res.String()[res.Len()-2] == 'b' && res.String()[res.Len()-1] == 'b' {
				if a >= c && a > 0 {
					res.WriteByte('a')
					a--
				} else if c > 0 {
					res.WriteByte('c')
					c--
				} else {
					break
				}
			} else {
				res.WriteByte('b')
				b--
			}
		} else { // maxCount == c
			if res.Len() >= 2 && res.String()[res.Len()-2] == 'c' && res.String()[res.Len()-1] == 'c' {
				if a >= b && a > 0 {
					res.WriteByte('a')
					a--
				} else if b > 0 {
					res.WriteByte('b')
					b--
				} else {
					break
				}
			} else {
				res.WriteByte('c')
				c--
			}
		}
	}
	return res.String()
}

func removeSubfolders(folder []string) (ans []string) {
	slices.Sort(folder)
	ans = append(ans, folder[0])
	for _, s := range folder[1:] {
		last := ans[len(ans)-1]
		if !strings.HasPrefix(s, last) || s[len(last)] != '/' {
			ans = append(ans, s)
		}
	}
	return
}

func intersectionSizeTwo(intervals [][]int) (ans int) {
	// 右端点从小到大排序   长度小的放在前面
	slices.SortFunc(intervals, func(a, b []int) int { return cmp.Or(a[1]-b[1], a[0]-b[0]) })
	fmt.Println(intervals)
	ans = 2
	// 初始的两个箭都放在最后 遍历区间的过程中一直维护更新这俩变量的值
	first, second := intervals[0][1]-1, intervals[0][1]
	for _, item := range intervals {
		start, end := item[0], item[1]
		if start <= first {
			// 两个箭都已经覆盖了本区间
			continue
		} else if start <= second {
			// 有一个箭覆盖了本区间
			first = second
			second = end
			ans++
		} else {
			// 没有箭头覆盖本区间
			first = end - 1
			second = end
			ans += 2
		}
	}
	return
}

func minTaps(n int, ranges []int) int {
	m := len(ranges)
	intervals := make([][2]int, m)
	for i, r := range ranges {
		intervals = append(intervals, [2]int{i - r, i + r})
	}
	// 按照右端点从小到大排序
	slices.SortFunc(intervals, func(a, b [2]int) int { return a[1] - b[1] })
}
