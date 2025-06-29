package a1146

import (
	"sort"
)

type pair struct {
	snapId, val int
}
type SnapshotArray struct {
	history   map[int][]pair
	curSnapId int
}

func Constructor(length int) SnapshotArray {
	return SnapshotArray{history: map[int][]pair{}}
}

func (this *SnapshotArray) Set(index int, val int) {
	this.history[index] = append(this.history[index], pair{this.curSnapId, val})
}

func (this *SnapshotArray) Snap() int {
	this.curSnapId++
	return this.curSnapId - 1
}

func (this *SnapshotArray) Get(index int, snap_id int) int {
	ls := this.history[index]
	j := sort.Search(len(ls), func(i int) bool {
		return ls[i].snapId >= snap_id
	}) - 1
	if j >= 0 {
		return ls[j].val
	}
	return 0
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * obj := Constructor(length);
 * obj.Set(index,val);
 * param_2 := obj.Snap();
 * param_3 := obj.Get(index,snap_id);
 */
