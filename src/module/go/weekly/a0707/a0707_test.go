package a0707

import "testing"

func Test_maxEvents(t *testing.T) {
	type args struct {
		events [][]int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		/* {
			name: "Example 1",
			args: args{
				events: [][]int{{1, 2}, {2, 3}, {3, 4}},
			},
			want: 3,
		},
		{
			name: "Example 2",
			args: args{
				events: [][]int{{1, 2}, {2, 3}, {3, 4}, {1, 2}},
			},
			want: 4,
		}, */
		{
			name: "Example 3",
			args: args{
				events: [][]int{{1, 2}, {2, 2}, {3,3},{3, 4}, {3,4}},
			},
			want: 4,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxEvents(tt.args.events); got != tt.want {
				t.Errorf("maxEvents() = %v, want %v", got, tt.want)
			}
		})
	}
}
