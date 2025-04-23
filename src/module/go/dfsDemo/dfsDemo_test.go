package dfsdemo

import (
	"fmt"
	"testing"
)

func Test_allPathsSourceTarget(t *testing.T) {
	// res := countPalindromes("103301")
	res := countPalindromes("12345")

	// res := numberOfSubsequences([]int{1, 2, 3, 4, 3, 6, 1})
	// res := eventualSafeNodes([][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}})
	// res := allPathsSourceTarget([][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}})
	// res := trap([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1})
	fmt.Println(res)
	/* type args struct {
		graph [][]int
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
			if gotAns := allPathsSourceTarget(tt.args.graph); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("allPathsSourceTarget() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	} */
}

func Test_trap(t *testing.T) {
	type args struct {
		height []int
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
			if gotAns := trap(tt.args.height); gotAns != tt.wantAns {
				t.Errorf("trap() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
