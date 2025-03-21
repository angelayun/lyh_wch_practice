package commondatastruct

import (
	"fmt"
	"testing"
)

func Test_minimumCardPickup(t *testing.T) {
	res:=subarraySum([]int{1,1,1},2)
	// res := numSubarraysWithSum([]int{1, 0, 1, 0, 1}, 2)
	// res := minimumCardPickup([]int{3, 4, 2, 3, 4, 7})
	// res := minimumCardPickup([]int{3, 4, 2, 3, 4, 7})
	// res := countBeautifulPairs([]int{11, 21, 12})
	// res:=calculateScore("eockppxdqclkhjgvnw")
	// res := exclusiveTime(1, []string{"0:start:0", "0:start:2", "0:end:5", "0:start:6", "0:end:6", "0:end:7"})
	// res := exclusiveTime(2, []string{"0:start:0", "1:start:2", "1:end:5", "0:end:6"})
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
