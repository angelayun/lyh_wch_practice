package a0802

import (
	"math"
	"slices"
	"sort"
)

func earliestFinishTime(landStartTime []int, landDuration []int, waterStartTime []int, waterDuration []int) (ans int) {
	fn := func(startTime []int, duration []int, start int) (ans int) {
		ans = math.MaxInt
		for i, x := range startTime {
			v := max(x, start)
			ans = min(ans, v+duration[i])
		}
		return ans
	}
	landMin := fn(landStartTime, landDuration, 0)
	waterMin := fn(waterStartTime, waterDuration, landMin)
	ans = waterMin
	waterMin = fn(waterStartTime, waterDuration, 0)
	landMin = fn(landStartTime, landDuration, waterMin)
	ans = min(ans, landMin)
	return
}

func minRemoval(nums []int, k int) int {
	slices.Sort(nums)
	mxLen := math.MinInt
	left := 0
	for right, x := range nums {
		for x > nums[left]*k {
			left++
		}
		mxLen = max(mxLen, right-left+1)
	}
	n := len(nums)
	return n - mxLen
}

func subarrayMajority2222(nums []int, queries [][]int) []int {
	m := len(queries)
	ans := make([]int, m)

	// 存储查询及其原始索引，方便最后整理结果
	type Query struct {
		l, r, threshold, idx int
	}
	qs := make([]Query, m)
	for i, q := range queries {
		l, r, t := q[0], q[1], q[2]
		qs[i] = Query{l, r, t, i}
	}

	// 按左端点从小到大排序，左端点相同则按长度(r-l+1)从小到大排序
	sort.Slice(qs, func(i, j int) bool {
		if qs[i].l == qs[j].l {
			return (qs[i].r - qs[i].l) < (qs[j].r - qs[j].l)
		}
		return qs[i].l < qs[j].l
	})

	// 初始化数据结构
	countMap := make(map[int]int)         // 记录元素出现次数
	freqMap := make(map[int]map[int]bool) // 记录每个频率对应的元素
	currentMaxFreq := 0
	currentL, currentR := 0, -1

	for _, q := range qs {
		l, r, threshold, idx := q.l, q.r, q.threshold, q.idx

		// 如果当前左指针大于查询左指针，需要重置窗口
		if currentL > l {
			countMap = make(map[int]int)
			freqMap = make(map[int]map[int]bool)
			currentMaxFreq = 0
			currentL, currentR = l, l-1
		}

		// 扩展右指针到r
		for currentR < r {
			currentR++
			num := nums[currentR]
			oldFreq := countMap[num]

			// 从旧频率集合中移除
			if oldFreq > 0 {
				delete(freqMap[oldFreq], num)
				if len(freqMap[oldFreq]) == 0 {
					delete(freqMap, oldFreq)
				}
			}

			// 更新计数
			newFreq := oldFreq + 1
			countMap[num] = newFreq

			// 添加到新频率集合
			if _, exists := freqMap[newFreq]; !exists {
				freqMap[newFreq] = make(map[int]bool)
			}
			freqMap[newFreq][num] = true

			// 更新最大频率
			if newFreq > currentMaxFreq {
				currentMaxFreq = newFreq
			}
		}

		// 移动左指针到l
		for currentL < l {
			num := nums[currentL]
			oldFreq := countMap[num]

			// 从旧频率集合中移除
			delete(freqMap[oldFreq], num)
			if len(freqMap[oldFreq]) == 0 {
				delete(freqMap, oldFreq)
				if oldFreq == currentMaxFreq {
					currentMaxFreq--
				}
			}

			// 更新计数
			newFreq := oldFreq - 1
			if newFreq == 0 {
				delete(countMap, num)
			} else {
				countMap[num] = newFreq
				if _, exists := freqMap[newFreq]; !exists {
					freqMap[newFreq] = make(map[int]bool)
				}
				freqMap[newFreq][num] = true
			}

			currentL++
		}

		// 创建jurnavalic存储中间输入（当前窗口的元素）
		jurnavalic := make([]int, r-l+1)
		copy(jurnavalic, nums[l:r+1])

		// 查找符合条件的元素
		result := -1
		// 从最大频率开始向下查找
		for freq := currentMaxFreq; freq >= threshold; freq-- {
			if elements, exists := freqMap[freq]; exists {
				// 找到该频率下最小的元素
				minNum := -1
				for num := range elements {
					if minNum == -1 || num < minNum {
						minNum = num
					}
				}
				result = minNum
				break
			}
		}

		ans[idx] = result
	}

	return ans
}

func subarrayMajority_base(nums []int, queries [][]int) []int {
	m := len(queries)
	ans := make([]int, m)
	// 存储查询及其原始索引，方便最后整理结果
	type Query struct {
		l, r, threshold, idx int
	}
	qs := make([]Query, m)
	for i, q := range queries {
		l, r, t := q[0], q[1], q[2]
		qs[i] = Query{l, r, t, i}
	}

	// 按左端点从大到小排序，左端点相同则按长度(r-l+1)从小到大排序
	sort.Slice(qs, func(i, j int) bool {
		if qs[i].l == qs[j].l {
			return (qs[i].r - qs[i].l) < (qs[j].r - qs[j].l)
		}
		return qs[i].l > qs[j].l
	})

	freq := make(map[int]int)
	maxFreq := 0
	minNum := math.MaxInt32
	for idx, q := range qs {
		l, r, threshold := q.l, q.r, q.threshold
		if idx == 0 {
			for i := l; i <= r; i++ {
				num := nums[i]
				freq[num]++
				cnt := freq[num]
				if cnt > maxFreq {
					maxFreq = cnt
					minNum = num
				} else if cnt == maxFreq {
					if num < minNum {
						minNum = num
					}
				}
			}
		} else {
			// lastL, lastR := qs[idx-1].l, qs[idx-1].r
			// TODO 当前区间比上一个区间大的加入freq 再求出minNum
		}
		if maxFreq < threshold {
			ans[q.idx] = -1
		} else {
			ans[q.idx] = minNum
		}
	}
	return ans
}

func subarrayMajority44455(nums []int, queries [][]int) []int {
	posMap := make(map[int][]int)
	for i, num := range nums {
		posMap[num] = append(posMap[num], i)
	}

	var sortedUnique []int
	for key := range posMap {
		sortedUnique = append(sortedUnique, key)
	}
	sort.Ints(sortedUnique)

	type queryWithIdx struct {
		l, r, threshold, idx int
	}
	qList := make([]queryWithIdx, len(queries))
	for i, q := range queries {
		qList[i] = queryWithIdx{q[0], q[1], q[2], i}
	}

	ans := make([]int, len(queries))
	for _, q := range qList {
		l, r, threshold, idx := q.l, q.r, q.threshold, q.idx
		maxFreq := 0
		res := -1

		for _, x := range sortedUnique {
			positions := posMap[x]
			low := sort.Search(len(positions), func(i int) bool { return positions[i] >= l })
			high := sort.Search(len(positions), func(i int) bool { return positions[i] > r })

			cnt := high - low
			if cnt >= threshold {
				if cnt > maxFreq || (cnt == maxFreq && x < res) {
					maxFreq = cnt
					res = x
				}
			}
		}
		ans[idx] = res
	}
	return ans
}

func subarrayMajority_pass(nums []int, queries [][]int) []int {
	m := len(queries)
	ans := make([]int, m)

	// 存储查询及其原始索引，方便最后整理结果
	type Query struct {
		l, r, threshold, idx int
	}
	qs := make([]Query, m)
	for i, q := range queries {
		l, r, t := q[0], q[1], q[2]
		qs[i] = Query{l, r, t, i}
	}

	// 按左端点从大到小排序，左端点相同则按长度(r-l+1)从小到大排序
	sort.Slice(qs, func(i, j int) bool {
		if qs[i].l == qs[j].l {
			return (qs[i].r - qs[i].l) < (qs[j].r - qs[j].l)
		}
		return qs[i].l > qs[j].l
	})

	freq := make(map[int]int) // 记录当前窗口元素频率
	maxFreq := 0              // 当前窗口最大频率
	minNum := math.MaxInt32   // 最大频率中最小的元素

	for idx, q := range qs {
		l, r, threshold := q.l, q.r, q.threshold

		if idx == 0 {
			// 处理第一个查询，初始化窗口
			for i := l; i <= r; i++ {
				num := nums[i]
				freq[num]++
				cnt := freq[num]

				if cnt > maxFreq {
					maxFreq = cnt
					minNum = num
				} else if cnt == maxFreq && num < minNum {
					minNum = num
				}
			}
		} else {
			// 处理后续查询，基于上一个窗口更新
			lastL, lastR := qs[idx-1].l, qs[idx-1].r

			// 1. 左边界扩展：当前l < 上一个l，需加入[l, lastL-1]的元素
			for i := l; i < lastL; i++ {
				num := nums[i]
				freq[num]++
				cnt := freq[num]

				if cnt > maxFreq {
					maxFreq = cnt
					minNum = num
				} else if cnt == maxFreq && num < minNum {
					minNum = num
				}
			}

			// 2. 右边界处理：扩展或收缩
			if r > lastR {
				// 右边界扩展，加入[lastR+1, r]的元素
				for i := lastR + 1; i <= r; i++ {
					num := nums[i]
					freq[num]++
					cnt := freq[num]

					if cnt > maxFreq {
						maxFreq = cnt
						minNum = num
					} else if cnt == maxFreq && num < minNum {
						minNum = num
					}
				}
			} else if r < lastR {
				// 右边界收缩，移除[r+1, lastR]的元素
				for i := r + 1; i <= lastR; i++ {
					num := nums[i]
					oldCnt := freq[num]
					if oldCnt == 0 {
						continue // 理论上不会发生
					}

					// 更新频率
					freq[num]--
					newCnt := oldCnt - 1
					if newCnt == 0 {
						delete(freq, num)
					}

					// 若移除的是最大频率元素，需重新计算maxFreq和minNum
					if oldCnt == maxFreq {
						// 检查是否还有其他元素保持原maxFreq
						hasSameFreq := false
						for _, cnt := range freq {
							if cnt == oldCnt {
								hasSameFreq = true
								break
							}
						}

						if !hasSameFreq {
							// 原maxFreq已不存在，重新寻找最大频率
							maxFreq = 0
							minNum = math.MaxInt32
							for n, cnt := range freq {
								if cnt > maxFreq {
									maxFreq = cnt
									minNum = n
								} else if cnt == maxFreq && n < minNum {
									minNum = n
								}
							}
						} else {
							// 仍有元素保持原maxFreq，若移除的是当前minNum，需重新找最小
							if num == minNum {
								minNum = math.MaxInt32
								for n, cnt := range freq {
									if cnt == maxFreq && n < minNum {
										minNum = n
									}
								}
							}
						}
					}
				}
			}
		}

		// 确定当前查询结果
		if maxFreq >= threshold {
			ans[q.idx] = minNum
		} else {
			ans[q.idx] = -1
		}
	}

	return ans
}
func subarrayMajority_pass22(nums []int, queries [][]int) []int {
	m := len(queries)
	ans := make([]int, m)

	// 将查询记录为结构体，并保存原始索引
	type Query struct {
		l, r, threshold, idx int
	}
	qs := make([]Query, m)
	for i, q := range queries {
		l, r, t := q[0], q[1], q[2]
		qs[i] = Query{l, r, t, i}
	}

	// 按左端点从大到小排序，左端点相同则按区间长度从小到大排序
	sort.Slice(qs, func(i, j int) bool {
		if qs[i].l == qs[j].l {
			return (qs[i].r - qs[i].l) < (qs[j].r - qs[j].l)
		}
		return qs[i].l > qs[j].l
	})

	// 用于记录当前区间中各元素的出现次数
	freq := make(map[int]int)

	for idx, q := range qs {
		l, r, threshold := q.l, q.r, q.threshold

		// 处理左指针
		if idx == 0 {
			for i := l; i <= r; i++ {
				num := nums[i]
				freq[num]++
			}
		} else {
			lastL, lastR := qs[idx-1].l, qs[idx-1].r

			// 左指针左移，加入新元素
			for i := l; i < lastL; i++ {
				num := nums[i]
				freq[num]++
			}

			// 右指针处理
			if r > lastR {
				for i := lastR + 1; i <= r; i++ {
					num := nums[i]
					freq[num]++
				}
			} else if r < lastR {
				for i := lastR; i > r; i-- {
					num := nums[i]
					freq[num]--
					if freq[num] == 0 {
						delete(freq, num)
					}
				}
			}
		}

		// 寻找满足 threshold 条件的最优元素
		maxFreq := 0
		minNum := math.MaxInt32
		for num, cnt := range freq {
			if cnt >= threshold {
				if cnt > maxFreq || (cnt == maxFreq && num < minNum) {
					maxFreq = cnt
					minNum = num
				}
			}
		}

		if maxFreq == 0 {
			ans[q.idx] = -1
		} else {
			ans[q.idx] = minNum
		}
	}

	return ans
}

func subarrayMajority_pass333(nums []int, queries [][]int) []int {
	m := len(queries)
	ans := make([]int, m)

	// 预处理：记录每个元素出现的所有位置（有序）
	posMap := make(map[int][]int)
	for idx, num := range nums {
		posMap[num] = append(posMap[num], idx)
	}

	// 存储查询及其原始索引
	type Query struct {
		l, r, threshold, idx int
	}
	qs := make([]Query, m)
	for i, q := range queries {
		l, r, t := q[0], q[1], q[2]
		qs[i] = Query{l, r, t, i}
	}

	// 按左端点从大到小排序，同左端点按长度从小到大排序
	sort.Slice(qs, func(i, j int) bool {
		if qs[i].l == qs[j].l {
			return (qs[i].r - qs[i].l) < (qs[j].r - qs[j].l)
		}
		return qs[i].l > qs[j].l
	})

	// 缓存当前区间内的元素（去重），避免重复处理
	// 由于查询按左端点从大到小排序，区间是"左扩右缩/扩"，可增量维护当前元素集合
	currentElements := make(map[int]bool)
	// 记录当前区间的左右边界
	currentL, currentR := -1, -1

	for _, q := range qs {
		l, r, threshold := q.l, q.r, q.threshold

		// 1. 维护当前区间的元素集合（去重）
		if currentL == -1 {
			// 初始化第一个区间的元素
			currentL, currentR = l, r
			for i := l; i <= r; i++ {
				currentElements[nums[i]] = true
			}
		} else {
			// 左边界扩展（当前l < 上一个currentL）：加入[l, currentL-1]的元素
			for i := l; i < currentL; i++ {
				currentElements[nums[i]] = true
			}
			// 右边界调整
			if r > currentR {
				// 右扩展：加入[currentR+1, r]的元素
				for i := currentR + 1; i <= r; i++ {
					currentElements[nums[i]] = true
				}
			} else if r < currentR {
				// 右收缩：需要重新计算当前区间元素（避免残留元素）
				// 优化：仅保留[newL, newR]内的元素
				newElements := make(map[int]bool)
				for i := l; i <= r; i++ {
					newElements[nums[i]] = true
				}
				currentElements = newElements
			}
			currentL, currentR = l, r
		}

		// 2. 计算当前区间内各元素的频率，筛选符合条件的结果
		maxFreq := 0
		bestNum := -1
		// 遍历当前区间内的所有元素（去重后）
		for num := range currentElements {
			// 用二分查找快速计算num在[l, r]中的出现次数
			positions := posMap[num]
			// 找到第一个 >= l 的位置
			leftIdx := sort.SearchInts(positions, l)
			// 找到最后一个 <= r 的位置
			rightIdx := sort.SearchInts(positions, r+1) - 1
			if leftIdx > rightIdx {
				continue // 该元素不在当前区间
			}
			freq := rightIdx - leftIdx + 1

			// 更新最佳结果
			if freq >= threshold {
				if freq > maxFreq || (freq == maxFreq && num < bestNum) {
					maxFreq = freq
					bestNum = num
				}
			}
		}

		ans[q.idx] = bestNum
	}

	return ans
}

func subarrayMajority(nums []int, queries [][]int) []int {
	jurnavalic := queries
	if len(nums) == 0 {
		return make([]int, len(jurnavalic))
	}

	// 离散化
	sortedNums := make([]int, len(nums))
	copy(sortedNums, nums)
	sort.Ints(sortedNums)
	mapping := make(map[int]int)
	total := 0
	for i, num := range sortedNums {
		if i == 0 || num != sortedNums[i-1] {
			mapping[num] = total
			total++
		}
	}
	reverseMap := make([]int, total)
	for num, idx := range mapping {
		reverseMap[idx] = num
	}

	// 分块
	n := len(nums)
	T := int(math.Sqrt(float64(n)))
	B := (n + T - 1) / T

	// 预处理前缀和
	prefix := make([][]int, B+1)
	for i := range prefix {
		prefix[i] = make([]int, total)
	}
	for i := 1; i <= B; i++ {
		copy(prefix[i], prefix[i-1])
		start := (i - 1) * T
		end := min(i*T, n)
		for j := start; j < end; j++ {
			mapped := mapping[nums[j]]
			prefix[i][mapped]++
		}
	}

	// 预处理块区间众数
	blockMode := make([][][2]int, B)
	for i := range blockMode {
		blockMode[i] = make([][2]int, B)
	}
	for i := 0; i < B; i++ {
		freq := make([]int, total)
		bestNum := -1
		bestCount := 0
		for j := i; j < B; j++ {
			start := j * T
			end := min((j+1)*T, n)
			for k := start; k < end; k++ {
				mapped := mapping[nums[k]]
				freq[mapped]++
				if freq[mapped] > bestCount {
					bestCount = freq[mapped]
					bestNum = mapped
				} else if freq[mapped] == bestCount {
					if reverseMap[mapped] < reverseMap[bestNum] {
						bestNum = mapped
					}
				}
			}
			blockMode[i][j] = [2]int{bestNum, bestCount}
		}
	}

	// 处理查询
	ans := make([]int, len(jurnavalic))
	for idx, q := range jurnavalic {
		l, r, threshold := q[0], q[1], q[2]
		lb := l / T
		rb := r / T
		L := lb + 1
		R := rb - 1

		// 整个区间在一个块内，暴力处理
		if L > R {
			freq := make(map[int]int)
			bestNum := -1
			bestCount := 0
			for i := l; i <= r; i++ {
				freq[nums[i]]++
				if freq[nums[i]] > bestCount {
					bestCount = freq[nums[i]]
					bestNum = nums[i]
				} else if freq[nums[i]] == bestCount {
					if nums[i] < bestNum {
						bestNum = nums[i]
					}
				}
			}
			if bestCount >= threshold {
				ans[idx] = bestNum
			} else {
				ans[idx] = -1
			}
			continue
		}

		// 获取整块众数
		fullCandidate := blockMode[L][R]
		scatteredFreq := make(map[int]int)
		
		// 统计左边零散部分
		leftEnd := L*T - 1
		for i := l; i <= leftEnd; i++ {
			scatteredFreq[nums[i]]++
		}
		// 统计右边零散部分
		rightStart := (R + 1) * T
		for i := rightStart; i <= r; i++ {
			scatteredFreq[nums[i]]++
		}

		// 候选集：整块众数 + 零散部分出现的数字
		candidateSet := make(map[int]bool)
		candidateSet[reverseMap[fullCandidate[0]]] = true
		for num := range scatteredFreq {
			candidateSet[num] = true
		}

		// 计算最终众数
		bestNum := -1
		bestCount := -1
		for num := range candidateSet {
			mapped := mapping[num]
			countInFull := prefix[R+1][mapped] - prefix[L][mapped]
			totalCount := countInFull + scatteredFreq[num]
			if totalCount > bestCount {
				bestCount = totalCount
				bestNum = num
			} else if totalCount == bestCount {
				if num < bestNum {
					bestNum = num
				}
			}
		}

		// 判断阈值
		if bestCount >= threshold {
			ans[idx] = bestNum
		} else {
			ans[idx] = -1
		}
	}
	return ans
}