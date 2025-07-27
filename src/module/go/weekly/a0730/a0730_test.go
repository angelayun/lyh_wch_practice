package a0730

import "testing"

func Test_countTrapezoids(t *testing.T) {
	type args struct {
		points [][]int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{points: [][]int{
				{1, 0},
				{2, 0},
				{3, 0},
				{2, 2},
				{3, 2},
			}},
			wantAns: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := countTrapezoids(tt.args.points); gotAns != tt.wantAns {
				t.Errorf("countTrapezoids() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
