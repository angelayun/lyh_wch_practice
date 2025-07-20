package a307

type NumArray struct {
	nums  []int
	trees []int
}

func Constructor(nums []int) NumArray {
	n := len(nums)
	trees := make([]int, n+1)
	for i, x := range nums {
		i++
		trees[i] += x
		if nxt := i + (i & -i); nxt < len(trees) {
			trees[nxt] += trees[i]
		}
	}
	return NumArray{nums, trees}
}

func (this *NumArray) Update(index int, val int) {
	delta := val - this.nums[index]
	this.nums[index] = val
	for i := index + 1; i < len(this.trees); i += (i & -i) {
		this.trees[i] += delta
	}
}
func (this *NumArray) pre(i int) (s int) {
	for ; i > 0; i -= (i & -i) {
		s += this.trees[i]
	}
	return
}
func (this *NumArray) SumRange(left int, right int) int {
	return this.pre(right+1) - this.pre(left)
}
