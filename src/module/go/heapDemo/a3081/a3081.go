func minimizeStringValue(s string) string {
	h := make(hp, 26)
	// 存的是26个字母及其出现的次数  初始化出现的次数为0
	for i := byte(0); i < 26; i++ {
		h[i].c = 'a' + i
	}
	count := 0
	//  或者也可以直接用strings.Count(s,"?")
	for _, b := range s {
		if b != '?' {
			h[b-'a'].freq++
		} else {
			count++
		}
	}
	heap.Init(&h)

	t := make([]byte, count)
	for i := range t {
		// 拿到堆顶的值
		t[i] = h[0].c
		h[0].freq++
		// 相当于replace 也就是把堆顶的freq+1 再设置回堆顶
		heap.Fix(&h, 0)
	}
	// 排序  因为要求字典序最小
	slices.Sort(t)
	ans := []byte(s)
	j := 0
	for i, b := range ans {
		if b == '?' {
			ans[i] = t[j]
			j++
		}
	}
	return string(ans)
}

type pair struct {
	freq int
	c    byte
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []pair

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照出现次数从大到小排序  如果出现次数相同则按照字典序排序
func (h hp) Less(i, j int) bool {
	return h[i].freq < h[j].freq || h[i].freq == h[j].freq && h[i].c < h[j].c
}

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(pair)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }