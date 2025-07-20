package a0718

import (
	"reflect"
	"testing"
)

func Test_removeSubfolders(t *testing.T) {
	type args struct {
		folder []string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				folder: []string{"/a", "/a/b", "/c/d", "/c/d/e", "/c/f"},
			},
			want: []string{"/a", "/c/d", "/c/f"},
		}, */
		/* {
			name: "222",
			args: args{
				folder: []string{"/a", "/a/b/c", "/a/b/d"},
			},
			want: []string{"/a"},
		}, */
		{
			name: "333",
			args: args{
				folder: []string{"/a/b/c", "/a/b/ca", "/a/b/d"},
			},
			want: []string{"/a/b/c", "/a/b/ca", "/a/b/d"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := removeSubfolders(tt.args.folder); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("removeSubfolders() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_rearrangeBarcodes(t *testing.T) {
	type args struct {
		barcodes []int
	}
	tests := []struct {
		name    string
		args    args
		wantAns []int
	}{
		// TODO: Add test cases.
		/* {
			name: "111",
			args: args{
				barcodes: []int{1, 1, 1, 1, 2, 2, 3, 3},
			},
			wantAns: []int{1, 3, 1, 3, 2, 1, 2, 1},
		}, */
		{
			name: "222",
			args: args{
				barcodes: []int{7, 7, 7, 8, 5, 7, 5, 5, 5, 8},
			},
			wantAns: []int{5, 7, 5, 7, 5, 7, 5, 8, 7, 8},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotAns := rearrangeBarcodes(tt.args.barcodes); !reflect.DeepEqual(gotAns, tt.wantAns) {
				t.Errorf("rearrangeBarcodes() = %v, want %v", gotAns, tt.wantAns)
			}
		})
	}
}
