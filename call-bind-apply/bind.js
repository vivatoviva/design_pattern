Function.prototype.bind = (context, args) => {
  const self = this;
  return function(...params) {
    self.apply(context, [...args, ...params]);
  }
}
