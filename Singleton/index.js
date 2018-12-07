// 实现方式1
const Singleton = function (name) {
  this.name = name;
};

Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = function (name) {
  if (this.instance) {
    return this.instance;
  }
  this.instance = new Singleton(name);
  return this.instance;
};

// 实现方式2
const proxySingleton = (fun) => {
  let instance = null;
  const invoke = function (...params) {
    if (!instance) {
      instance = new fun(...params);
    }
    return instance;
  };
  return invoke;
};
const People = function (name) {
  this.name = name;
};
People.prototype.getName = function () {
  console.log(this.name);
};


const SingletonPeople = proxySingleton(People);

const people1 = new SingletonPeople('ligen');
const people2 = new SingletonPeople('ligen');
console.log(people1 === people2);

// 实现方式3
