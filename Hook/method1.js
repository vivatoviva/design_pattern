// 模版方法，添加钩子函数
const Beverge = function () {};
Beverge.prototype.boilwater = function () {
  throw new Error('请重写 bilwater');
};
Beverge.prototype.brew = function () {
  throw new Error('请重写 brew 方法');
};
Beverge.prototype.pourInCup = function () {
  throw new Error();
};
Beverge.prototype.addCondiments = function () {
  throw new Error();
};
Beverge.prototype.customerWantsCondiments = function () {
  return true; // 钩子方法
};
Beverge.prototype.init = function () {
  this.boilwater();
  this.brew();
  this.pourInCup();
  if (this.customerWantsCondiments()) {
    this.addCondiments()
  }
};

const CoffeeWithHook = function () {};
CoffeeWithHook.prototype = new Beverge();
CoffeeWithHook.prototype.boilwater = function() {
  console.log('水开了');
};
CoffeeWithHook.prototype.brew = function () {
  console.log('将水添加进入杯子');
};
CoffeeWithHook.prototype.pourInCup = function () {
  console.log('将咖啡加入杯子');
};
CoffeeWithHook.prototype.customerWantsCondiments = function () {
  return window.confirm("请问需要调料吗");
};
CoffeeWithHook.prototype.addCondiments = function () {
  console.log('添加一杯糖和牛奶');
};

const coffer = new CoffeeWithHook();
coffer.init();
