package a0803

import (
	"testing"
)

func Test_isTrionic(t *testing.T) {
	type args struct {
		nums []int
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
				nums: []int{1, 3, 5, 4, 2, 6},
			},
			want: true,
		},
		{
			name: "222",
			args: args{
				nums: []int{2, 1, 3},
			},
			want: false,
		},
		{
			name: "333",
			args: args{
				nums: []int{3, 7, 1},
			},
			want: false,
		},
		{
			name: "444",
			args: args{
				nums: []int{6, 7, 5, 1},
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := isTrionic(tt.args.nums); got != tt.want {
				t.Errorf("isTrionic() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxBalancedShipments(t *testing.T) {
	type args struct {
		weight []int
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
				weight: []int{2, 5, 1, 4, 3},
			},
			want: 2,
		},
		{
			name: "222",
			args: args{
				weight: []int{4, 4},
			},
			want: 0,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxBalancedShipments(tt.args.weight); got != tt.want {
				t.Errorf("maxBalancedShipments() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_minTime(t *testing.T) {
	type args struct {
		s     string
		order []int
		k     int
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
				s:     "abc",
				order: []int{1, 0, 2},
				k:     2,
			},
			want: 0,
		},
		{
			name: "222",
			args: args{
				s:     "cat",
				order: []int{0, 2, 1},
				k:     6,
			},
			want: 2,
		},
		{
			name: "333",
			args: args{
				s:     "xy",
				order: []int{0, 1},
				k:     4,
			},
			want: -1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := minTime(tt.args.s, tt.args.order, tt.args.k); got != tt.want {
				t.Errorf("minTime() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_maxSumTrionic(t *testing.T) {
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
			name: "111",
			args: args{nums: []int{0, -2, -1, -3, 0, 2, -1}},
			want: -4,
		},
		{
			name: "222",
			args: args{nums: []int{1, 4, 2, 7}},
			want: 14,
		},
		{
			name: "333",
			args: args{nums: []int{
				-5819, -5202, -4955, -4667, -3924, -2998, -2370, -1396, -596, 100, 340, 1033, 1393, 2117, 2982, 3346, 4140, 4243, 5125, 6093, 7042, 7483, 8218, 8393, 8663, 9632, 10274, 10918, 11661, 12034, 12052, 12820, 13563, 14171, 14314, 15210, 15467, 15717, 16572, 16818, 17389, 17507, 18414, 18464, 19299, 19954, 20032, 20218, 20645, 21281, 21997, 22738, 23478, 23640, 24205, 25098, 25334, 25935, 25972, 26924, 27886, 28671, 29480, 29877, 29918, 30205, 30790, 29642, 29588, 29353, 28548, 28098, 27375, 27059, 26739, 25971, 25886, 25319, 24377, 24220, 24071, 23541, 22664, 22501, 22035, 22007, 22970, 23588, 24307, 24889, 25226, 25568, 26048, 26317, 26469, 26923, 27736, 28503, 28894, 29799, 30451, 31239, 31990, 32708, 32855, 32877, 33507, 33754, 33771, 34084, 34120, 34672, 35648, 36442, 37026, 37267, 38080, 38397, 39056, 39762, 40726, 40808, 41612, 41793, 42714, 43399, 43454, 43455, 43829, 43854, 43935, 44487, 44789, 45576, 45912, 46740, 47222, 47445, 47731, 47991, 48509, 48865, -26850, 29202, -8354, -23078, 18524, 23340, -40505, -10180, -22127, -9126, -2769, -2699, 872, -7759, -8683, -12781, -17163, -20974, -24206, -28500, -30226, -37618, -40008, -40215, -34266, -29698, -24645, -18820, -13351, -10908, -5183, -4643, 1316, 4126, 9569, -38250, 48482, -12641, 40337, 29146, -26433, -45226, 40037, -7788, -9802, 40007, 48549, -17810, 20766, -17658, -2499, -3922, -15450, -42212, -5914, 23543, 8770, -10576, -13308, 12683, -1833,
			}},
			// want: 3456068,
			want: 3424141,
		},
		{
			name: "444",
			args: args{nums: []int{
				2, 993, -791, -635, -569,
			}},
			want: -431,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := maxSumTrionic(tt.args.nums); got != tt.want {
				t.Errorf("maxSumTrionic() = %v, want %v", got, tt.want)
			}
		})
	}
}
