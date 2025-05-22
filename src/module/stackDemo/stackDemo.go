package stackdemo

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func buildArray(target []int, n int) (ans []string) {
	j := 0
	m := len(target)
	for i := 1; i <= n; i++ {
		if j >= m {
			break
		}
		cur := target[j]
		if i == cur {
			ans = append(ans, "Push")
			j++
		} else {
			ans = append(ans, "Push", "Pop")
		}
	}
	return
}
func backspaceCompare(s string, t string) bool {
	handler := func(s string) string {
		st := []byte{}
		for _, ch := range s {
			if ch == '#' {
				if len(st) > 1 {
					st = st[:len(st)-1]
				}
			} else {
				st = append(st, byte(ch))
			}
		}
		return string(st)
	}
	if handler(s) == handler(t) {
		return true
	}
	return false
}
func calPoints(operations []string) (ans int) {
	st := []int{}

	for _, op := range operations {
		if op == "C" {
			ans -= st[len(st)-1]
			st = st[:len(st)-1]
		} else {
			if op == "+" {
				st = append(st, st[len(st)-1]+st[len(st)-2])
			} else if op == "D" {
				st = append(st, st[len(st)-1]*2)
			} else {
				cur, _ := strconv.Atoi(op)
				st = append(st, cur)
			}
			ans += st[len(st)-1]
		}
	}
	return
}
func removeStars(s string) string {
	st := []byte{}
	for _, ch := range s {
		if ch == '*' {
			if len(st) > 0 {
				st = st[:len(st)-1]
			}
		} else {
			st = append(st, byte(ch))
		}
	}
	return string(st)
}

func validateStackSequences11(pushed []int, popped []int) bool {
	st := []int{}
	m, n := len(pushed), len(popped)
	i, j := 0, 0
	for i < m {
		if pushed[i] == popped[j] {
			j++
			i++
		} else if len(st) > 0 && j < n && popped[j] == st[len(st)-1] {
			j++
			st = st[:len(st)-1]
		} else {
			st = append(st, pushed[i])
			i++

		}
	}

	for len(st) > 0 && j < n && popped[j] == st[len(st)-1] {
		j++
		st = st[:len(st)-1]
	}
	fmt.Println(j, st)
	return j == m && len(st) == 0
}

func validateStackSequences(pushed []int, popped []int) bool {
	st := []int{}
	// m := len(popped)
	j := 0
	for _, ch := range pushed {
		st = append(st, ch)
		// && j < m
		for len(st) > 0 && st[len(st)-1] == popped[j] {
			st = st[:len(st)-1]
			j++
		}
	}
	// j == m &&
	return len(st) == 0
}

func calculateScore(s string) int64 {
	st := [26][]int{}
	ans := 0
	for i, ch := range s {
		index := ch - 'a'
		mirIndex := 25 - index
		if len(st[mirIndex]) > 0 {
			ans += i - st[mirIndex][len(st[mirIndex])-1]
			st[mirIndex] = st[mirIndex][:len(st[mirIndex])-1]
		} else {
			st[index] = append(st[index], i)
		}
	}
	return int64(ans)
}
func simplifyPath222(path string) string {
	path += "/"
	n := len(path)
	st := []string{}
	i := 0
	for i < n && path[i] == '/' {
		i++
	}
	pre := i
	for i := 1; i < n; i++ {
		ch := path[i]
		if ch == '/' || i == n-1 {
			endI := i
			// if i == n-1 {
			// 	endI = i + 1
			// }
			for i+1 < n && path[i+1] == ch {
				i++
			}
			cur := path[pre+1 : endI]
			pre = i
			if cur == ".." {
				if len(st) > 0 {
					st = st[:len(st)-1]
				}
			} else if cur != "." {
				st = append(st, cur)
			}
		}
	}
	return "/" + strings.Join(st, "/")
}
func simplifyPath(path string) string {
	st := []string{}
	for _, s := range strings.Split(path, "/") {
		if s == "" || s == "." {
			continue
		} else if s != ".." {
			st = append(st, s)
		} else if len(st) > 0 {
			st = st[:len(st)-1]
		}
	}
	return "/" + strings.Join(st, "/")
}
func clearStars222(s string) string {
	st := [26][]int{}
	n := len(s)
	deleteIds := make([]bool, n)
	for i, ch := range s {
		if ch == '*' {
			for j, ls := range st {
				if len(ls) > 0 {
					k := ls[len(ls)-1]
					deleteIds[k] = true
					st[j] = ls[:len(ls)-1]
					break
				}
			}
			deleteIds[i] = true
		} else {
			st[ch-'a'] = append(st[ch-'a'], i)
		}
	}
	ans := []byte{}
	for i, ch := range s {
		if !deleteIds[i] {
			ans = append(ans, byte(ch))
		}
	}
	return string(ans)
}

func clearStars111(S string) string {
	s := []byte(S)
	st := [26][]int{}
	for i, ch := range s {
		if ch != '*' {
			for j, ls := range st {
				if len(ls) > 0 {
					k := ls[len(ls)-1]
					s[k] = '*'
					st[j] = ls[:len(ls)-1]
					break
				}
			}
		} else {
			st[ch-'a'] = append(st[ch-'a'], i)
		}
	}
	ans := []byte{}
	for _, ch := range s {
		if ch != '*' {
			ans = append(ans, byte(ch))
		}
	}
	return string(ans)
}

func clearStars(s string) string {
	st := [26][]int{}
	for i, ch := range s {
		if ch == '*' {
			for j, ls := range st {
				if len(ls) > 0 {
					st[j] = ls[:len(ls)-1]
					break
				}
			}
		} else {
			st[ch-'a'] = append(st[ch-'a'], i)
		}
	}
	// 把所有没有被删除的ids找出来
	ids := []int{}
	for _, ls := range st {
		for _, i := range ls {
			ids = append(ids, i)
		}
	}
	// 把id排序
	slices.Sort(ids)
	// ids里面保存的就是没被删除的下标
	ans := make([]byte, len(ids))
	for i, j := range ids {
		ans[i] = s[j]
	}
	return string(ans)
}
