/**
 * Created by pior on 16/3/17.
 */
class Tiptool extends GameUtil.MyBitmap
{
    public constructor(texture:egret.Texture,posx:number,posy:number)
    {
        super(texture,posx,posy);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tip,this);
    }

    private tip(evt:egret.TouchEvent)
    {
        var touchrect: Touchrect;
        for(var i:number=0;i < 5;i++){
            touchrect  = GameScene._i().touchre[i];
            if(!touchrect.touchbool)
            {
                touchrect.touchdone(i);
                break;
            }
        }

        this.parent.removeChild(this);
    }
}