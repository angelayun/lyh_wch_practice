package a3624

import "math/bits"

func popDepth(x uint64) (res int) {
	// 这里是直接迭代
	for x > 1 {
		res++
		x = uint64(bits.OnesCount64(x))
	}
	return
}
func popcountDepth(nums []int64, queries [][]int64) (ans []int) {
	n := len(nums)
	f := [6]fenwick{}
	for i := range f {
		f[i] = newFenwickTree(n)
	}

	update := func(i, delta int) {
		d := popDepth(uint64(nums[i]))
		f[d].update(i+1, delta)
	}
	for i := range n {
		update(i, 1)
	}
	for _, q := range queries {
		if q[0] == 1 {
			l, r, k := int(q[1]), int(q[2]), q[3]
			ans = append(ans, f[k].query(l+1, r+1))
		} else {
			idx, v := int(q[1]), q[2]
			update(idx, -1) // 撤销旧的
			nums[idx] = v
			update(idx, 1) // 添加新的
		}
	}
	return
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
