package a155

import "math"

type pair struct{ v, mn int }
type MinStack []pair

func Constructor() MinStack {
	return MinStack{{0, math.MaxInt}}
}

func (st *MinStack) Push(val int) {
	*st = append((*st), pair{val, min(val, st.GetMin())})
}

func (st *MinStack) Pop() {
	*st = (*st)[:len(*st)-1]
}

func (st *MinStack) Top() int {
	return (*st)[len(*st)-1].v
}

func (st *MinStack) GetMin() int {
	return (*st)[len(*st)-1].mn
}
