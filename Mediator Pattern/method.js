function Country (name) {
  this.name = name;
  this.mediator = null;
}
Country.prototype.Declare = function (message) {
  this.mediator.Declare(this.name, message);
};
Country.prototype.GetMessage = function (message) {
  console.log(`${this.name}受到信息： ${message}`);
};
Country.prototype.setMediator = function (mediator) {
  this.mediator = mediator;
};

class Mediator {
  constructor() {
    this.counrty = [];
  }

  Declare(name, message) {
    this.counrty.map(item => {
      item.name !== name && item.GetMessage(`${name}: ${message}`);
    })
  }

  addCountry(counrty) {
    this.counrty.push(counrty);
  }
}
const mediator = new Mediator();
const china = new Country('china');
const usa = new Country('usa');
const japan = new Country('japan');
mediator.addCountry(china);
mediator.addCountry(usa);
mediator.addCountry(japan);
china.setMediator(mediator);
usa.setMediator(mediator);
japan.setMediator(mediator);
usa.Declare('我要发动贸易战');
