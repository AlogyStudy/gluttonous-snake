module mSnake {
  class Snake {
    // 容器类
    private Container: HTMLTableElement
    // 蛇身
    public Bodies: Array<SnakeBody> = new Array()
    // 方向
    public Direction: MoveDireaction
    // 速度
    private Speed: number = 250
    // 是否已暂停
    private isPaused: boolean = true
    // 初始化行数
    private rowCount: number = 30
    // 初始化列数
    private cellCount: number = 30
    // 计时器
    private Timer: number = 0
    constructor () {
      this.Container = <HTMLTableElement>document.querySelector('#snakeWarp')
      this.Direction = Math.floor(Math.random() * 4)
      let x = 0
      let y = 0
      for (let i = 0; i < this.rowCount; i++) {
        let _row = <HTMLTableRowElement>this.Container.insertRow(-1) // 末尾添加新的行
        for (let j = 0; j < this.cellCount; j++) {
          _row.insertCell(-1)
        }
      }

      // 随机添加食物
      for (let i = 0; i < 12; i++) {
        x = Math.floor(Math.random() * this.cellCount)
        y = Math.floor(Math.random() * this.rowCount)
        if (!Draw.isCellFilled(this.Container, x, y)) {
          (<HTMLTableCellElement>(<HTMLTableRowElement>this.Container.rows[y]).cells[x]).style.backgroundColor = '#ff0'
        }
      }

      // 创建蛇头
      this.createSnakeHead(x, y)
      this.onDown()
    }
    private createSnakeHead (x: number, y: number): void {
      while (true) {
        x = Math.floor(Math.random() * this.cellCount)
        y = Math.floor(Math.random() * this.rowCount)
        if (!Draw.isCellFilled(this.Container, x, y)) {
          (<HTMLTableCellElement>(<HTMLTableRowElement>this.Container.rows[y]).cells[x]).style.backgroundColor = '#999'
          let _body = new SnakeBody()
          _body.X = x
          _body.Y = y
          this.Bodies.push(_body)
          break
        }
      }
    }
    private onDown = (): void => {
      document.onkeydown = (ev: KeyboardEvent) => {
        switch (ev.keyCode | ev.which | ev.charCode) {
          case 13:
            // 回车
            if (this.isPaused) {
              this.runSnake()
              this.isPaused = false
            } else {
              // 如果没有暂停，则停止移动
              this.paused()
              this.isPaused = true
            }
          break
          case 37:
            // 左箭头
            // 阻止蛇倒退走
            if (this.Direction === MoveDireaction.Right) break
            this.Direction = MoveDireaction.Left
          break
          case 38:
            // 上箭头
            if (this.Direction === MoveDireaction.Down) break
            this.Direction = MoveDireaction.Up
          break
          case 39:
            // 右箭头
            if (this.Direction === MoveDireaction.Left) break
            this.Direction = MoveDireaction.Right
          break
          case 40:
            // 下箭头
            if (this.Direction === MoveDireaction.Up) break
            this.Direction = MoveDireaction.Down
          break
        }
      }
    }
    // 停止游戏
    private paused = (): void => {
      clearInterval(this.Timer)
      this.isPaused = true
      // 重绘蛇身
      Draw.paint(this.Bodies, this.Container)
    }
    private moveNextStep = (): any => {
      if (Draw.checkNextStep(this.Bodies, this.Direction, this.cellCount, this.rowCount, this.Container) === -1) {
        alert('游戏结束！')
        this.paused()
        return
      }
      if (Draw.checkNextStep(this.Bodies, this.Direction, this.cellCount, this.rowCount, this.Container) === 1) {
        let newBody = Draw.getNextPosition(this.Bodies, this.Direction)
        this.Bodies.unshift(newBody)
        this.generateFood()
        return
      }
      let newBody = Draw.getNextPosition(this.Bodies, this.Direction)
      this.Bodies.unshift(newBody)
      this.Bodies.pop()
    }
    public runSnake = () => {
      this.Timer = setInterval(() => {
        Draw.erase(this.Bodies, this.Container)
        this.moveNextStep()
        Draw.paint(this.Bodies, this.Container)
      }, this.Speed)
    }
    // 产生食物
    private generateFood = (): void => {
      let x = Math.floor(Math.random() * this.cellCount)
      let y = Math.floor(Math.random() * this.rowCount)
      if (!Draw.isCellFilled(this.Container, x, y)) {
        (<HTMLTableCellElement>(<HTMLTableRowElement>this.Container.rows[y]).cells[x]).style.backgroundColor = '#ff0'
      }
    }
  }
  window.onload = (e) => {
    let snake = new Snake()
  }
}
