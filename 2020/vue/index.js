function Vue() {
    console.log(1)
}
function init(Vue){
    Vue.prototype.$mounted = function() {
        console.log('mounted')
    }
}
init(Vue)
console.log(Vue.prototype)