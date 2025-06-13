package a1286

import (
	"math/bits"
	"sort"
)

type CombinationIterator struct {
	arr []string
	idx int
}

func Constructor(characters string, combinationLength int) CombinationIterator {
	n := len(characters)
	var arr []string
	for mask := 0; mask < (1 << n); mask++ {
		if bits.OnesCount(uint(mask)) == combinationLength {
			tmp := []rune{}
			for j, ch := range characters {
				if mask>>j&1 != 0 {
					tmp = append(tmp, ch)
				}
			}
			arr = append(arr, string(tmp))
		}
	}
	sort.Strings(arr)
	return CombinationIterator{arr: arr, idx: 0}
}
func (ci *CombinationIterator) Next() string {
	ci.idx++
	return ci.arr[ci.idx-1]
}
func (ci *CombinationIterator) HasNext() bool {
	return ci.idx < len(ci.arr)
}
