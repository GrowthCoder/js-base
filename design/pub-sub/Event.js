class Event {
    constructor() {
        // 缓存列表
        this.clientList = {};
    }
    listen(key, fn) {
        // 订阅的消息添加进缓存列表
        (this.clientList[key] || (this.clientList[key] = [])).push(fn);
    }
    trigger() {
        const key = Array.prototype.shift.call(arguments),
              fns = this.clientList[key];

        if( !fns || fns.length == 0) {
            return false;
        }

        for(let i = 0, fn; fn = fns[i++]; ) {
            // 依次trigger 同一个key的回调
            fn.apply(this, arguments);
        }
    }
    remove(key, fn) {
        const fns = this.clientList[key];

        if(!fns) {
            // 如果key对应的消息没有被订阅 直接返回
            return false;
        }

        if( !fn ) {
            // 如果没有传回调函数
            // 则remove所有事件
            fns && (fns.length = 0); 
        }else{
            // 匹配到对应的回调函数 则删除
            fns.filter(item => item != fn);
        }
    }
}

const env = new Event();
const env2 = new Event();
env.listen('click', () => {
    console.log('aaa');
})
env2.listen('click', () => {
    console.log('aaa1');
})
env.trigger('click', 'aa');
env.remove('click');
env.trigger('click');