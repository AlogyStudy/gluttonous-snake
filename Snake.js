"use strict";
var mSnake;
(function (mSnake) {
    var Snake = /** @class */ (function () {
        function Snake() {
            var _this = this;
            // 蛇身
            this.Bodies = new Array();
            // 速度
            this.Speed = 250;
            // 是否已暂停
            this.isPaused = true;
            // 初始化行数
            this.rowCount = 30;
            // 初始化列数
            this.cellCount = 30;
            // 计时器
            this.Timer = 0;
            this.onDown = function () {
                document.onkeydown = function (ev) {
                    switch (ev.keyCode | ev.which | ev.charCode) {
                        case 13:
                            // 回车
                            if (_this.isPaused) {
                                _this.runSnake();
                                _this.isPaused = false;
                            }
                            else {
                                // 如果没有暂停，则停止移动
                                _this.paused();
                                _this.isPaused = true;
                            }
                            break;
                        case 37:
                            // 左箭头
                            // 阻止蛇倒退走
                            if (_this.Direction === mSnake.MoveDireaction.Right)
                                break;
                            _this.Direction = mSnake.MoveDireaction.Left;
                            break;
                        case 38:
                            // 上箭头
                            if (_this.Direction === mSnake.MoveDireaction.Down)
                                break;
                            _this.Direction = mSnake.MoveDireaction.Up;
                            break;
                        case 39:
                            // 右箭头
                            if (_this.Direction === mSnake.MoveDireaction.Left)
                                break;
                            _this.Direction = mSnake.MoveDireaction.Right;
                            break;
                        case 40:
                            // 下箭头
                            if (_this.Direction === mSnake.MoveDireaction.Up)
                                break;
                            _this.Direction = mSnake.MoveDireaction.Down;
                            break;
                    }
                };
            };
            // 停止游戏
            this.paused = function () {
                clearInterval(_this.Timer);
                _this.isPaused = true;
                // 重绘蛇身
                mSnake.Draw.paint(_this.Bodies, _this.Container);
            };
            this.moveNextStep = function () {
                if (mSnake.Draw.checkNextStep(_this.Bodies, _this.Direction, _this.cellCount, _this.rowCount, _this.Container) === -1) {
                    alert('游戏结束！');
                    _this.paused();
                    return;
                }
                if (mSnake.Draw.checkNextStep(_this.Bodies, _this.Direction, _this.cellCount, _this.rowCount, _this.Container) === 1) {
                    var newBody_1 = mSnake.Draw.getNextPosition(_this.Bodies, _this.Direction);
                    _this.Bodies.unshift(newBody_1);
                    _this.generateFood();
                    return;
                }
                var newBody = mSnake.Draw.getNextPosition(_this.Bodies, _this.Direction);
                _this.Bodies.unshift(newBody);
                _this.Bodies.pop();
            };
            this.runSnake = function () {
                _this.Timer = setInterval(function () {
                    mSnake.Draw.erase(_this.Bodies, _this.Container);
                    _this.moveNextStep();
                    mSnake.Draw.paint(_this.Bodies, _this.Container);
                }, _this.Speed);
            };
            // 产生食物
            this.generateFood = function () {
                var x = Math.floor(Math.random() * _this.cellCount);
                var y = Math.floor(Math.random() * _this.rowCount);
                if (!mSnake.Draw.isCellFilled(_this.Container, x, y)) {
                    _this.Container.rows[y].cells[x].style.backgroundColor = '#ff0';
                }
            };
            this.Container = document.querySelector('#snakeWarp');
            this.Direction = Math.floor(Math.random() * 4);
            var x = 0;
            var y = 0;
            for (var i = 0; i < this.rowCount; i++) {
                var _row = this.Container.insertRow(-1); // 末尾添加新的行
                for (var j = 0; j < this.cellCount; j++) {
                    _row.insertCell(-1);
                }
            }
            // 随机添加食物
            for (var i = 0; i < 12; i++) {
                x = Math.floor(Math.random() * this.cellCount);
                y = Math.floor(Math.random() * this.rowCount);
                if (!mSnake.Draw.isCellFilled(this.Container, x, y)) {
                    this.Container.rows[y].cells[x].style.backgroundColor = '#ff0';
                }
            }
            // 创建蛇头
            this.createSnakeHead(x, y);
            this.onDown();
        }
        Snake.prototype.createSnakeHead = function (x, y) {
            while (true) {
                x = Math.floor(Math.random() * this.cellCount);
                y = Math.floor(Math.random() * this.rowCount);
                if (!mSnake.Draw.isCellFilled(this.Container, x, y)) {
                    this.Container.rows[y].cells[x].style.backgroundColor = '#999';
                    var _body = new mSnake.SnakeBody();
                    _body.X = x;
                    _body.Y = y;
                    this.Bodies.push(_body);
                    break;
                }
            }
        };
        return Snake;
    }());
    window.onload = function (e) {
        var snake = new Snake();
    };
})(mSnake || (mSnake = {}));
