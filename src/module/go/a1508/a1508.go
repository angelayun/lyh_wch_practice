package a1508

import "container/heap"

func rangeSum(nums []int, n int, left int, right int) int {
	h := &hp{}

	// 初始化堆：每个起始位置的第一个子数组（长度为1）
	for i := 0; i < n; i++ {
		heap.Push(h, tuple{
			sum:   nums[i],
			start: i,
			end:   i,
		})
	}

	result := 0
	// 弹出前left-1个最小和
	for i := 0; i < left-1; i++ {
		if h.Len() == 0 {
			break
		}
		curr := heap.Pop(h).(tuple)
		// 如果当前子数组可以扩展，将扩展后的子数组加入堆
		if curr.end+1 < n {
			heap.Push(h, tuple{
				sum:   curr.sum + nums[curr.end+1],
				start: curr.start,
				end:   curr.end + 1,
			})
		}
	}

	// 计算区间[left, right]的和
	for i := left; i <= right; i++ {
		if h.Len() == 0 {
			break
		}
		curr := heap.Pop(h).(tuple)
		result = (result + curr.sum) % 1_000_000_007
		// 如果当前子数组可以扩展，将扩展后的子数组加入堆
		if curr.end+1 < n {
			heap.Push(h, tuple{
				sum:   curr.sum + nums[curr.end+1],
				start: curr.start,
				end:   curr.end + 1,
			})
		}
	}

	return result
}

type tuple struct{ sum, start, end int }
type hp []tuple

func (h hp) Len() int           { return len(h) }
func (h hp) Less(i, j int) bool { return h[i].sum < h[j].sum }
func (h hp) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *hp) Push(v any)        { *h = append(*h, v.(tuple)) }
func (h *hp) Pop() any          { a := *h; v := a[len(a)-1]; *h = a[:len(a)-1]; return v }
