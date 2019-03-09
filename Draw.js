"use strict";
var mSnake;
(function (mSnake) {
    var Draw = /** @class */ (function () {
        function Draw() {
        }
        /**
         *  擦除蛇身
         * @param p_Bodies 蛇身体集合
         * @param p_Table 游戏容器对象
         */
        Draw.erase = function (p_Bodies, p_Table) {
            for (var i = 0; i < p_Bodies.length; i++) {
                this.eraseDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        };
        /**
         * 擦除点
         * @param x 单元格的列数
         * @param y 单元格的行数
         * @param p_Table 游戏容器对象
         */
        Draw.eraseDot = function (x, y, p_Table) {
            p_Table.rows[y].cells[x].style.backgroundColor = '';
        };
        /**
         * 绘制蛇身
         * @param p_Bodies 蛇身体集合
         * @param p_Table 游戏容器对象
         */
        Draw.paint = function (p_Bodies, p_Table) {
            for (var i = 0; i < p_Bodies.length; i++) {
                this.paintDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        };
        /**
         * 绘制点
         * @param x 单元格的列数
         * @param y 单元格的行数
         * @param p_Table 游戏容器对象
         */
        Draw.paintDot = function (x, y, p_Table) {
            p_Table.rows[y].cells[x].style.backgroundColor = '#999';
        };
        /**
         * 检查下一节点运行状态
         * @param p_Bodies 蛇身体集合
         * @param p_Direction 运动方向
         * @param p_CellCount 列的数量
         * @param p_RowCount 行的数量
         * @param p_Table 游戏容器对象
         * @return number 蛇运行状态
         */
        Draw.checkNextStep = function (p_Bodies, p_Direction, p_CellCount, p_RowCount, p_Table) {
            var _newBody = this.getNextPosition(p_Bodies, p_Direction);
            if (_newBody.X < 0 || _newBody.X >= p_CellCount || _newBody.Y < 0 || _newBody.Y >= p_RowCount) {
                // 到达边界，游戏结束
                return -1;
            }
            for (var i = 0; i < p_Bodies.length; i++) {
                if (p_Bodies[i].X === _newBody.X && p_Bodies[i].Y === _newBody.Y) {
                    // 碰到蛇身，游戏结束
                    return -1;
                }
            }
            if (this.isCellFilled(p_Table, _newBody.X, _newBody.Y)) {
                // 有食物
                return 1;
            }
            // 空白继续运行
            return 0;
        };
        /**
         * 获得蛇头运行下一节点的坐标
         * @param p_Bodies 蛇身体集合
         * @param p_Direction 运动方向
         */
        Draw.getNextPosition = function (p_Bodies, p_Direction) {
            var x = p_Bodies[0].X;
            var y = p_Bodies[0].Y;
            if (p_Direction === mSnake.MoveDireaction.Up) {
                // 向上
                y--;
            }
            else if (p_Direction === mSnake.MoveDireaction.Right) {
                // 向右
                x++;
            }
            else if (p_Direction === mSnake.MoveDireaction.Down) {
                // 向下
                y++;
            }
            else if (p_Direction === mSnake.MoveDireaction.Left) {
                // 向左
                x--;
            }
            // 返回一个坐标
            var _newBody = new mSnake.SnakeBody();
            _newBody.X = x;
            _newBody.Y = y;
            return _newBody;
        };
        /**
         * 单元格是否被填充
         * @param p_Table 游戏容器对象
         * @param x 单元格的列数
         * @param y 单元格的行数
         */
        Draw.isCellFilled = function (p_Table, x, y) {
            if (p_Table.rows[y].cells[x].style.backgroundColor === '') {
                return false;
            }
            return true;
        };
        return Draw;
    }());
    mSnake.Draw = Draw;
})(mSnake || (mSnake = {}));
