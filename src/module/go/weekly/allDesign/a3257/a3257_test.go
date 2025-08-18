package a3257

import (
	"reflect"
	"testing"
)

func Test_resultsArray(t *testing.T) {
	type args struct {
		queries [][]int
		k       int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				queries: [][]int{{1, 2}, {3, 4}, {2, 3}, {-3, 0}},
				k:       2,
			},
			want: []int{-1, 7, 5, 3},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := resultsArray(tt.args.queries, tt.args.k); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("resultsArray() = %v, want %v", got, tt.want)
			}
		})
	}
}
