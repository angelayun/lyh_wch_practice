package a1670

// 第二种写法：四个 slice
type FrontMiddleBackQueue struct {
	left  *Deque
	right *Deque
}

func Constructor() FrontMiddleBackQueue {
	return FrontMiddleBackQueue{
		left:  &Deque{},
		right: &Deque{},
	}
}

// 调整长度，保证 0 <= right.Len() - left.Len() <= 1
// 从而保证可以在正中间插入删除元素
func (q *FrontMiddleBackQueue) balance() {
	if q.left.Len() > q.right.Len() {
		q.right.PushFront(q.left.PopBack())
	} else if q.right.Len() > q.left.Len()+1 {
		q.left.PushBack(q.right.PopFront())
	}
}

func (q *FrontMiddleBackQueue) PushFront(val int) {
	q.left.PushFront(val)
	q.balance()
}

func (q *FrontMiddleBackQueue) PushMiddle(val int) {
	if q.left.Len() < q.right.Len() {
		q.left.PushBack(val)
	} else {
		q.right.PushFront(val)
	}
}

func (q *FrontMiddleBackQueue) PushBack(val int) {
	q.right.PushBack(val)
	q.balance()
}

func (q *FrontMiddleBackQueue) PopFront() (val int) {
	if q.right.Len() == 0 { // 整个队列为空
		return -1
	}
	if q.left.Len() > 0 {
		val = q.left.PopFront()
	} else {
		val = q.right.PopFront()
	}
	q.balance()
	return
}

func (q *FrontMiddleBackQueue) PopMiddle() int {
	if q.right.Len() == 0 { // 整个队列为空
		return -1
	}
	if q.left.Len() == q.right.Len() {
		return q.left.PopBack()
	}
	return q.right.PopFront()
}

func (q *FrontMiddleBackQueue) PopBack() int {
	if q.right.Len() == 0 { // 整个队列为空
		return -1
	}
	val := q.right.PopBack()
	q.balance()
	return val
}

// 两个 slice 头对头，即可实现双端队列
// 但这并不是一个「工业级」的实现，因为 slice 没有「缩容」的概念
// 这意味着在大量的 pop 操作后，会产生大量无法被自动 GC 的空间
type Deque struct {
	left  []int
	right []int
}

func (q Deque) Empty() bool {
	return len(q.left) == 0 && len(q.right) == 0
}

func (q Deque) Len() int {
	return len(q.left) + len(q.right)
}

func (q *Deque) PushFront(v int) {
	q.left = append(q.left, v)
}

func (q *Deque) PushBack(v int) {
	q.right = append(q.right, v)
}

func (q *Deque) PopFront() (v int) {
	if len(q.left) > 0 {
		q.left, v = q.left[:len(q.left)-1], q.left[len(q.left)-1]
	} else {
		v, q.right = q.right[0], q.right[1:]
	}
	return
}

func (q *Deque) PopBack() (v int) {
	if len(q.right) > 0 {
		q.right, v = q.right[:len(q.right)-1], q.right[len(q.right)-1]
	} else {
		v, q.left = q.left[0], q.left[1:]
	}
	return
}
