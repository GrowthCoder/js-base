var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments), // 取出消息类型
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        // 发布消息
        // 取出该消息对应的回调函数集合
        // 如果没有订阅该消息，则返回
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function (key, fn) {
        var fns = this.clientList[key];
        if (!fns) { // 如果 key 对应的消息没有被人订阅，则直接返回 
            return false;
        }
        if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn == fn) {
                    fns.splice(l, 1);
                }
            }
        }
    },
}

var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
};
var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88', fn1 = function (price) {
    console.log('价格= ' + price);
});
salesOffices.listen('squareMeter88', fn2 = function (price) {
    console.log('价格= ' + price);
});
salesOffices.remove('squareMeter88', fn1); // 
salesOffices.trigger('squareMeter88', 2000000);