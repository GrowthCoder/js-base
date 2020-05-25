/*
* https://juejin.im/post/5d635566e51d4561e224a360
* 5.19 准备
*/ 

// 用ES5实现数组的map方法
Array.prototype.MyMap = function(fn, context) {
    var arr = Array.prototype.slice.call(this);
    var mappedArr = [];
    for(var i = 0; i < arr.length; i++) {
        mappedArr.push(fn.call(context, arr[i], i, this))
    }
    return mappedArr;
}
let arr = [1,2,3]
let brr = arr.MyMap(item => item * 2)
console.log(brr)

// 用ES5实现数组的reduce方法
// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值
Array.prototype.MyReduce = function(fn, initVal) {
    var arr = Array.prototype.slice.call(this);
    var res = 0;

    initVal ? res = initVal : res;

    for (var i = 0; i < arr.length; i++) {
        res = fn.call(this, res, arr[i], i, this)
    }
    return res;
}

let sum = arr.MyReduce((acc, item) => acc + item, 2)
console.log(sum)

// 删除排序数组只重复项
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 1) {
        return 1
    }
    for(var i = nums.length - 1; i > 0; i--) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1)
        }
    }
    return nums.length
};
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]), 'length')

// 二叉树的中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
var inorderTraversal = function(root) {
    let result = []
    const inorder = root => {
        if (!root) return null
        inorder(root.left)
        result.push(root.val)
        inorder(root.right)
    }
    inorder(root)

    return result
};
// var root = new TreeNode(1)
// var left = new TreeNode(2)
// var right = new TreeNode(4)
// root.left = left
// root.right = right

// console.log(inorderTraversal(root))

// 二叉树前序遍历 递归调用
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let result = []
    const preOrder = root => {
        if (!root) return null
        result.push(root.val)
        preOrder(root.left)
        preOrder(root.right)
    }
    preOrder(root)
    return result
};

// var root = new TreeNode(1)
// var left = new TreeNode(2)
// var right = new TreeNode(4)
// root.left = left
// root.right = right
// console.log(preorderTraversal(root), 'preorderTraversal')

// n叉树的前序遍历
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */

function Node(val, children) {
    this.val = val;
    this.children = children;
};
var preorder = function(root) {
    let result = []

    const inPreOrder = root => {
        if (!root) return null
        result.push(root.val)
        if (root.children && root.children.length) {
            for(var i = 0; i < root.children.length; i++) {
                inPreOrder(root.children[i])
            }
        }
    }
    inPreOrder(root)
    return result
};
let child1 = new Node(1)
let child5 = new Node(2)
let child3 = new Node(3, [child5])
let child4 = new Node(4)
let child2 = new Node(5, [child3, child4])
let root = new Node(22, [child1, child2])

console.log(preorder(root), 'preorder')


// 排序
const arr1 = [7, 1,5,2,3, 6]
const arr2 = [3, 8, 6, 20, 7]

const sort = function(arr1, arr2) {
    let temp = [];
    arr1.forEach(item => {
        if (arr2.includes(item) && !temp.includes(item)) {
            temp.push(item);
        }
    })
    return temp.sort((a, b) => a-b);
}
// 重复字符串
const repeatString = function(str) {
    let middle = str.match(/\[.*\]/)[0];
    middle = middle.substring(1, middle.length-1);
    let num = middle.split('|')[0];
    let strTemp = middle.split('|')[1];
    let repeatStr = ''

    for(let i = 0; i< num; i++) {
        repeatStr += strTemp
    }
    return str.replace(/\[.*\]/, repeatStr)
}
console.log(repeatString('a[3|bc]de'))