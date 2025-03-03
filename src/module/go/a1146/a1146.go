package a1146

import "sort"

type pair struct{ snapId, val int }
type SnapshotArray struct {
	curSnapId int
	history   map[int][]pair
	// 每个index的历史修改记录
}

func Constructor(length int) SnapshotArray {
	return SnapshotArray{history: map[int][]pair{}}
}

func (sa *SnapshotArray) Set(index int, val int) {
	sa.history[index] = append(sa.history[index], pair{sa.curSnapId, val})
}

func (sa *SnapshotArray) Snap() int {
	sa.curSnapId++
	return sa.curSnapId - 1
}

func (sa *SnapshotArray) Get(index int, snap_id int) int {
	h := sa.history[index]
	j:=sort.Search(len(h))
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * obj := Constructor(length);
 * obj.Set(index,val);
 * param_2 := obj.Snap();
 * param_3 := obj.Get(index,snap_id);
 */
