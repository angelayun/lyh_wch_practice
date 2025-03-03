package binarysearch

import (
	"sort"
)

// 2080
// key存这个元素 list存这个元素所在的索引位置
type RangeFreqQuery map[int][]int

func Constructor(arr []int) RangeFreqQuery {
	cnt := map[int][]int{}
	for i, v := range arr {
		if cnt[v] == nil {
			cnt[v] = []int{}
		}
		cnt[v] = append(cnt[v], i)
	}
	return cnt
}

func (f RangeFreqQuery) Query(left int, right int, value int) int {
	list := f[value]
	// fmt.Println(list)
	// fmt.Println(left, right)

	l := sort.SearchInts(list, left)
	r := sort.SearchInts(list, right+1)
	// fmt.Println(l, r)

	return r - l
}

// 看自己的提交记录 一步一步优化
