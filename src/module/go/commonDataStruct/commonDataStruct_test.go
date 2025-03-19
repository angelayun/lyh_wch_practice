package commondatastruct

import (
	"fmt"
	"testing"
)

func Test_minimumCardPickup(t *testing.T) {
	// res := minimumCardPickup([]int{3, 4, 2, 3, 4, 7})
	// res := minimumCardPickup([]int{3, 4, 2, 3, 4, 7})
	// res := countBeautifulPairs([]int{11, 21, 12})
	res:=calculateScore("eockppxdqclkhjgvnw")
	fmt.Println(res)
	/* type args struct {
		cards []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := minimumCardPickup(tt.args.cards); gotAns != tt.wantAns {
				t.Errorf("minimumCardPickup() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
