package a295ago

import (
	"strconv"
	"strings"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}
type Codec struct {
}

func Constructor() (_ Codec) {
	return
}

// Serializes a tree to a single string.
func (Codec) serialize(root *TreeNode) string {
	sb := &strings.Builder{}
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			sb.WriteString("null,")
			return
		}
		dfs(node.Left)
		dfs(node.Right)
		sb.WriteString(strconv.Itoa(node.Val))
		sb.WriteByte(',')
	}
	dfs(root)
	return sb.String()
}

// Deserializes your encoded data to tree.
func (Codec) deserialize(data string) *TreeNode {
	sp := strings.Split(data, ",")
	var build func() *TreeNode
	build = func() *TreeNode {
		if len(sp) > 0 {
			if sp[len(sp)-1] == "null" {
				sp = sp[0 : len(sp)-1]
				return nil
			}
			val, _ := strconv.Atoi(sp[len(sp)-1])
			sp = sp[0 : len(sp)-1]
			return &TreeNode{Val: val, Left: build(), Right: build()}
		} else {
			return nil
		}
	}
	return build()
}
