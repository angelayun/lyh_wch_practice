package tree

import (
	"math"
)

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

// 1019
func nextLargerNodes1(head *ListNode) (ans []int) {
	type pair struct {
		i int
		v int
	}
	st := []pair{}
	for cur := head; cur != nil; cur = cur.Next {
		// 如果栈里面有值的话 并且值比当前元素值小
		for len(st) > 0 && st[len(st)-1].v < cur.Val {
			ans[st[len(st)-1].i] = cur.Val
			st = st[:len(st)-1]
		}
		st = append(st, pair{i: len(ans), v: cur.Val})
		// 先占位
		ans = append(ans, 0)
	}
	return ans
}
func reverseList(head *ListNode) (*ListNode, int) {
	var pre, cur *ListNode = nil, head
	n := 0
	for cur != nil {
		n++
		next := cur.Next
		cur.Next = pre
		pre = cur
		cur = next
	}
	return pre, n
}
func nextLargerNodes123(head *ListNode) []int {
	st := []int{}
	head, n := reverseList(head)
	ans := make([]int, n)
	// 从右向左遍历
	for cur := head; cur != nil; cur = cur.Next {
		for len(st) > 0 && st[len(st)-1] <= cur.Val {
			st = st[:len(st)-1]
		}
		n--
		if len(st) > 0 {
			ans[n] = st[len(st)-1]
		}
		st = append(st, cur.Val)
		// 先占位
		ans = append(ans, 0)
	}
	return ans
}

func nextLargerNodes12(head *ListNode) (ans []int) {
	st := []int{}
	var dfs func(*ListNode, int)
	dfs = func(node *ListNode, i int) {
		if node == nil {
			ans = make([]int, i)
			return
		}
		dfs(node.Next, i+1)
		for len(st) > 0 && st[len(st)-1] <= node.Val {
			st = st[:len(st)-1]
		}
		if len(st) > 0 {
			ans[i] = st[len(st)-1]
		}
		st = append(st, node.Val)
	}
	dfs(head, 0)
	return
}
func find132pattern(nums []int) bool {
	n := len(nums)
	prefix := make([]int, n)
	prefix[0] = nums[0]
	for i := 1; i < n; i++ {
		prefix[i] = min(prefix[i-1], nums[i])
	}
	st := []int{}
	for i := n - 1; i > 0; i-- {
		x := nums[i]
		if x > prefix[i] {
			for len(st) > 0 && st[len(st)-1] <= prefix[i] {
				st = st[:len(st)-1]
			}
			if len(st) > 0 && st[len(st)-1] < x {
				return true
			}
			st = append(st, x)
		}
	}
	return false
}
func canSeePersonsCount(heights []int) []int {
	n := len(heights)
	ans := make([]int, n)
	st := []int{}
	for i := n - 1; i >= 0; i-- {
		for len(st) > 0 && heights[st[len(st)-1]] <= heights[i] {
			ans[i]++
			st = st[:len(st)-1]
		}
		if len(st) > 0 {
			ans[i]++
		}
		st = append(st, i)
	}
	return ans
}
func findNumbers(nums []int) (ans int) {
	for _, x := range nums {
		shift := 0
		for ; x > 0; x /= 10 {
			shift++
		}
		if shift&1 == 0 {
			ans++
		}
	}
	return
}

