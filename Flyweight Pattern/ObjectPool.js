// 对象池
const objectPoolFactory = (createObjFun) => {
  const pool = [];
  const create = () => {
    const obj = pool.length === 0 ? createObjFun() : pool.shift();
    return obj;
  };

  const recover = obj => pool.push(obj);

  return {
    create,
    recover,
  };
};

const objectPool = objectPoolFactory(() => {
  return {
    name: '李根',
    age: '22',
    grade: '2020',
  };
});
const ligen = objectPool.create(); // 创建
console.log('创建的对象', ligen);
objectPool.recover(ligen); // 回收♻️
