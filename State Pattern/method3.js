// 委托实现
const delegate = (client, delegation) => ({
  buttonClick() {
    return delegation.buttonClick.apply(client, arguments);
  },
});

const FSM = {
  off: {
    buttonClick() {
      console.log('关灯');
      this.currentState = this.onState;
    },
  },
  on: {
    buttonClick() {
      console.log('开灯');
      this.currentState = this.offState;
    },
  },
};

class Light {
  constructor() {
    this.onState = delegate(this, FSM.on);
    this.offState = delegate(this, FSM.off);
    this.currentState = this.onState;
  }

  click() {
    this.currentState.buttonClick();
  }
}
const light = new Light();
light.click();
light.click();
light.click();
