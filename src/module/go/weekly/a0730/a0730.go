package a0730

func gcd(a, b int) int {
	for a != 0 {
		a, b = b%a, a
	}
	return b
}

func countTrapezoids(points [][]int) (ans int) {
	type pair struct{ x, y int }
	n := len(points)
	for i := 0; i < n-1; i++ {
		x, y := points[i][0], points[i][1]
		cnt := map[pair][][2]pair{}
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dx, dy := x2-x, y2-y
			if dx == 0 {
				dy = 1
			} else if dy == 0 {
				dx = 1
			}
			g := gcd(dx, dy)
			cur := pair{dx / g, dy / g}
			// cnt[cur]++
			cnt[cur] = append(cnt[cur], [2]pair{pair{x, y}, pair{x2, y2}})
			if ls, ok := cnt[cur]; ok {
				for _, item := range ls {
					lastX, lastY := item[0].x, item[0].y
					lastX2, lastY2 := item[1].x, item[1].y
					if lastX != x && lastY != y && lastX2 != x2 && lastY2 != y2 {
						ans++
					}
				}
			}
		}
	}
	return ans + 1
}
