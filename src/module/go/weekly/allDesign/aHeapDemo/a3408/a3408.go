package a3408

import (
	"cmp"
	"container/heap"
)

type pair struct{ priority, userId int }
type TaskManager struct {
	h  *hp
	mp map[int]pair
}

func Constructor(tasks [][]int) TaskManager {
	h := hp{}
	mp := map[int]pair{}
	for _, task := range tasks {
		userId, taskId, priority := task[0], task[1], task[2]
		mp[taskId] = pair{priority, userId}
		h = append(h, tuple{priority, taskId, userId})
	}
	heap.Init(&h)
	return TaskManager{&h, mp}
}

func (tm *TaskManager) Add(userId int, taskId int, priority int) {
	tm.mp[taskId] = pair{priority, userId}
	heap.Push(tm.h, tuple{priority, taskId, userId})
}

func (tm *TaskManager) Edit(taskId int, newPriority int) {
	tm.Add(tm.mp[taskId].userId, taskId, newPriority)
}

func (tm *TaskManager) Rmv(taskId int) {
	tm.mp[taskId] = pair{-1, -1}
}

func (tm *TaskManager) ExecTop() int {
	for tm.h.Len() > 0 {
		top := heap.Pop(tm.h).(tuple)
		priority, taskId, userId := top.priority, top.taskId, top.userId
		if tm.mp[taskId] == (pair{priority, userId}) {
			tm.Rmv(taskId)
			return userId
		}
	}
	return -1
}

type tuple struct {
	priority, taskId, userId int
}

// hp 定义一个堆类型, 存储 tuple 元素
type hp []tuple

// Len 实现堆接口的 Len 方法
func (h hp) Len() int { return len(h) }

// Less 实现堆接口的 Less 方法, 按照优先级从高到低  如果优先级相同的情况下 按照taskId从大到小
func (h hp) Less(i, j int) bool {
	return cmp.Or(h[i].priority-h[j].priority, h[i].taskId-h[j].taskId) > 0
}

// Swap 实现堆接口的 Swap 方法
func (h hp) Swap(i, j int) { h[i], h[j] = h[j], h[i] }

// Push 实现堆接口的 Push 方法
func (h *hp) Push(v any) { *h = append(*h, v.(tuple)) }

// Pop 实现堆接口的 Pop 方法
func (h *hp) Pop() (v any) { a := *h; *h, v = a[:len(a)-1], a[len(a)-1]; return }
