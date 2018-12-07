// 实现一个命令模式，支持撤销和重做，存在命令队列，能够进行异步调用
const move = {
  move() {
    console.log('调用移动命令');
  },
};


class Cmd {
  constructor(target) {
    this.target = target;
  }
}

class MoveCmd extends Cmd {
  execute() {
    this.target.move();
  }

  undo() {
    console.log('回退命令', this.target);
  }
}

class Invoke {
  constructor() {
    this.history = [];
  }

  run(cmd) {
    if (cmd) {
      this.history.push(cmd);
      cmd.execute();
    }
  }

  undo() {
    if (this.history.length >= 0) {
      this.history.pop().undo();
    }
  }
}

// 宏任务 （组合模式实现）
class MacroCommadn {
  constructor() {
    this.commandList = [];
  }

  add(cmd) {
    this.commandList.push(this.commandList);
  }

  execute() {
    this.commandList.map(cmd => cmd.execute());
  }

  undo() {
    const { length } = this.commandList;
    for (let i = length - 1; i >= 0; i -= 1) {
      this.commandList[i].undo();
    }
  }
}

const moveCommand = new MoveCmd(move);
const invoke = new Invoke();
invoke.run(moveCommand);
invoke.run(moveCommand);
invoke.undo();
