package ptr

type BrowserHistory struct {
	history []string
	cur     int
}

func Constructor(homepage string) BrowserHistory {
	return BrowserHistory{[]string{homepage}, 0}
}

func (bh *BrowserHistory) Visit(url string) {
	bh.cur++
	bh.history = bh.history[:bh.cur]
	bh.history = append(bh.history, url)
}

func (bh *BrowserHistory) Back(steps int) string {
	bh.cur = max(0, bh.cur-steps)
	return bh.history[bh.cur]
}

func (bh *BrowserHistory) Forward(steps int) string {
	bh.cur = min(bh.cur+steps, len(bh.history)-1)
	return bh.history[bh.cur]
}
