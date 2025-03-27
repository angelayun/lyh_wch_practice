package grouppoint

func maxPower1(s string) (ans int) {
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func checkZeroOnes1(s string) bool {
	cnt := [2]int{}
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		index := int(s[i] - '0')
		cnt[index] = max(cnt[index], end-i)
		i = end
	}
	return cnt[1] > cnt[0]
}
func longestContinuousSubstring1(s string) (ans int) {
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[end-1]+1 {
			end++
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func hasSpecialSubstring1(s string, k int) bool {
	n := len(s)
	i := 0
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := end - i
		if cnt == k {
			return true
		}
		i = end
	}
	return false
}
func makeFancyString2(s string) string {
	n := len(s)
	i := 0
	ans := []byte{}
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := min(end-i, 2)
		for cnt > 0 {
			ans = append(ans, s[i])
			cnt--
		}
		i = end
	}
	return string(ans)
}
func makeFancyString1(s string) string {
	n := len(s)
	i := 0
	ans := []byte{}
	for i < n {
		end := i + 1
		for end < n && s[end] == s[i] {
			end++
		}
		cnt := end - i
		if cnt < 3 {
			ans = append(ans, s[i:end]...)
		} else {
			ans = append(ans, s[i:i+2]...)
		}
		i = end
	}
	return string(ans)
}
func findLengthOfLCIS1(nums []int) (ans int) {
	n := len(nums)
	i := 0
	for i < n {
		end := i + 1
		for end < n && nums[end] > nums[end-1] {
			end++
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func maxTurbulenceSize_garb(nums []int) (ans int) {
	n := len(nums)
	i := 1
	for i < n {
		end := i
		// 后面一个数大于前面一个数
		flag := true
		if nums[end] == nums[end-1] {
			i++
			continue
		} else if nums[end] < nums[end-1] {
			flag = false
		}
		for end < n && ((flag && nums[end] > nums[end-1]) || (!flag && nums[end] < nums[end-1])) {
			end++
			flag = !flag
		}
		cnt := end - i
		ans = max(ans, cnt)
		i = end
	}
	return
}
func maxTurbulenceSize2(arr []int) int {
	ans := 0
	n := len(arr)
	i := 0
	for i < n {
		var flag bool
		if i+1 < n && arr[i+1] > arr[i] {
			flag = true
		} else if i+1 < n && arr[i+1] < arr[i] {
			flag = false
		} else {
			if 1 > ans {
				ans = 1
			}
			i++
			continue
		}
		cur := 2
		i++
		for i+1 < n && arr[i+1] != arr[i] && ((arr[i+1] < arr[i]) == flag) {
			flag = !flag
			cur++
			i++
		}
		if cur > ans {
			ans = cur
		}
	}
	return ans
}
func maxTurbulenceSize1(arr []int) int {
	ans := 0
	n := len(arr)
	i := 0
	for i < n {
		var flag bool
		if i+1 < n && arr[i+1] > arr[i] {
			flag = true
		} else if i+1 < n && arr[i+1] < arr[i] {
			flag = false
		} else {
			if 1 > ans {
				ans = 1
			}
			i++
			continue
		}
		end := i + 2
		for end+1 < n && arr[end-1] != arr[end] && ((arr[end-1] < arr[end]) == flag) {
			flag = !flag
			end++
		}
		if end-i > ans {
			ans = end - i
		}
		i = end
	}
	return ans
}

// 2110
func getDescentPeriods1(prices []int) (ans int64) {
	n := len(prices)
	// ans = int64(n)
	i := 0
	for i < n {
		i0 := i
		for i++; i < n && prices[i] == prices[i-1]-1; i++ {
		}
		cnt := i - i0
		ans += int64(cnt * (i - i0 + 1) / 2)
	}
	return ans
}
func getDescentPeriods(prices []int) (ans int64) {
	for i, n := 0, len(prices); i < n; i++ {
		i0 := i
		for i++; i+1 < n && prices[i] == prices[i-1]-1; i++ {
		}
		cnt := i - i0
		ans += int64(cnt) * int64(cnt+1) / 2
	}
	return
}
func maxPower(s string) (ans int) {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt)
	}
	return
}
func checkZeroOnes(s string) bool {
	count := [2]int{}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		index := int(s[i0] - '0')
		count[index] = max(count[index], cnt)
	}
	return count[1] > count[0]
}
func longestContinuousSubstring(s string) (ans int) {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]+1; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt)
	}
	return
}
func hasSpecialSubstring(s string, k int) bool {
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		if cnt == k {
			return true
		}
	}
	return false
}
func makeFancyString(s string) string {
	ans := []byte{}
	for i, n := 0, len(s); i < n; {
		i0 := i
		for i++; i < n && s[i] == s[i-1]; i++ {
		}
		cnt := i - i0
		if cnt < 3 {
			ans = append(ans, s[i0:i]...)
		} else {
			ans = append(ans, s[i0:i0+2]...)
		}
	}
	return string(ans)
}
func findLengthOfLCIS(nums []int) (ans int) {
	for i, n := 0, len(nums); i < n; {
		i0 := i
		for i++; i < n && nums[i] > nums[i-1]; i++ {
		}
		cnt := i - i0
		ans = max(ans, cnt)
	}
	return
}

// 978
func maxTurbulenceSize(nums []int) (ans int) {
	ans = 1
	for i, n := 0, len(nums); i < n; {
		i0 := i
		i++
		if i < n && nums[i-1] == nums[i] {
			continue
		}
		flag := false
		// 后一个比前一个大flag为true
		if i < n {
			if nums[i] > nums[i-1] {
				flag = true
			} else {
				flag = false
			}
			for i++; i < n && nums[i] != nums[i-1] &&
				(flag && nums[i] < nums[i-1] ||
					(!flag && nums[i] > nums[i-1])); i++ {
				flag = !flag
			}
			cnt := i - i0
			ans = max(ans, cnt)
			i -= 1
		}
	}
	return
}

// 228
func summaryRanges(nums []int) []string {
	ans =[]string{}
	for i, n := 0,len(nums); i < n ;{
		i0:=i
		for i++; i<n && nums[i]=nums[i-1]+1;i++{
		}
		cnt:=i-i0
		if cnt>1{
			ans=append(ans,i0+"-->"+i)
		} else{
			ans=append(ans,i0)
		}
	}
	return ans

}
