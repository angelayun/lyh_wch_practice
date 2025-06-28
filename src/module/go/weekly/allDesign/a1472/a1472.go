package a1472

type BrowserHistory struct {
	cur     int
	history []string
}

func Constructor(homepage string) BrowserHistory {
	return BrowserHistory{history: []string{homepage}, cur: 0}
}

func (this *BrowserHistory) Visit(url string) {
	this.cur++
	this.history = this.history[:this.cur]
	this.history = append(this.history, url)
}

func (this *BrowserHistory) Back(steps int) string {
	op := max(0, this.cur-steps)
	this.cur = op
	return this.history[op]
}

func (this *BrowserHistory) Forward(steps int) string {
	op := min(len(this.history), this.cur+steps)
	this.cur = op
	return this.history[op]
}
