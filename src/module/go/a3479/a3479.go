package a3479

import "math/bits"
// 线段树模板
type seg []int

func (t seg) maintain(o int) {
	// 左子树是2n 右子树是2n+1
	t[o] = max(t[o<<1], t[o<<1|1])
}
func (t seg) build(a []int, o, l, r int) {
	if l == r {
		t[o] = a[l]
		return
	}
	m := (l + r) >> 1
	t.build(a, o<<1, l, m)
	t.build(a, o<<1|1, m+1, r)
	t.maintain(o)
}

// 找区间内第一个>=x的数并更新为-1 返回这个数的下标（如果没有则返回-1）
func (t seg) findFirstAndUpdate(o, l, r, x int) int {
	// 区间没有>=x的数
	if t[o] < x {
		return -1
	}
	// 到叶子节点  说明根>=x  返回这个节点
	if l == r {
		t[o] = -1 // 更新为-1 表示不能放水果
		return l
	}
	m := (l + r) >> 1
	i := t.findFirstAndUpdate(o<<1, l, m, x)
	if i < 0 {
		// 左边没找到 找右边
		i = t.findFirstAndUpdate(o<<1|1, m+1, r, x)
	}
	// 相当于向上更新整条链
	t.maintain(o)
	return i
}
func newSegmentTree(a []int) seg {
	n := len(a)
	t := make(seg, 2<<bits.Len(uint(n-1)))
	t.build(a, 1, 0, n-1)
	return t
}
func numOfUnplacedFruits(fruits []int, baskets []int) (ans int) {
	t := newSegmentTree(baskets)
	for _, x := range fruits {
		if t.findFirstAndUpdate(1, 0, len(baskets)-1, x) < 0 {
			ans++
		}
	}
	return

}

