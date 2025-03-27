package ufdemo

import "sort"

type unionFind struct {
	fa []int // 代表元
	sz []int // 集合大小
	cc int   // 连通块个数
}

func newUnionFind(n int) unionFind {
	fa := make([]int, n)
	sz := make([]int, n)
	// 一开始有 n 个集合 {0}, {1}, ..., {n-1}
	// 集合 i 的代表元是自己，大小为 1
	for i := range fa {
		fa[i] = i
		sz[i] = 1
	}
	return unionFind{fa, sz, n}
}

// 返回 x 所在集合的代表元
// 同时做路径压缩，也就是把 x 所在集合中的所有元素的 fa 都改成代表元
func (u unionFind) find(x int) int {
	// 如果 fa[x] == x，则表示 x 是代表元
	if u.fa[x] != x {
		u.fa[x] = u.find(u.fa[x]) // fa 改成代表元
	}
	return u.fa[x]
}

// 判断 x 和 y 是否在同一个集合
func (u unionFind) same(x, y int) bool {
	// 如果 x 的代表元和 y 的代表元相同，那么 x 和 y 就在同一个集合
	// 这就是代表元的作用：用来快速判断两个元素是否在同一个集合
	return u.find(x) == u.find(y)
}

// 把 from 所在集合合并到 to 所在集合中
// 返回是否合并成功
func (u *unionFind) merge(from, to int) bool {
	x, y := u.find(from), u.find(to)
	if x == y { // from 和 to 在同一个集合，不做合并
		return false
	}
	u.fa[x] = y        // 合并集合。修改后就可以认为 from 和 to 在同一个集合了
	u.sz[y] += u.sz[x] // 更新集合大小（注意集合大小保存在代表元上）
	// 无需更新 sz[x]，因为我们不用 sz[x] 而是用 sz[find(x)] 获取集合大小，但 find(x) == y，我们不会再访问 sz[x]
	u.cc-- // 成功合并，连通块个数减一
	return true
}

// 返回 x 所在集合的大小
func (u unionFind) size(x int) int {
	return u.sz[u.find(x)] // 集合大小保存在代表元上
}

// 3493
func numberOfComponents(properties [][]int, k int) int {
	n := len(properties)
	sets := make([]map[int]bool, n)
	for i, a := range properties {
		// 对每一个i的列表放到对应的set里面
		sets[i] = map[int]bool{}
		for _, x := range a {
			sets[i][x] = true
		}
	}
	u := newUnionFind(n)
	for i, a := range sets {
		for j, b := range sets[:i] {
			// 求两个set的交集的个数
			cnt := 0
			for x := range b {
				if a[x] {
					cnt++
				}
			}
			// 如果交集大于k 满足题意
			if cnt >= k {
				u.merge(i, j)
			}
		}
	}
	return u.cc
}

// 990
func equationsPossible(equations []string) bool {
	u := newUnionFind(26)
	for _, x := range equations {
		start, curType, end := x[0], x[1:3], x[3]
		// 如果是相等的 则认为它们属于一个集合
		if curType == "==" {
			u.merge(int(start-'a'), int(end-'a'))
		}
	}
	for _, x := range equations {
		start, curType, end := x[0], x[1:3], x[3]
		if curType == "!=" {
			// 如果不相等  检查不等关系是否破坏了相等关系的连通性。
			if u.same(int(start-'a'), int(end-'a')) {
				return false
			}
		}
	}
	return true
}

// 721
func accountsMerge(accounts [][]string) [][]string {
	emailToIndex := make(map[string]int)
	emailToName := make(map[string]string)
	index := 0
	for _, account := range accounts {
		name := account[0]
		for _, email := range account[1:] {
			if _, ok := emailToIndex[email]; !ok {
				emailToIndex[email] = index
				emailToName[email] = name
				index++
			}
		}
	}

	uf := newUnionFind(index)
	for _, account := range accounts {
		firstIndex := emailToIndex[account[1]]
		for _, email := range account[2:] {
			uf.merge(emailToIndex[email], firstIndex)
		}
	}

	indexToEmails := make(map[int][]string)
	for email, index := range emailToIndex {
		rootIndex := uf.find(index)
		indexToEmails[rootIndex] = append(indexToEmails[rootIndex], email)
	}

	var merged [][]string
	for _, emails := range indexToEmails {
		sort.Strings(emails)
		name := emailToName[emails[0]]
		account := append([]string{name}, emails...)
		merged = append(merged, account)
	}

	return merged
}
