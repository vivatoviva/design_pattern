// 抽象状态类
class State {
  buttonClick() {
    throw new Error('请重写buttonCLick方法');
  }
}
// 各种具体状态类
class OffLightState extends State {
  constructor(light) {
    super();
    this.light = light;
  }

  buttonClick() {
    console.log('弱光');
    this.light.setState(this.light.weakLightState);
  }
}

class WeakLightState extends State {
  constructor(light) {
    super();
    this.light = light
  }

  buttonClick() {
    console.log('强光');
    this.light.setState(this.light.strongLightState);
  }
}

class StrongLightState extends State {
  constructor(light) {
    super();
    this.light = light;
  }

  buttonClick() {
    console.log('关灯');
    this.light.setState(this.light.offLightState)
  }
}

// 设施类
class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.state = this.offLightState;
  }

  click() {
    this.state.buttonClick();
  }

  setState(state) {
    this.state = state;
  }
}
const light = new Light();
light.click();
light.click();
light.click();
light.click();
