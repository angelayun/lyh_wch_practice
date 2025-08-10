package a0806

import (
	"reflect"
	"testing"
)

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
		{
			name:    "111",
			args:    args{height: []int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}},
			wantAns: 6,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := trap(tt.args.height); gotAns != tt.wantAns {
				t.Errorf("trap() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_mergeArrays(t *testing.T) {
	type args struct {
		nums1 [][]int
		nums2 [][]int
	}
	tests := []struct {
		name    string
		args    args
		wantAns [][]int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				nums1: [][]int{
					{1, 2},
					{2, 3},
					{4, 5},
				},
				nums2: [][]int{
					{1, 4},
					{3, 2},
					{4, 1},
				},
			},
		}, */
		{
			name: "222",
			args: args{
				nums1: [][]int{
					{2, 4},
					{3, 6},
					{5, 5},
				},
				nums2: [][]int{
					{1, 4},
					{3, 2},
					{4, 1},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := mergeArrays(tt.args.nums1, tt.args.nums2); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("mergeArrays() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_breakfastNumber(t *testing.T) {
	type args struct {
		staple []int
		drinks []int
		x      int
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
				staple: []int{10, 20, 5},
				drinks: []int{5, 5, 2},
				x:      15,
			},
			wantAns: 6,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := breakfastNumber(tt.args.staple, tt.args.drinks, tt.args.x); gotAns != tt.wantAns {
				t.Errorf("breakfastNumber() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_maxDistance(t *testing.T) {
	type args struct {
		nums1 []int
		nums2 []int
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
				nums1: []int{55, 30, 5, 4, 2},
				nums2: []int{100, 20, 10, 10, 5},
			},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := maxDistance(tt.args.nums1, tt.args.nums2); gotAns != tt.wantAns {
				t.Errorf("maxDistance() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_smallestDifference(t *testing.T) {
	type args struct {
		a []int
		b []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				a: []int{1, 3, 15, 11, 2},
				b: []int{23, 127, 235, 19, 8},
			},
			want: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := smallestDifference(tt.args.a, tt.args.b); got != tt.want {
				t.Errorf("smallestDifference() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxSum(t *testing.T) {
	type args struct {
		nums1 []int
		nums2 []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				nums1: []int{2, 4, 5, 8, 10},
				nums2: []int{4, 6, 8, 9},
			},
			want: 30,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxSum(tt.args.nums1, tt.args.nums2); got != tt.want {
				t.Errorf("maxSum() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_canMakeSubsequence(t *testing.T) {
	type args struct {
		str1 string
		str2 string
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
				str1: "abc",
				str2: "ad",
			},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := canMakeSubsequence(tt.args.str1, tt.args.str2); got != tt.want {
				t.Errorf("canMakeSubsequence() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_camelMatch(t *testing.T) {
	type args struct {
		queries []string
		pattern string
	}
	tests := []struct {
		name string
		args args
		want []bool
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{
				queries: []string{"FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"},
				pattern: "FB",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := camelMatch(tt.args.queries, tt.args.pattern); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("camelMatch() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_threeSumMulti(t *testing.T) {
	type args struct {
		arr    []int
		target int
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
				arr:    []int{1, 1, 2, 2, 3, 3, 4, 4, 5, 5},
				target: 8,
			},
			wantAns: 20,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := threeSumMulti(tt.args.arr, tt.args.target); gotAns != tt.wantAns {
				t.Errorf("threeSumMulti() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
