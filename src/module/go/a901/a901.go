package a901

import "math"

type pair struct {
	day   int
	price int
}
type StockSpanner struct {
	st     []pair
	curDay int
}

func Constructor() StockSpanner {
	return StockSpanner{[]pair{{-1, math.MaxInt}}, -1}
}

func (s *StockSpanner) Next(price int) int {
	for price >= s.st[len(s.st)-1].price {
		s.st = s.st[:len(s.st)-1]
	}
	s.curDay++
	s.st = append(s.st, pair{s.curDay, price})
	return s.curDay - s.st[len(s.st)-2].day
}
