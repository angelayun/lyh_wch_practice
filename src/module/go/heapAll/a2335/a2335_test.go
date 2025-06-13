package a2335

import (
	"fmt"
	"testing"
)

func Test_fillCups(t *testing.T) {
	res := fillCups([]int{1, 4, 2})
	fmt.Println(res)
	/* type args struct {
		amount []int
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
			if gotAns := fillCups(tt.args.amount); gotAns != tt.wantAns {
				t.Errorf("fillCups() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}
