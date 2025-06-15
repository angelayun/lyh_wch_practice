package a0615

import "testing"

func Test_generateTag(t *testing.T) {
	type args struct {
		caption string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			name: "1",
			args: args{caption: "Leetcode daily streak achieved"},
			want: "#leetcodeDailyStreakAchieved",
		},
		{
			name: "2",
			args: args{caption: "can I Go There"},
			want: "#canIGoThere",
		},
		{
			name: "3",
			args: args{caption: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"},
			want: "#hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
		},
		{
			name: "4",
			args: args{caption: " fPysaRtLQLiMKVvRhMkkDLNedQKffPnCjbITBTOVhoVjiKbfSawvpisDaNzXJctQkn"},
			want: "#fpysartlqlimkvvrhmkkdlnedqkffpncjbitbtovhovjikbfsawvpisdanzxjctqkn",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := generateTag(tt.args.caption); got != tt.want {
				t.Errorf("generateTag() = %v, want %v", got, tt.want)
			}
		})
	}
}
