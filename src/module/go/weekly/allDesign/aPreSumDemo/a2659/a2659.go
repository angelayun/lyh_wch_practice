package a2659

import "sort"

func countOperationsToEmptyArray(nums []int) int64 {
	n := len(nums)
	id := make([]int, n)
	for i := range id {
		id[i] = i
	}
	sort.Slice(id, func(i, j int) bool { return nums[id[i]] < nums[id[j]] })

	ans := n               // 先把 n 计入答案
	t := newFenwickTree(n) // 下标从 1 开始
	pre := 1               // 上一个最小值的位置，初始为 1
	for k, i := range id {
		i++           // 下标从 1 开始
		if i >= pre { // 从 pre 移动到 i，跳过已经删除的数
			ans += i - pre - t.query(pre, i)
		} else { // 从 pre 移动到 n，再从 1 移动到 i，跳过已经删除的数
			ans += n - pre + i - k + t.query(i, pre-1)
		}
		t.update(i, 1) // 删除 i
		pre = i
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
