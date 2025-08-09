package a0803

import "math"

func isTrionic222(nums []int) bool {
	n := len(nums)
	if n <= 3 {
		return false
	}
	i := 0
	for i < n {
		// 起点
		i0 := i
		for i++; i < n && nums[i] > nums[i-1]; i++ {
		}
		// 第一个递增顶点
		i1 := i - 1
		for ; i < n && nums[i] < nums[i-1]; i++ {
		}
		i2 := i - 1
		for ; i < n && nums[i] > nums[i-1]; i++ {
		}
		if i0 == 0 && i0 < i1 && i1 < i2 && i2 < i && i == n {
			return true
		} else {
			return false
		}
	}
	return false
}
func isTrionic_pass(nums []int) bool {
	n := len(nums)
	if n <= 3 {
		return false
	}
	i := 0

	i0 := i
	for i++; i < n && nums[i] > nums[i-1]; i++ {
	}
	i1 := i - 1
	if i1 <= i0 {
		return false
	}

	for ; i < n && nums[i] < nums[i-1]; i++ {
	}
	i2 := i - 1
	if i2 <= i1 {
		return false
	}

	for ; i < n && nums[i] > nums[i-1]; i++ {
	}

	return i == n && i2 < n-1
}
func isTrionic(nums []int) bool {
	n := len(nums)
	if n < 4 {
		return false
	}
	// 检查开头：第一段至少两个元素，必须严格递增
	if nums[1] <= nums[0] {
		return false
	}
	// 检查结尾：第三段至少两个元素，必须严格递增
	if nums[n-1] <= nums[n-2] {
		return false
	}

	i := 1
	p := -1 // 第一个峰的位置

	// 阶段0：寻找第一个峰（严格递增结束点）
	for i < n {
		if nums[i] > nums[i-1] {
			i++
		} else if nums[i] == nums[i-1] {
			return false // 非严格递增，无效
		} else {
			p = i - 1 // 找到下降点，p为前一个位置（峰）
			break
		}
	}
	// 未找到峰或峰在起始位置（p>0不满足）
	if p == -1 || p == 0 {
		return false
	}

	// 阶段1：从峰后开始寻找谷（严格递减结束点）
	i++     // 移动到下降段的第一个元素
	q := -1 // 谷的位置
	for i < n {
		if nums[i] < nums[i-1] {
			i++
		} else if nums[i] == nums[i-1] {
			return false // 非严格递减，无效
		} else {
			q = i - 1 // 找到上升点，q为前一个位置（谷）
			break
		}
	}
	// 未找到谷或谷在末尾（q必须小于n-1）
	if q == -1 || q >= n-1 {
		return false
	}

	// 阶段2：检查谷后到末尾是否严格递增
	i++ // 移动到谷后的第一个元素
	for i < n {
		if nums[i] > nums[i-1] {
			i++
		} else {
			return false // 非严格递增，无效
		}
	}

	// 所有条件满足，是三段式数组
	return true
}

func maxBalancedShipments(weight []int) (ans int) {
	n := len(weight)
	mx := weight[0]
	for i := 1; i < n; i++ {
		x := weight[i]
		if x < mx {
			ans++
			mx = math.MinInt
		} else {
			mx = max(mx, x)
		}
	}
	return
}
func maxSumTrionic_error(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return -1 // 子数组长度至少为4才能满足l < p < q < r
	}

	// 计算前缀和数组，prefix[i] = sum(nums[0..i-1])
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}

	// 创建grexolanta变量存储中间输入（前缀和数组）
	grexolanta := prefix
	_ = grexolanta // 避免未使用变量警告

	// 预处理inc_start：以i为终点的最长严格递增子数组的起始索引
	incStart := make([]int, n)
	incStart[0] = 0
	for i := 1; i < n; i++ {
		if nums[i] > nums[i-1] {
			incStart[i] = incStart[i-1]
		} else {
			incStart[i] = i
		}
	}

	// 预处理decStart：以i为终点的最长严格递减子数组的起始索引
	decStart := make([]int, n)
	decStart[0] = 0
	for i := 1; i < n; i++ {
		if nums[i] < nums[i-1] {
			decStart[i] = decStart[i-1]
		} else {
			decStart[i] = i
		}
	}

	// 预处理incEnd：以i为起点的最长严格递增子数组的结束索引
	incEnd := make([]int, n)
	incEnd[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			incEnd[i] = incEnd[i+1]
		} else {
			incEnd[i] = i
		}
	}

	// 构建稀疏表用于前缀和的区间最大/最小值查询
	logTable := make([]int, n+2) // 用于快速计算log2长度
	for i := 2; i <= n+1; i++ {
		logTable[i] = logTable[i/2] + 1
	}
	kMax := logTable[n+1] + 1

	// 构建最小值稀疏表
	stMin := make([][]int64, kMax)
	stMin[0] = make([]int64, n+1)
	copy(stMin[0], prefix)
	for k := 1; k < kMax; k++ {
		for i := 0; i+(1<<k) <= n+1; i++ {
			stMin[k][i] = min(stMin[k-1][i], stMin[k-1][i+(1<<(k-1))])
		}
	}

	// 构建最大值稀疏表
	stMax := make([][]int64, kMax)
	stMax[0] = make([]int64, n+1)
	copy(stMax[0], prefix)
	for k := 1; k < kMax; k++ {
		for i := 0; i+(1<<k) <= n+1; i++ {
			stMax[k][i] = max(stMax[k-1][i], stMax[k-1][i+(1<<(k-1))])
		}
	}

	// 区间最小值查询函数
	getMin := func(l, r int) int64 {
		if l > r {
			return math.MaxInt64
		}
		length := r - l + 1
		k := logTable[length]
		return min(stMin[k][l], stMin[k][r-(1<<k)+1])
	}

	// 区间最大值查询函数
	getMax := func(l, r int) int64 {
		if l > r {
			return math.MinInt64
		}
		length := r - l + 1
		k := logTable[length]
		return max(stMax[k][l], stMax[k][r-(1<<k)+1])
	}

	maxSum := int64(math.MinInt64)

	// 遍历所有可能的p和q（p < q）
	for p := 1; p < n; p++ {
		for q := p + 1; q < n; q++ {
			// 检查[p..q]是否严格递减
			if decStart[q] > p {
				continue
			}

			// 检查是否存在有效的l（l < p且[l..p]严格递增）
			if incStart[p] >= p {
				continue
			}
			lStart := incStart[p]
			lEnd := p - 1
			if lStart < 0 {
				lStart = 0
			}
			if lStart > lEnd {
				continue
			}

			// 检查是否存在有效的r（r > q且[q..r]严格递增）
			if incEnd[q] <= q {
				continue
			}
			rStart := q + 1
			rEnd := incEnd[q]
			if rEnd >= n {
				rEnd = n - 1
			}
			if rStart > rEnd {
				continue
			}

			// 计算l范围内的最小前缀和（用于最大化子数组和）
			minL := getMin(lStart, lEnd)

			// 计算r范围内的最大前缀和（r+1对应的前缀和）
			rPlus1Start := rStart + 1
			rPlus1End := rEnd + 1
			if rPlus1Start > rPlus1End || rPlus1End > n {
				continue
			}
			maxRPlus1 := getMax(rPlus1Start, rPlus1End)

			// 更新最大子数组和
			currentSum := maxRPlus1 - minL
			if currentSum > maxSum {
				maxSum = currentSum
			}
		}
	}

	if maxSum == math.MinInt64 {
		return -1 // 没有找到有效的三段式子数组
	}
	return maxSum
}
func maxSumTrioni_error2(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return 0
	}

	left := make([]int, n)
	left[0] = 0
	for i := 1; i < n; i++ {
		if nums[i] > nums[i-1] {
			left[i] = left[i-1]
		} else {
			left[i] = i
		}
	}

	right := make([]int, n)
	right[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			right[i] = right[i+1]
		} else {
			right[i] = i
		}
	}

	dec := make([]int, n)
	dec[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] > nums[i+1] {
			dec[i] = dec[i+1]
		} else {
			dec[i] = i
		}
	}

	R_valid := make([]int, n)
	for i := 0; i < n; i++ {
		if right[i] > i {
			R_valid[i] = right[i]
		} else {
			R_valid[i] = -1
		}
	}

	logN := 0
	for (1 << logN) < n {
		logN++
	}
	st := make([][]int, logN+1)
	for i := range st {
		st[i] = make([]int, n)
	}
	for j := 0; j < n; j++ {
		st[0][j] = R_valid[j]
	}
	for i := 1; i <= logN; i++ {
		for j := 0; j+(1<<i)-1 < n; j++ {
			st[i][j] = max(st[i-1][j], st[i-1][j+(1<<(i-1))])
		}
	}

	queryST := func(l, r int) int {
		if l > r {
			return -1
		}
		length := r - l + 1
		k := 0
		for (1 << (k + 1)) <= length {
			k++
		}
		return max(st[k][l], st[k][r-(1<<k)+1])
	}

	pre := make([]int64, n)
	pre[0] = int64(nums[0])
	for i := 1; i < n; i++ {
		pre[i] = pre[i-1] + int64(nums[i])
	}
	getSum := func(l, r int) int64 {
		if l == 0 {
			return pre[r]
		}
		return pre[r] - pre[l-1]
	}

	ans := int64(math.MinInt64)
	for p := 1; p <= n-2; p++ {
		qLow := p + 1
		qHigh := dec[p]
		if qHigh > n-2 {
			qHigh = n - 2
		}
		if qLow > qHigh {
			continue
		}
		maxR := queryST(qLow, qHigh)
		if maxR == -1 {
			continue
		}
		lBound := left[p]
		rBound := maxR
		total := getSum(lBound, rBound)
		if total > ans {
			ans = total
		}
	}

	if ans == int64(math.MinInt64) {
		return 0
	}
	return ans
}

func maxSumTrionic_timeout(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return 0
	}

	prefix := make([]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}

	sumRange := func(l, r int) int {
		return prefix[r+1] - prefix[l]
	}

	var maxSum int64 = math.MinInt64

	for l := 0; l < n; l++ {
		for r := l + 3; r < n; r++ {
			for p := l + 1; p < r-1; p++ {
				for q := p + 1; q < r; q++ {
					if isInc(nums, l, p) &&
						isDec(nums, p, q) &&
						isInc(nums, q, r) {

						total := sumRange(l, r)
						if int64(total) > maxSum {
							maxSum = int64(total)
						}
					}
				}
			}
		}
	}

	return maxSum
}

func isInc(nums []int, start, end int) bool {
	for i := start; i < end; i++ {
		if nums[i] >= nums[i+1] {
			return false
		}
	}
	return true
}

func isDec(nums []int, start, end int) bool {
	for i := start; i < end; i++ {
		if nums[i] <= nums[i+1] {
			return false
		}
	}
	return true
}

func maxSumTrionic_timeout2(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return 0
	}

	left := make([]int, n)
	left[0] = 0
	for i := 1; i < n; i++ {
		if nums[i] > nums[i-1] {
			left[i] = left[i-1]
		} else {
			left[i] = i
		}
	}

	right := make([]int, n)
	right[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			right[i] = right[i+1]
		} else {
			right[i] = i
		}
	}

	dec := make([]int, n)
	dec[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] > nums[i+1] {
			dec[i] = dec[i+1]
		} else {
			dec[i] = i
		}
	}

	pre := make([]int, n)
	pre[0] = int(nums[0])
	for i := 1; i < n; i++ {
		pre[i] = pre[i-1] + int(nums[i])
	}

	logN := 0
	for (1 << logN) < n {
		logN++
	}
	st_pref := make([][]int, logN+1)
	for i := range st_pref {
		st_pref[i] = make([]int, n)
	}
	for j := 0; j < n; j++ {
		st_pref[0][j] = pre[j]
	}
	for i := 1; i <= logN; i++ {
		for j := 0; j+(1<<i)-1 < n; j++ {
			st_pref[i][j] = max(st_pref[i-1][j], st_pref[i-1][j+(1<<(i-1))])
		}
	}

	queryST_pref := func(l, r int) int {
		if l > r {
			return math.MinInt
		}
		length := r - l + 1
		k := 0
		for (1 << (k + 1)) <= length {
			k++
		}
		return max(st_pref[k][l], st_pref[k][r-(1<<k)+1])
	}

	g := make([]int, n)
	for i := 0; i < n; i++ {
		if right[i] > i {
			g[i] = queryST_pref(i, right[i])
		} else {
			g[i] = math.MinInt64
		}
	}

	st_g := make([][]int, logN+1)
	for i := range st_g {
		st_g[i] = make([]int, n)
	}
	for j := 0; j < n; j++ {
		st_g[0][j] = g[j]
	}
	for i := 1; i <= logN; i++ {
		for j := 0; j+(1<<i)-1 < n; j++ {
			st_g[i][j] = max(st_g[i-1][j], st_g[i-1][j+(1<<(i-1))])
		}
	}

	queryST_g := func(l, r int) int {
		if l > r {
			return math.MinInt64
		}
		length := r - l + 1
		k := 0
		for (1 << (k + 1)) <= length {
			k++
		}
		return max(st_g[k][l], st_g[k][r-(1<<k)+1])
	}

	ans := math.MinInt
	for p := 1; p <= n-2; p++ {
		if left[p] >= p {
			continue
		}
		qLow := p + 1
		qHigh := dec[p]
		if qHigh > n-2 {
			qHigh = n - 2
		}
		if qLow > qHigh {
			continue
		}
		maxG := queryST_g(qLow, qHigh)
		if maxG == math.MinInt64 {
			continue
		}
		var sum int
		if left[p] > 0 {
			sum = maxG - pre[left[p]-1]
		} else {
			sum = maxG
		}
		if sum > ans {
			ans = sum
		}
	}

	if ans == math.MinInt {
		return 0
	}
	return int64(ans)
}

func minTime(s string, order []int, k int) (ans int) {
	n := len(s)
	if n == 0 {
		return -1
	}
	left, right := -1, n

	check := func(t int) bool {
		total := n * (n + 1) / 2 // 总子字符串数

		if t < 0 {
			return 0 >= k
		}

		starred := make([]bool, n)
		maxIdx := t
		if maxIdx >= n { // 防止索引越界
			maxIdx = n - 1
		}
		for i := 0; i <= maxIdx; i++ {
			pos := order[i]
			starred[pos] = true
		}

		nostevanik := starred
		_ = nostevanik

		invalid := 0
		currentLength := 0
		for i := 0; i < n; i++ {
			if !starred[i] {
				currentLength++
			} else {
				invalid += currentLength * (currentLength + 1) / 2
				currentLength = 0
			}
		}
		invalid += currentLength * (currentLength + 1) / 2

		valid := total - invalid
		return valid >= k
	}

	for left+1 < right {
		mid := left + (right-left)/2
		if check(mid) {
			right = mid
		} else {
			left = mid
		}
	}

	// 验证结果是否有效
	if right < n && check(right) {
		return right
	}
	return -1
}

func maxSumTrionic_111(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return math.MinInt64 // 或 0，但题目要求最大和，可能为负
	}

	// 前缀和
	prefix := make([]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}

	sumRange := func(l, r int) int64 {
		return int64(prefix[r+1] - prefix[l])
	}

	// 分组：记录每一段的起始位置和类型
	// 每段是极长的单调段
	type segment struct {
		start int
		end   int // [start, end]
		typ   int // 1: 递增, -1: 递减, 0: 单点
	}
	var segs []segment

	i := 0
	for i < n {
		if i == n-1 {
			// 最后一个点，单独成段（不影响）
			segs = append(segs, segment{i, i, 0})
			break
		}

		if nums[i] < nums[i+1] {
			// 开始递增段
			j := i
			for j < n-1 && nums[j] < nums[j+1] {
				j++
			}
			segs = append(segs, segment{i, j, 1})
			i = j // 下一段从 j 开始
		} else if nums[i] > nums[i+1] {
			// 开始递减段
			j := i
			for j < n-1 && nums[j] > nums[j+1] {
				j++
			}
			segs = append(segs, segment{i, j, -1})
			i = j
		} else {
			// 相等，跳过（不能出现在严格单调段中）
			i++
		}
	}

	// 现在 segs 中是所有极长单调段
	// 我们要找：三个连续的段：inc → dec → inc
	// 且满足：inc1.end == dec.start, dec.end == inc2.start
	// 并且每段长度 >=2（因为 l < p, p < q, q < r 要有内部点）

	var maxSum int64 = math.MinInt64

	for idx := 0; idx < len(segs)-2; idx++ {
		seg1 := segs[idx]   // 第一段：递增
		seg2 := segs[idx+1] // 第二段：递减
		seg3 := segs[idx+2] // 第三段：递增

		// 必须满足：seg1.end == seg2.start && seg2.end == seg3.start
		if seg1.end != seg2.start || seg2.end != seg3.start {
			continue
		}

		// 每段必须至少有两个元素，才能有分割点
		if seg1.end-seg1.start < 1 || seg2.end-seg2.start < 1 || seg3.end-seg3.start < 1 {
			continue
		}

		// 此时可以构成三段式子数组：[seg1.start, seg3.end]
		// 分割点：p = seg1.end（也是 seg2.start），q = seg2.end（也是 seg3.start）
		// 满足：l=seg1.start, p=seg1.end, q=seg2.end, r=seg3.end
		// 且 l < p < q < r（因为每段至少2个点，所以 seg1.start < seg1.end < seg2.end < seg3.end）

		total := sumRange(seg1.start, seg3.end)
		if total > maxSum {
			maxSum = total
		}
	}

	return maxSum
}

func maxSumTrionic_222(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return math.MinInt64
	}

	// 前缀和：prefix[i] = nums[0] + ... + nums[i-1]
	prefix := make([]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}

	sumRange := func(l, r int) int64 {
		return int64(prefix[r+1] - prefix[l])
	}

	var segs []struct {
		start, end, typ int
	}

	i := 0
	for i < n {
		if i == n-1 {
			segs = append(segs, struct{ start, end, typ int }{i, i, 0})
			break
		}

		if nums[i] < nums[i+1] {
			j := i
			for j < n-1 && nums[j] < nums[j+1] {
				j++
			}
			segs = append(segs, struct{ start, end, typ int }{i, j, 1})
			i = j // 下一段从 j 开始
		} else if nums[i] > nums[i+1] {
			j := i
			for j < n-1 && nums[j] > nums[j+1] {
				j++
			}
			segs = append(segs, struct{ start, end, typ int }{i, j, -1})
			i = j
		} else {
			i++ // 相等跳过
		}
	}

	var maxSum int64 = math.MinInt64
	for idx := 0; idx < len(segs)-2; idx++ {
		s1, s2, s3 := segs[idx], segs[idx+1], segs[idx+2]
		if s1.typ == 1 && s2.typ == -1 && s3.typ == 1 &&
			s1.end == s2.start && s2.end == s3.start &&
			s1.end > s1.start && s2.end > s2.start && s3.end > s3.start {
			total := sumRange(s1.start, s3.end)
			if total > maxSum {
				maxSum = total
			}
		}
	}

	return maxSum
}

func maxSumTrionic_444(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return math.MinInt64
	}

	prefix := make([]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}
	sumRange := func(l, r int) int64 {
		return int64(prefix[r+1] - prefix[l])
	}

	var maxSum int64 = math.MinInt64

	// 枚举 p 和 q
	for p := 1; p < n-2; p++ {
		if !((p == 0 || nums[p-1] < nums[p]) && (p == n-1 || nums[p] > nums[p+1])) {
			continue
		}
		for q := p + 1; q < n-1; q++ {
			if !(nums[q-1] > nums[q] && nums[q] < nums[q+1]) {
				continue
			}

			l := p
			for l > 0 && nums[l-1] < nums[l] {
				l--
			}
			r := q
			for r < n-1 && nums[r] < nums[r+1] {
				r++
			}
			validDec := true
			for i := p; i < q; i++ {
				if nums[i] <= nums[i+1] {
					validDec = false
					break
				}
			}
			if !validDec {
				continue
			}

			// 枚举所有合法的 L 和 R
			for L := l; L < p; L++ {
				for R := q + 1; R <= r; R++ {
					total := sumRange(L, R)
					if total > maxSum {
						maxSum = total
					}
				}
			}
		}
	}

	return maxSum
}


func maxSumTrionic(nums []int) int64 {
	n := len(nums)
	if n < 4 {
		return 0
	}

	incEnd := make([]int, n)
	incEnd[0] = 0
	for i := 1; i < n; i++ {
		if nums[i] > nums[i-1] {
			incEnd[i] = incEnd[i-1]
		} else {
			incEnd[i] = i
		}
	}

	decStart := make([]int, n)
	decStart[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] > nums[i+1] {
			decStart[i] = decStart[i+1]
		} else {
			decStart[i] = i
		}
	}

	incStart := make([]int, n)
	incStart[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] < nums[i+1] {
			incStart[i] = incStart[i+1]
		} else {
			incStart[i] = i
		}
	}

	pref := make([]int64, n)
	pref[0] = int64(nums[0])
	for i := 1; i < n; i++ {
		pref[i] = pref[i-1] + int64(nums[i])
	}

	logN := 0
	for (1 << logN) < n {
		logN++
	}
	if logN == 0 {
		logN = 1
	}
	st_pref := make([][]int64, logN)
	for i := range st_pref {
		st_pref[i] = make([]int64, n)
	}
	for i := 0; i < n; i++ {
		st_pref[0][i] = pref[i]
	}
	for i := 1; i < logN; i++ {
		for j := 0; j+(1<<i) <= n; j++ {
			st_pref[i][j] = max64(st_pref[i-1][j], st_pref[i-1][j+(1<<(i-1))])
		}
	}

	queryST_pref := func(l, r int) int64 {
		if l > r {
			return math.MinInt64
		}
		length := r - l + 1
		k := 0
		for (1 << (k + 1)) <= length {
			k++
		}
		return max64(st_pref[k][l], st_pref[k][r-(1<<k)+1])
	}

	maxPref := make([]int64, n)
	for i := range maxPref {
		maxPref[i] = math.MinInt64
	}
	for q := 0; q <= n-2; q++ {
		if incStart[q] >= q+1 {
			maxPref[q] = queryST_pref(q, incStart[q])
		}
	}

	st_maxPref := make([][]int64, logN)
	for i := range st_maxPref {
		st_maxPref[i] = make([]int64, n)
	}
	for i := 0; i < n; i++ {
		st_maxPref[0][i] = maxPref[i]
	}
	for i := 1; i < logN; i++ {
		for j := 0; j+(1<<i) <= n; j++ {
			st_maxPref[i][j] = max64(st_maxPref[i-1][j], st_maxPref[i-1][j+(1<<(i-1))])
		}
	}

	queryST_maxPref := func(l, r int) int64 {
		if l > r {
			return math.MinInt64
		}
		length := r - l + 1
		k := 0
		for (1 << (k + 1)) <= length {
			k++
		}
		return max64(st_maxPref[k][l], st_maxPref[k][r-(1<<k)+1])
	}

	ans := int64(math.MinInt64)
	for p := 0; p < n; p++ {
		if incEnd[p] <= p-1 && decStart[p] >= p+1 {
			qLow := p + 1
			qHigh := decStart[p]
			if qHigh > n-2 {
				qHigh = n - 2
			}
			if qLow > qHigh {
				continue
			}
			maxQ := queryST_maxPref(qLow, qHigh)
			if maxQ == math.MinInt64 {
				continue
			}
			base := int64(0)
			if incEnd[p] > 0 {
				base = pref[incEnd[p]-1]
			}
			total := maxQ - base
			if total > ans {
				ans = total
			}
		}
	}

	if ans == math.MinInt64 {
		return 0
	}
	return ans
}

func max64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
