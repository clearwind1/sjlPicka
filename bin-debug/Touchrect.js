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
        var circle = new GameUtil.MyBitmap(RES.getRes('redcircle_png'), this.x, this.y);
        AdaptGamelayer._i().putItme(circle);
        GameScene._i().curtouchdone++;
        if (GameScene._i().curtouchdone == 5) {
            GameScene._i().nextgame();
        }
        console.log('tag====', this.touchtag);
    };
    p.aptouch = function (tag) {
        this.touchbool = true;
        var circle = new GameUtil.MyBitmap(RES.getRes('redcircle_png'), this.x, this.y);
        AdaptGamelayer._i().putItme(circle);
        console.log('tag====', this.touchtag);
    };
    return Touchrect;
})(egret.Shape);
egret.registerClass(Touchrect,"Touchrect");
