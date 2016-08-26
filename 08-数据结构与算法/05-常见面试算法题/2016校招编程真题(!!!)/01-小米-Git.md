## 题目描述

    git是一种分布式代码管理工具，git通过树的形式记录文件的更改历史，
    比如： base'<--base<--A<--A' ^ | --- B<--B' 
    小米工程师常常需要寻找两个分支最近的分割点，即base.
    假设git 树是多叉树，请实现一个算法，计算git树上任意两点的最近分割点。 
    （假设git树节点数为n,用邻接矩阵的形式表示git树：字符串数组matrix包含n个字符串，
    每个字符串由字符'0'或'1'组成，长度为n。matrix[i][j]=='1'当且仅当git树种第i个和第j个节点有连接。
    节点0为git树的根节点。） 
    
    输入例子:
    [01011,10100,01000,10000,10000],1,2
    
    输出例子:
    1
    
    
## java

    public class Solution {
        /**
         * 返回git树上两点的最近分割点
         * 
         * @param matrix 接邻矩阵，表示git树，matrix[i][j] == '1' 
         当且仅当git树中第i个和第j个节点有连接，节点0为git树的跟节点
         * @param indexA 节点A的index
         * @param indexB 节点B的index
         * @return 整型
         */
        public int getSplitNode(String[] matrix, int indexA, int indexB) {
    
        }
    }