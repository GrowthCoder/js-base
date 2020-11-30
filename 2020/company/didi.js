
let p = (src) => {
    // 1s 为加载完毕 执行下一个
    let loaded = false;

    return new Promise((resolve, reject) => {
        let img = new Image()
        // setTimeout
        img.onload = () =>{
            loaded = true;
            img.src = src;
            resolve()
        }

        setTimeout(() => {
            if (!loaded) {
                reject()
            }
        }, 1000)

        img.onError = () => {
            reject()
        }

    })
}

let imgList = ['http://test.jpg', 'http://test.jpg', 'http://test.jpg'];

function fetchImgs(list) {
    return new Promise((resolve, reject) => {
        let temp = [];
        for (let img of list) {
            temp.push(p(img))
        }
        Promise.all(temp).then(res => {
            resolve()
        }).catch(err => {
            reject()
        })
    })
}

// 分批处理 针对imglist过大 控制同时下载数量
function getImgSource(list) {
    let len = list.length;
    let argue = 10;
    let i = 0;

    if (len > argue) {
        fetchImgs(i * argue, argue).then(res => {
        })
    } else {
        fetchImgs(list);
    }
}

getImgSource(imgList);
