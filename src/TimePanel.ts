/**
 * Created by pior on 16/3/11.
 *
 * 时间
 */

class TimePanel extends GameUtil.BassPanel
{

    private bchangey: boolean;
    private bchanger: boolean;

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

        this.timebar = new GameUtil.MyBitmap(RES.getRes('timepro_png'),127,GameUtil.setscreenY(1302));
        this.timebar.setanchorOff(0,0.5);
        this.addChild(this.timebar);
        //this.timebar.scale9Grid = new egret.Rectangle(15,7,270,10);

        var timeproframe: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('timeproframe_png'),417,GameUtil.setscreenY(1302));
        this.addChild(timeproframe);

        this.intervaltag = egret.setInterval(this.timerun,this,600);

    }

    public cutTimesc()
    {
        var sc: number = this.timebar.$getScaleX();
        sc -= 0.01;
        this.timebar.$setScaleX(sc);
    }

    private timerun()
    {

        if(GameScene._i().gamestate == GameState.gamepause)
        {
            return;
        }

        GameScene._i().costime += 600;

        var sc: number = this.timebar.$getScaleX();
        sc -= 0.001;
        this.timebar.$setScaleX(sc);

        //console.log('sc======',sc);

        if(!this.bchanger && sc <= 0.15)
        {
            this.bchanger = true;
            this.timebar.setNewTexture(RES.getRes('redtimepro_png'))
        }
        if(sc <= 0.4 && !this.bchangey)
        {
            this.bchangey = true;
            this.timebar.setNewTexture(RES.getRes('yelltimepro_png'));
        }

        if(sc <= 0)
        {
            this.timebar.$setScaleX(0);
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