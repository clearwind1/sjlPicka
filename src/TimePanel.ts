/**
 * Created by pior on 16/3/11.
 *
 * 时间
 */

class TimePanel extends GameUtil.BassPanel
{

    private timebar: GameUtil.MyBitmap;
    public intervaltag: number;

    public constructor()
    {
        super();
    }
    public init()
    {
        this.show();
    }

    private show()
    {
        var timetext: GameUtil.MyTextField = new GameUtil.MyTextField(22,GameUtil.setscreenY(1304),40,0);
        timetext.setText('TIME:');
        this.addChild(timetext);

        var timeproframe: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('timeproframe_png'),417,GameUtil.setscreenY(1302));
        this.addChild(timeproframe);

        this.timebar = new GameUtil.MyBitmap(RES.getRes('timepro_png'),129,GameUtil.setscreenY(1302));
        this.timebar.setanchorOff(0,0.5);
        this.addChild(this.timebar);
        //this.timebar.scale9Grid = new egret.Rectangle(15,7,270,10);

        this.intervaltag = egret.setInterval(this.timerun,this,100);

    }

    private timerun()
    {

        if(GameScene._i().gamestate == GameState.gamepause)
        {
            return;
        }

        var sc: number = this.timebar.$getScaleX();
        sc -= 0.01;
        this.timebar.$setScaleX(sc);

        //console.log('sc======',sc);

        if(sc <= 0)
        {
            console.log('gameover');
            GameScene._i().gameover();
            egret.clearInterval(this.intervaltag);
        }

    }

    public reset()
    {
        this.timebar.$setScaleX(1);
    }


    private static inst: TimePanel;
    public static _i(): TimePanel
    {
        if(this.inst == null)
        {
            this.inst = new TimePanel();
        }

        return this.inst;
    }

}