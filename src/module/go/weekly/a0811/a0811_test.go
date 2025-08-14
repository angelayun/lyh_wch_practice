package a0811

import (
	"reflect"
	"testing"
)

func Test_checkEqualPartitions(t *testing.T) {
	type args struct {
		nums   []int
		target int64
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				target: 24,
				nums:   []int{3, 1, 6, 8, 4},
			},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := checkEqualPartitions(tt.args.nums, tt.args.target); got != tt.want {
				t.Errorf("checkEqualPartitions() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minAbsDiff(t *testing.T) {
	type args struct {
		grid [][]int
		k    int
	}
	tests := []struct {
		name string
		args args
		want [][]int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				grid: [][]int{{1, 8}, {3, -1}},
				k:    2,
			},
			want: [][]int{{2}},
		}, */
		{
			name: "222",
			args: args{
				grid: [][]int{{1, -2, 3}, {2, 3, 5}},
				k:    2,
			},
			want: [][]int{{1, 2}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minAbsDiff(tt.args.grid, tt.args.k); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("minAbsDiff() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_findSubstring(t *testing.T) {
	type args struct {
		s     string
		words []string
	}
	tests := []struct {
		name    string
		args    args
		wantAns []int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				s:     "barfoothefoobarman",
				words: []string{"foo", "bar"},
			},
			wantAns: []int{0, 9},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := findSubstring(tt.args.s, tt.args.words); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("findSubstring() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_resultingString(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				s: "adcb",
			},
			want: "",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := resultingString(tt.args.s); got != tt.want {
				t.Errorf("resultingString() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxIncreasingSubarrays(t *testing.T) {
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
				nums: []int{
					2, 5, 7, 8, 9, 2, 3, 4, 3, 1,
				},
			},
			wantAns: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := maxIncreasingSubarrays(tt.args.nums); gotAns != tt.wantAns {
				t.Errorf("maxIncreasingSubarrays() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_isPowerOfThree(t *testing.T) {
	type args struct {
		n int
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				n: 45,
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isPowerOfThree(tt.args.n); got != tt.want {
				t.Errorf("isPowerOfThree() = %v, want %v", got, tt.want)
			}
		})
	}
}
