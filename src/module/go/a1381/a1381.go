package a1381

type CustomStack struct {
	maxSize int
	ls      []int
}
func Constructor(maxSize int) CustomStack {
	return CustomStack{maxSize: maxSize, ls: []int{}}
}
func (st *CustomStack) Push(x int) {
	if len((*st).ls) < (*st).maxSize {
		(*st).ls = append((*st).ls, x)
	}
}
func (st *CustomStack) Pop() int {
	if len((*st).ls) == 0 {
		return -1
	} else {
		x := (*st).ls[len((*st).ls)-1]
		(*st).ls = (*st).ls[:len((*st).ls)-1]
		return x
	}
}
func (st *CustomStack) Increment(k int, val int) {
	size := len((*st).ls)
	for i := 0; i < min(k, size); i++ {
		(*st).ls[i] += val
	}
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * obj := Constructor(maxSize);
 * obj.Push(x);
 * param_2 := obj.Pop();
 * obj.Increment(k,val);
 */
