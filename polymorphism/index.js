/**
 * js中常规的多态性
 * @param {*} 
 */
function renderMap(map) {
  if (map.show instanceof Function) {
    map.show();
  }
}


// 百度地图
const baiduMap = {
  show() {
    console.log('baidu map render')
  }
}

// 谷歌地图
const googleMap = {
  show() {
    console.log('google map render')
  }
}

renderMap(baiduMap);
renderMap(googleMap);