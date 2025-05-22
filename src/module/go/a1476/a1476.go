package a1476

type BrowserHistory struct {
	history []string
	// 当前是在哪个索引位置
	cur int
}

func Constructor(homepage string) BrowserHistory {
	return BrowserHistory{history: []string{homepage}, cur: 0}
}

func (this *BrowserHistory) Visit(url string) {
	this.cur++
	// 这句话是为了后退又前进的场景下把多余的给删除掉
	this.history = this.history[:this.cur]
	this.history = append(this.history, url)
}

func (this *BrowserHistory) Back(steps int) string {
	op := max(0, this.cur-steps)
	this.cur = op
	return this.history[op]
}

func (this *BrowserHistory) Forward(steps int) string {
	op := min(len(this.history)-1, this.cur+steps)
	this.cur = op
	return this.history[op]
}

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * obj := Constructor(homepage);
 * obj.Visit(url);
 * param_2 := obj.Back(steps);
 * param_3 := obj.Forward(steps);
 */
