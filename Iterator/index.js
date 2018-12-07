
// 外部迭代器
const Iterator = function (arr) {
  let current = 0;
  const next = function () {
    current += 1;
  };
  const isDone = function () {
    return current >= arr.length - 1;
  };

  const getCurrItem = function () {
    return arr[current];
  }

  return {
    next,
    isDone,
    getCurrItem,
  };
};

// 中止迭代器 (可以自由选择方法)
function each (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (!callback(i, arr[i])) {
      break;
    }
  }
}
