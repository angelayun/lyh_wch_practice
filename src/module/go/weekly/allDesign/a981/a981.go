package a981

import "sort"

type pair struct {
	timestamp int
	value     string
}
type TimeMap struct {
	history map[string][]pair
}

func Constructor() TimeMap {
	return TimeMap{history: map[string][]pair{}}
}

func (this *TimeMap) Set(key string, value string, timestamp int) {
	this.history[key] = append(this.history[key], pair{timestamp, value})
}

func (this *TimeMap) Get(key string, timestamp int) string {
	ls := this.history[key]
	j := sort.Search(len(ls), func(i int) bool {
		return ls[i].timestamp > timestamp
	}) - 1
	if j>=0{
		return ls[j].value
	}
	return ""
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Set(key,value,timestamp);
 * param_2 := obj.Get(key,timestamp);
 */
