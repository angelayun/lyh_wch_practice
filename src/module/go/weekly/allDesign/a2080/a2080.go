package a2080

import "sort"

type RangeFreqQuery map[int][]int

func Constructor(arr []int) RangeFreqQuery {
	a := RangeFreqQuery{}
	for i, x := range arr {
		a[x] = append(a[x], i)
	}
	return a
}

func (this RangeFreqQuery) Query(left int, right int, value int) int {
	ls := this[value]
	l := sort.SearchInts(ls, left)
	return sort.SearchInts(ls[l:], right)
	// r := sort.SearchInts(ls, right+1)
	// return r - l
}

/**
 * Your RangeFreqQuery object will be instantiated and called as such:
 * obj := Constructor(arr);
 * param_1 := obj.Query(left,right,value);
 */
