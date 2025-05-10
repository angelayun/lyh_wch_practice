package a2080

import "sort"

// key存这个元素 list存这个元素所在的索引位置
type RangeFreqQuery map[int][]int

func Constructor(arr []int) RangeFreqQuery {
	cnt := map[int][]int{}
	for i, v := range arr {
		cnt[v] = append(cnt[v], i)
	}
	return cnt
}

func (f RangeFreqQuery) Query(left int, right int, value int) (ans int) {
	nums := f[value]
	l, r := len(nums), len(nums)
	for j := range nums {
		for r > 0 && nums[r-1] > right {
			r--
		}
		for l > 0 && nums[l-1] >= left {
			l--
		}
		ans += min(r, j) - min(l, j)
	}
	return
}
