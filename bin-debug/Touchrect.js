/**
 * Created by pior on 16/3/17.
 */
var Touchrect = (function (_super) {
    __extends(Touchrect, _super);
    function Touchrect(x, y, tag) {
        _super.call(this);
        this.init(x, y, tag);
    }
    var d = __define,c=Touchrect;p=c.prototype;
    p.init = function (x, y, tag) {
        this.touchbool = false;
        this.x = x;
        this.y = y;
        this.touchtag = tag;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
    };
    p.touch = function (evt) {
        this.touchdone(this.touchtag);
    };
    p.touchdone = function (tag) {
        if (this.touchbool) {
            return;
        }
        this.touchbool = true;
        if (this.touchtag < 5) {
            GameScene._i().touchre[this.touchtag + 5].aptouch(tag);
        }
        else {
            GameScene._i().touchre[this.touchtag - 5].aptouch(tag);
        }
        //var circle: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('redcircle_png'),this.x,this.y);
        var circle = this.getArcProgress(this.x, this.y, true, 15);
        //AdaptGamelayer._i().putItme(circle);
        GameScene._i().adplayerf.addChild(circle);
        console.log('tag====', this.touchtag);
    };
    p.aptouch = function (tag) {
        this.touchbool = true;
        //var circle: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('redcircle_png'),this.x,this.y);
        var circle = this.getArcProgress(this.x, this.y, false, 15);
        GameScene._i().adplayerf.addChild(circle);
        console.log('tag====', this.touchtag);
    };
    p.getArcProgress = function (x, y, touchcount, dic) {
        var shape = new egret.Shape();
        var angle = 0;
        egret.startTick(function arc(timeStamp) {
            angle += 1 * dic;
            changeGraphics(angle);
            if (angle >= 360) {
                egret.stopTick(arc, this);
                if (touchcount) {
                    GameScene._i().curtouchdone++;
                    if (GameScene._i().curtouchdone == 5) {
                        egret.setTimeout(function () {
                            GameScene._i().nextgame();
                        }, this, 500);
                    }
                }
            }
            return true;
        }, this);
        return shape;
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.lineStyle(5, 0xff0000, 1);
            shape.graphics.drawArc(x, y, 50, 0, angle * Math.PI / 180, false);
            shape.graphics.endFill();
        }
    };
    return Touchrect;
})(egret.Shape);
egret.registerClass(Touchrect,"Touchrect");
