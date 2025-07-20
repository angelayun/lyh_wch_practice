package a2426

import "sort"

func numberOfPairs(a []int, nums2 []int, diff int) int64 {
	// 离散化三步  复制、排序  去重
	for i, x := range nums2 {
		a[i] -= x
	}
	// 去重
	set := map[int]struct{}{}
	for _, v := range a {
		set[v] = struct{}{}
	}
	b := make(sort.IntSlice, 0, len(set))
	for x := range set {
		b = append(b, x)
	}
	// 排序
	sort.Ints(b)
	t := newFenwickTree(len(a))
	ans := 0
	for _, x := range a {
		ans += t.pre(b.Search(x + diff + 1))
		t.update(b.Search(x)+1, 1)
	}
	return int64(ans)
}

// https://leetcode.cn/discuss/post/3583665/
// fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/
type fenwick []int

func newFenwickTree(n int) fenwick {
	return make(fenwick, n+1) // 使用下标 1 到 n
}

// a[i] 增加 val
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) update(i int, val int) {
	for ; i < len(f); i += i & -i {
		f[i] += val
	}
}

// 求前缀和 a[1] + ... + a[i]
// 1 <= i <= n
// 时间复杂度 O(log n)
func (f fenwick) pre(i int) (res int) {
	for ; i > 0; i &= i - 1 {
		res += f[i]
	}
	return
}

// 求区间和 a[l] + ... + a[r]
// 1 <= l <= r <= n
// 时间复杂度 O(log n)
func (f fenwick) query(l, r int) int {
	if r < l {
		return 0
	}
	return f.pre(r) - f.pre(l-1)
}
