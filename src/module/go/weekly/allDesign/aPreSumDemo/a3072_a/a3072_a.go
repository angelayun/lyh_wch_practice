package a3072a

import (
	"slices"
	"sort"
)

func resultArray(nums []int) []int {
	sorted := slices.Clone(nums)
	slices.Sort(sorted)
	sorted = slices.Compact(sorted)
	m := len(sorted)
	a := []int{nums[0]}
	b := []int{nums[1]}
	t1 := newFenwickTree(m)
	t2 := newFenwickTree(m)
	t1.update(sort.SearchInts(sorted, nums[0])+1, 1)
	t2.update(sort.SearchInts(sorted, nums[1])+1, 1)
	for _, x := range nums[2:] {
		v := sort.SearchInts(sorted, x) + 1
		gc1 := len(a) - t1.pre(v)
		gc2 := len(b) - t2.pre(v)
		if gc1 > gc2 || gc1 == gc2 && len(a) < len(b) {
			a = append(a, x)
			t1.update(v, 1)

		} else {
			b = append(b, x)
			t2.update(v, 1)
		}
	}
	return append(a, b...)
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
