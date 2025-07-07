package a1863

type FindSumPairs struct {
	num1 []int
	num2 []int
	cnt  map[int]int
}

func Constructor(nums1 []int, nums2 []int) FindSumPairs {
	cnt := map[int]int{}
	for _, x := range nums2 {
		cnt[x]++
	}
	return FindSumPairs{nums1, nums2, cnt}
}

func (this *FindSumPairs) Add(index int, val int) {
	this.cnt[this.num2[index]]--
	this.num2[index] += val
	this.cnt[this.num2[index]]++
}

func (this *FindSumPairs) Count(tot int) (ans int) {
	for _, x := range this.num1 {
		ans += this.cnt[tot-x]
	}
	return
}

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * obj := Constructor(nums1, nums2);
 * obj.Add(index,val);
 * param_2 := obj.Count(tot);
 */
