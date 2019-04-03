
import _ from 'lodash';
import './main.css';
import Icon from './icon.png';
// import print from './print';
import { cube } from './main';

console.log(process.env.NODE_ENV, 'env')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

function component() {
  let ele = document.createElement('div');
  let btn = document.createElement('button');

  ele.innerHTML = _.join(['hello', 'webpack', `5 cubed is equal to ' + ${cube(5)}`], '\n\n');
  ele.classList.add('hello');
  ele.appendChild(btn);
  btn.innerHTML = 'click me then look console';

  // 懒加载
  btn.onclick =  e => import(/* webpackChunkName: 'print' */ './print').then( module => {
    const print = module.default;

    print();
  });

  return ele;
}
document.body.appendChild(component());