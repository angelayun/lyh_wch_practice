package a911

import "sort"

type TopVotedCandidate struct {
	times   []int
	leaders []int
}

func Constructor(persons []int, times []int) TopVotedCandidate {
	n := len(persons)
	voteCnt := map[int]int{}
	curLeader := -1
	leaders := make([]int, n)
	for i := range n {
		p := persons[i]
		voteCnt[p]++
		if curLeader < 0 || voteCnt[p] >= voteCnt[curLeader] {
			curLeader = p
		}
		leaders[i] = curLeader
	}
	return TopVotedCandidate{times: times, leaders: leaders}
}

func (this *TopVotedCandidate) Q(t int) int {
	idx := sort.SearchInts(this.times, t+1) - 1
	if idx >= 0 {
		return this.leaders[idx]
	}
	return this.leaders[0]
}
