package a0813

import "testing"

func Test_maxSubstrings(t *testing.T) {
	type args struct {
		word string
	}
	tests := []struct {
		name    string
		args    args
		wantAns int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				word: "abcdeafdef",
			},
			wantAns: 2,
		}, */
		{
			name: "222",
			args: args{
				word: "abeaebddae",
			},
			wantAns: 2,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := maxSubstrings(tt.args.word); gotAns != tt.wantAns {
				t.Errorf("maxSubstrings() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
