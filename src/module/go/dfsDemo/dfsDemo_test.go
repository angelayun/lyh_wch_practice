package dfsdemo

import (
	"fmt"
	"testing"
)

func Test_allPathsSourceTarget(t *testing.T) {
	res := allPathsSourceTarget([][]int{{4, 3, 1}, {3, 2, 4}, {3}, {4}, {}})
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
