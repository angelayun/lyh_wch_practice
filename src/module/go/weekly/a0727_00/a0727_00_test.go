package a072700

import "testing"

func Test_minJumps(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				// nums: []int{1, 2, 4, 6},
				nums: []int{1, 4, 6, 2},
			},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := minJumps(tt.args.nums); gotAns != tt.wantAns {
				t.Errorf("minJumps() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
