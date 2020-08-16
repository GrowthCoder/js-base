/*
 * @Description: call apply
 * @Author: ting.gao
 * @LastEditors: ting.gao
 * @Date: 2020-06-05 09:18:04
 * @LastEditTime: 2020-06-05 09:19:33
 */ 
// bind 绑定上下文
Function.prototype.bind = function( context ){ 
    var self = this; // 保存原函数
    return function(){ // 返回一个新的函数
        return self.apply( context, arguments );
        // 执行新的函数的时候，会把之前传入的 context // 当作新函数体内的 this
    }
};
var obj = { 
    name: 'sven'
};
var func = function(){ 
    alert ( this.name );
}.bind( obj); 

func();