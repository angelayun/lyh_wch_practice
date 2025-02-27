package main

import (
	"fmt"
	"constraints"
)

func upperBound[T constraints.Ordered](nums []T, target T) int {
	left, right := -1, len(nums)
	for left+1 < right {
		mid := left + (right-left)>>1
		if nums[mid] > target {
			right = mid
		} else {
			left = mid
		}
	}
	return right
}

func main() {
	intNums := []int{1, 3, 5, 7, 9}
	intTarget := 5
	resultInt := upperBound(intNums, intTarget)
	fmt.Println(resultInt)

	floatNums := []float64{1.1, 2.2, 3.3, 4.4, 5.5}
	floatTarget := 3.3
	resultFloat := upperBound(floatNums, floatTarget)
	fmt.Println(resultFloat)
}
