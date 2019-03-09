"use strict";
var mSnake;
(function (mSnake) {
    var MoveDireaction;
    (function (MoveDireaction) {
        MoveDireaction[MoveDireaction["Up"] = 0] = "Up";
        MoveDireaction[MoveDireaction["Right"] = 1] = "Right";
        MoveDireaction[MoveDireaction["Down"] = 2] = "Down";
        MoveDireaction[MoveDireaction["Left"] = 3] = "Left";
    })(MoveDireaction = mSnake.MoveDireaction || (mSnake.MoveDireaction = {}));
    var SnakeBody = /** @class */ (function () {
        function SnakeBody() {
            this.X = 0;
            this.Y = 0;
        }
        return SnakeBody;
    }());
    mSnake.SnakeBody = SnakeBody;
})(mSnake || (mSnake = {}));
