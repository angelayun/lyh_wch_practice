package a0629

import (
	"reflect"
	"testing"
)

func Test_numSubseq(t *testing.T) {
	type args struct {
		nums   []int
		target int
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
			if gotAns := numSubseq(tt.args.nums, tt.args.target); gotAns != tt.wantAns {
				t.Errorf("numSubseq() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_partitionString(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{
				s: "abbccccd",
			},
			want: []string{"a", "b", "bc", "c", "cc", "d"},
		},
		{
			name: "示例2",
			args: args{
				s: "aaaa",
			},
			want: []string{"a", "aa"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := partitionString(tt.args.s); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("partitionString() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_longestCommonPrefix(t *testing.T) {
	type args struct {
		words []string
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{words: []string{"jump", "run", "run", "jump", "run"}},
			want: []int{3, 0, 0, 3, 3},
		},
		{
			name: "示例2",
			args: args{words: []string{"dog", "racer", "car"}},
			want: []int{0, 0, 0},
		},
		{
			name: "示例3",
			args: args{words: []string{"f", "cfe", "feab", "fcc", "cdfda", "fcec", "afae", "cdeb", "dc", "bffd", "edabe"}},
			want: []int{1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 1},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := longestCommonPrefix(tt.args.words); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("longestCommonPrefix() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minXor(t *testing.T) {
	type args struct {
		nums []int
		k    int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{
				nums: []int{1, 2, 3},
				k:    2,
			},
			want: 1,
		},
		{
			name: "示例2",
			args: args{
				nums: []int{2, 3, 3, 2},
				k:    3,
			},
			want: 2,
		},
		{
			name: "示例3",
			args: args{
				nums: []int{1, 1, 2, 3, 1},
				k:    2,
			},
			want: 0,
		},
		{
			name: "示例4",
			args: args{
				nums: []int{331, 307, 121, 266, 397, 451, 279, 305},
				k:    4,
			},
			want: 266,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minXor(tt.args.nums, tt.args.k); got != tt.want {
				t.Errorf("minXor() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maximumRemovals(t *testing.T) {
	type args struct {
		s         string
		p         string
		removable []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		// TODO: Add test cases.
		{name: "示例1",
			args: args{s: "abcacb", p: "ab", removable: []int{3, 1, 0}},
			want: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maximumRemovals(tt.args.s, tt.args.p, tt.args.removable); got != tt.want {
				t.Errorf("maximumRemovals() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_goodIndices(t *testing.T) {
	type args struct {
		nums []int
		k    int
	}
	tests := []struct {
		name    string
		args    args
		wantAns []int
	}{
		// TODO: Add test cases.
		{
			name:    "示例1",
			args:    args{nums: []int{2, 1, 1, 1, 3, 4, 1}, k: 2},
			wantAns: []int{2, 3},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := goodIndices(tt.args.nums, tt.args.k); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("goodIndices() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_goodDaysToRobBank(t *testing.T) {
	type args struct {
		nums []int
		k    int
	}
	tests := []struct {
		name    string
		args    args
		wantAns []int
	}{
		// TODO: Add test cases.
		{
			name:    "示例1",
			args:    args{nums: []int{1, 2, 3, 4}, k: 1},
			wantAns: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := goodDaysToRobBank(tt.args.nums, tt.args.k); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("goodDaysToRobBank() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_addBinary(t *testing.T) {
	type args struct {
		a string
		b string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{
			name: "示例1",
			args: args{a: "11", b: "1"},
			want: "100",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := addBinary(tt.args.a, tt.args.b); got != tt.want {
				t.Errorf("addBinary() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minFlipsMonoIncr(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name:    "111",
			args:    args{s: "00110"},
			wantAns: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := minFlipsMonoIncr(tt.args.s); gotAns != tt.wantAns {
				t.Errorf("minFlipsMonoIncr() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_maximumSum(t *testing.T) {
	type args struct {
		arr []int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{
			name: "111",
			args: args{arr: []int{1, -2, 0, 3}},
			want: 4,
		},
		{
			name: "222",
			args: args{arr: []int{1, -2, -2, 3}},
			want: 3,
		},
		{
			name: "333",
			args: args{arr: []int{-1, -1, -1, -1}},
			want: -1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maximumSum(tt.args.arr); got != tt.want {
				t.Errorf("maximumSum() = %v, want %v", got, tt.want)
			}
		})
	}
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

func Test_maxScore(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name string
		args args
		want int64
	}{
		// TODO: Add test cases.
		{
			name: "11",
			args: args{nums: []int{3}},
			want: 9,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxScore(tt.args.nums); got != tt.want {
				t.Errorf("maxScore() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minimumTime(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		{
			name:    "111",
			args:    args{s: "1100101"},
			wantAns: 5,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := minimumTime(tt.args.s); gotAns != tt.wantAns {
				t.Errorf("minimumTime() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_countQuadruplets(t *testing.T) {
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
			name:    "示例1",
			args:    args{nums: []int{1, 2, 3, 6}},
			wantAns: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := countQuadruplets(tt.args.nums); gotAns != tt.wantAns {
				t.Errorf("countQuadruplets() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}

func Test_isIsomorphic(t *testing.T) {
	type args struct {
		s string
		t string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "111",
			args: args{s: "egg", t: "add"},
			want: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isIsomorphic(tt.args.s, tt.args.t); got != tt.want {
				t.Errorf("isIsomorphic() = %v, want %v", got, tt.want)
			}
		})
	}
}
