package a138101

type CustomStack struct {
	maxSize int
	ls      []int
}

func Constructor(maxSize int) CustomStack {
	return CustomStack{maxSize, []int{}}
}

func (cs *CustomStack) Push(x int) {
	if len((*cs).ls) < (*cs).maxSize {
		(*cs).ls = append((*cs).ls, x)
	}
}

func (cs *CustomStack) Pop() int {
	if len((*cs).ls) <= 0 {
		return -1
	}
	x:=(*cs).ls[len((*cs).ls)-1]
	(*cs).ls=(*cs).ls[:len((*cs).ls)-1]
	return x
}

func (cs *CustomStack) Increment(k int, val int) {
	cnt := min(k, (*cs).maxSize)
	for i := 0; i < cnt; i++ {
		(*cs).ls[i] += val
	}
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * obj := Constructor(maxSize);
 * obj.Push(x);
 * param_2 := obj.Pop();
 * obj.Increment(k,val);
 */
