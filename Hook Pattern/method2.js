// 通过js的方式实现模版方法
const Beverage = function (param) {
  const boilWater = function () {
    console.log('将水烧开');
  };

  const brew = param.brew || function () {
    throw new Error('请传入 brew 方法')
  }

  const pourInCup = param.pourInCup || function () {
    throw new Error('请传入 pourInCup 方法');
  }

  const addCondiments = param.addCondiments || function () {
    throw new Error('请传入 addCondiments 方法');
  }

  const F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };

  return F;
};

const Coffer = Beverage({
  brew() {
    console.log('将水添加到杯子中');
  },
  pourInCup() {
    console.log('将咖啡添加杯子中');
  },
  addCondiments() {
    console.log('添加一勺糖');
  },
});
const coffer = new Coffer();
coffer.init();