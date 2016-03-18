/**
 * Created by pior on 16/3/17.
 */
class Touchrect extends egret.Shape
{
    private touchtag: number;
    public touchbool: boolean;
    public constructor(x:number,y:number,tag:number)
    {
        super();
        this.init(x,y,tag);
    }

    private init(x:number,y:number,tag:number)
    {
        this.touchbool = false;
        this.x = x;
        this.y = y;
        this.touchtag = tag;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touch,this);
    }

    private touch(evt:egret.TouchEvent)
    {
        this.touchdone(this.touchtag);
    }

    public touchdone(tag:number)
    {
        if(this.touchbool){
            return;
        }

        this.touchbool = true;

        if(this.touchtag < 5){
            GameScene._i().touchre[this.touchtag+5].aptouch(tag);
        }else
        {
            GameScene._i().touchre[this.touchtag-5].aptouch(tag);
        }


        var circle: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('redcircle_png'),this.x,this.y);
        AdaptGamelayer._i().putItme(circle);

        GameScene._i().curtouchdone++;
        if(GameScene._i().curtouchdone == 5)
        {
            GameScene._i().nextgame();
        }

        console.log('tag====',this.touchtag);
    }

    public aptouch(tag:number)
    {
        this.touchbool = true;
        var circle: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('redcircle_png'),this.x,this.y);
        AdaptGamelayer._i().putItme(circle);

        console.log('tag====',this.touchtag);
    }


}