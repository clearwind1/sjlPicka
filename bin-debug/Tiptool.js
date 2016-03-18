/**
 * Created by pior on 16/3/17.
 */
var Tiptool = (function (_super) {
    __extends(Tiptool, _super);
    function Tiptool(texture, posx, posy) {
        _super.call(this, texture, posx, posy);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tip, this);
    }
    var d = __define,c=Tiptool;p=c.prototype;
    p.tip = function (evt) {
        var touchrect;
        for (var i = 0; i < 5; i++) {
            touchrect = GameScene._i().touchre[i];
            if (!touchrect.touchbool) {
                touchrect.touchdone(i);
                break;
            }
        }
        this.parent.removeChild(this);
    };
    return Tiptool;
})(GameUtil.MyBitmap);
egret.registerClass(Tiptool,"Tiptool");
