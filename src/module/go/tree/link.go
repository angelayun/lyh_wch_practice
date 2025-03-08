package tree

import "math"

type ListNode struct {
	Val  int
	Next *ListNode
}

// 1290
func getDecimalValue(head *ListNode) (ans int) {
	for head != nil {
		ans = ans<<1 + head.Val
		head = head.Next
	}
	return
}

// 2058
func nodesBetweenCriticalPoints(head *ListNode) []int {
	p := head
	prev := p
	p = p.Next
	curIndex := 1
	lastIndex := -1
	firstIndex := -1
	minDist := math.MaxInt
	for p != nil && p.Next != nil {
		next := p.Next
		if p.Val > next.Val && p.Val > prev.Val {
			if lastIndex != -1 {
				minDist = min(minDist, curIndex-lastIndex)
			} else {
				firstIndex = curIndex
			}
			lastIndex = curIndex
		} else if p.Val < next.Val && p.Val < prev.Val {
			if lastIndex != -1 {
				minDist = min(minDist, curIndex-lastIndex)
			} else {
				firstIndex = curIndex
			}
			lastIndex = curIndex
		}
		curIndex++
		prev = p
		p = p.Next
	}
	if lastIndex == firstIndex {
		return []int{-1, -1}
	}
	return []int{minDist, lastIndex - firstIndex}
}

// 2181
func mergeNodes(head *ListNode) *ListNode {
	newHead := head
	p := head.Next
	sum := 0
	for p.Next != nil {
		if p.Val != 0 {
			sum += p.Val
		} else {
			newHead.Val = sum
			sum = 0
			newHead = newHead.Next
		}
		p = p.Next
	}
	newHead.Val = sum
	newHead.Next = nil
	return head
}
// 725
func splitListToParts(head *ListNode, k int) []*ListNode {

}
