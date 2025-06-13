package gridchart

import (
	"fmt"
	"testing"
)

func Test_ballGame(t *testing.T) {
	// res := ballGame(4, []string{"..E.", ".EOW", "..W."})
	// res := longestPalindrome([]string{"lc", "cl", "gg"})
	// res := watchedVideosByFriends([][]string{{"A", "B"}, {"C"}, {"B", "C"}, {"D"}}, [][]int{{1, 2}, {0, 3}, {0, 3}, {1, 2}}, 0, 1)
	// res := minIncrements(7, []int{1, 5, 2, 2, 3, 3, 1})
	// res := minimumReplacement([]int{3, 9, 3})
	// res := minimumReplacement([]int{5, 50, 12})
	// res := longestSubsequence("1001010", 5)
	// res := minMoves([]string{"LS", "RL"}, 4)
	// res := maximumSetSize([]int{1, 2, 3, 4, 5, 6}, []int{2, 3, 4, 5, 6, 7})
	// res := lexicalOrder(13)
	// res := countPartitions([]int{9, 4, 1, 3, 7}, 4)
	// res := countPartitions([]int{3, 3, 4}, 0)
	// res := canMakeEqual([]int{1, -1, 1, -1, 1}, 3)
	// res := canMakeEqual([]int{-1, -1, -1, 1, 1, 1}, 5)
	// res := canMakeEqual([]int{1, -1, 1}, 2)
	res := maxSumDistinctTriplet([]int{1, 2, 1, 3, 2}, []int{5, 3, 4, 6, 2})
	fmt.Println(res)
	/* type args struct {
		num   int
		plate []string
	}
	tests := []struct {
		name    string
		args    args
		wantAns [][]int
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := ballGame(tt.args.num, tt.args.plate); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("ballGame() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
