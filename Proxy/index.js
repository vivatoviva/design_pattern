// 合并js请求(虚拟代理)


// function syncPost (id) {
//   console.log(`异步发送请求${id}`);
// }
// const proxySyncPost = (() => {
//   let cache = [];
//   let timer = null;
//   const invoke = (id) => {
//     cache.push(id);
//     if (timer) {
//       return;
//     }
//     timer = setTimeout(() => {
//       syncPost(cache.join(','));
//       clearTimeout(timer);
//       timer = null;
//       cache = [];
//     }, 2000);
//   };
//   return invoke;
// })();


// 惰性加载js文件（虚拟代理）

/*
  这个函数是这样的意思： 当用户点击F2的时候才会加载真正的文件，因为这个对象是为了console进行服务，如果不打开F2的话，可以判断
  不需要这个文件，所以通过监听按钮点击，可在需要使用文件的时候才去加载文件。
*/


// const miniConsole = (() => {
//   const cache = [];
//   const handler = (ev) => {
//     if (ev.keyCode === 113) {
//       const script = document.createElement('script');
//       script.onload = function () {
//         cache.map(fn => fn());
//       }
//       script.src='http://localhost/miniConsole.js';
//       document.getElementById('head')[0].appendChild(script);
//       document.body.removeEventListener('keydown', handler);
//     }
//   }
//   document.body.addEventListener('keydown', handler, false);

//   return {
//     log(...args) {
//       cache.push(() => {
//         miniConsole.log.apply(miniConsole, args);
//       });
//     },
//   };
// })();

// 缓存计算的值（函数优化）可以使用高阶函数实现各种计算的缓存版本，同时也可以使用这种方法缓存各种请求

// Function.prototype.invoke = function() {
//   const self = this;
//   return function (obj, ...args) {
//     return self.apply(obj, args);
//   }
// };
// const reduce = Array.prototype.reduce.invoke();
// function mult() {
//   return reduce(arguments, (prev, current) => prev + current, 0);
// }


// const proxyMult = (() => {
//   const cache = [];
//   const join = Array.prototype.join.invoke();
//   const invoke = function (...args) {
//     const id = join(arguments, ',');
//     let result = cache[id];
//     if (!result) {
//       cache[id] = mult.apply(null, arguments);
//       result = cache[id];
//     } else {
//       console.log('缓存命中');
//     }
//     // 避免缓存过度
//     if (cache.length > 8) {
//       cache.shift();
//     }
//     return result;
//   };
//   return invoke;
// })();
// console.log(proxyMult(1, 2, 3));
// console.log(proxyMult(1, 2, 3));
// console.log(proxyMult(1, 2, 3, 4));
