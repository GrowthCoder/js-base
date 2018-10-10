var salesOffices = {}; // 定义售楼处
salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数 salesOffices.listen = function( key, fn ){

salesOffices.listen = function (key, fn) {
    if (!this.clientList[key]) {
    this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
};

// 如果还没有订阅过此类消息，给该类消息创建一个缓存列表 // 订阅的消息添加进消息缓存列表
salesOffices.trigger = function () {
    var key = Array.prototype.shift.call(arguments), // 取出消息类型
        fns = this.clientList[key];
    if (!fns || fns.length === 0) {
        return false;
    }
    // 发布消息
    // 取出该消息对应的回调函数集合
    // 如果没有订阅该消息，则返回
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
    }
};
salesOffices.listen('squareMeter88', function (price) {
    console.log('价格= ' + price); // 输出: 2000000
});
salesOffices.listen('squareMeter110', function (price) {
    console.log('价格= ' + price); // 输出: 3000000
    // 小明订阅 88 平方米房子的消息
    // 小红订阅 110 平方米房子的消息
});
salesOffices.trigger('squareMeter88', 2000000); // 发布 88 平方米房子的价格
salesOffices.trigger('squareMeter110', 3000000); 