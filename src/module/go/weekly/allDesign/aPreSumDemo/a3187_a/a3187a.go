package a3187a

func countOfPeaks(nums []int, queries [][]int) (ans []int) {
	n := len(nums)
	f := newFenwickTree(n)
	update := func(i, val int) {
		if nums[i-1] < nums[i] && nums[i] > nums[i+1] {
			f.update(i, val)
		}
	}
	for i := 1; i < n-1; i++ {
		update(i, 1)
	}
	for _, q := range queries {
		if q[0] == 1 {
			l, r := q[1], q[2]
			// 题目说明了  子数组中 第一个 和 最后一个 元素都 不是 峰值元素。
			ans = append(ans, f.query(l+1, r-1))
		} else {
			index, val := q[1], q[2]
			// 撤销之前的峰会元素  +1相当于设置树状数组  -1相当于把标志位去掉
			for j := max(index-1, 1); j <= min(index+1, n-2); j++ {
				update(j, -1)
			}
			nums[index] = val
			for j := max(index-1, 1); j <= min(index+1, n-2); j++ {
				update(j, 1)
			}
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
