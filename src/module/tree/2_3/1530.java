class Solution {
    int ans = 0;
public:
    int countPairs(TreeNode* root, int distance) {
        if(!root) return 0;
        dfs(root, distance);
        return ans;
    }
    vector<int> dfs(TreeNode* root, int distance){
        //dfs 返回当前父节点下所有叶子节点到本父节点的路径长度, 向量中的每一个路径长度对应一个叶子节点
        if(!root) return {};//root为空返回空向量;
        if(root->left==NULL && root->right == NULL) return {1};//当前节点为叶子节点返回{1};
        
        vector<int> l, r;
        l = dfs(root->left, distance);//遍历左子树获得左侧叶子节点到本节点路径长度;
        r = dfs(root->right, distance);//遍历又子树获得右侧叶子节点到本节点路径长度
        for(int leaf : l){
            for(int rleaf: r){
                if((leaf + rleaf) <= distance){
                    //左右子树叶子节点两两配对， 二者之和就是两个叶子节点之间的路径长度    <=distance ans++;
                    ans++;
                }
            }
        }

        //左右子树叶子节点路径长度+1并合并返回;
        for(int & leaf: l){
            leaf ++;
        }
        for(int leaf: r) l.emplace_back(leaf+1);
        return l;
    }
};