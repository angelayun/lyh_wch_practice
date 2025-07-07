package a03

import "testing"

func Test_minTime(t *testing.T) {
	type args struct {
		n     int
		edges [][]int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		/* {
			name: "11",
			args: args{
				n:     3,
				edges: [][]int{{0, 1, 0, 1}, {1, 2, 2, 5}},
			},
			want: 3,
		}, */
		/* {
			name:"22",
			args: args{
				n:4,
				edges: [][]int{{0,1,0,3},{1,3,7,8},{0,2,1,5},{2,3,4,7}},

			},
			want: 5,
		}, */
		{
			name: "333",
			args: args{
				n:     3,
				edges: [][]int{{1, 0, 1, 3}, {1, 2, 3, 5}},
			},
			want: -1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minTime(tt.args.n, tt.args.edges); got != tt.want {
				t.Errorf("minTime() = %v, want %v", got, tt.want)
			}
		})
	}
}
