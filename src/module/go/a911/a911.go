package a911

import (
	"fmt"
	"sort"
)

// TopVotedCandidate 结构体用于存储选举信息
type TopVotedCandidate struct {
	times []int
	// 存储每个时间点的获胜候选人
	leaders []int
}

// Constructor 初始化 TopVotedCandidate 结构体
func Constructor(persons []int, times []int) TopVotedCandidate {
	n := len(persons)
	// 记录每个候选人的票数
	voteCount := make(map[int]int)
	leaders := make([]int, n)
	// 当前获胜者
	currentLeader := -1
	for i := 0; i < n; i++ {
		person := persons[i]
		voteCount[person]++
		if currentLeader == -1 || voteCount[person] >= voteCount[currentLeader] {
			currentLeader = person
		}
		leaders[i] = currentLeader
	}
	return TopVotedCandidate{
		times:   times,
		leaders: leaders,
	}
}

// Q 查询在 t 时刻的获胜候选人
func (this *TopVotedCandidate) Q(t int) int {
	// 使用二分查找找到小于等于 t 的最大时间点的索引  其实就是rightBound
	idx := sort.SearchInts(this.times, t+1) - 1
	return this.leaders[idx]
}

