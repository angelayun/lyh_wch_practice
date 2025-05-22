package a15502

import "math"

type pair struct {
	val, preMin int
}
type MinStack []pair

func Constructor() MinStack {
	return MinStack{{0, math.MaxInt}}
}

func (st *MinStack) Push(val int) {
	(*st) = append((*st), pair{val, min(st.GetMin(), val)})
}

func (st *MinStack) Pop() {
	(*st) = (*st)[:len(*st)-1]
}

func (st MinStack) Top() int {
	return st[len(st)-1].val
}

func (st MinStack) GetMin() int {
	return st[len(st)-1].preMin
}
