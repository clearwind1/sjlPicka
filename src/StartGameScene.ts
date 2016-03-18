/**
 * Created by pior on 16/3/17.
 */
class StartGameScene extends GameUtil.BassPanel
{
    public constructor()
    {
        super();
    }

    public init()
    {
        this.showbg();
    }

    private showbg()
    {
        var bg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('startbg_png'),this.mStageW/2,0);
        bg.setanchorOff(0.5,0);
        this.addChild(bg);

        var title: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('gametitle_png'),this.mStageW/2,421);
        this.addChild(title);

        var startbtn: GameUtil.Menu = new GameUtil.Menu(this,'startbtn_png','startbtn_png',this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW/2;
        startbtn.y = GameUtil.setscreenY(940);
        this.addChild(startbtn);

        var enjoymodebtn: GameUtil.Menu = new GameUtil.Menu(this,'enjoymodebtn_png','enjoymodebtn_png',this.enjoymodegame);
        enjoymodebtn.setScaleMode();
        enjoymodebtn.x = this.mStageW/2;
        enjoymodebtn.y = GameUtil.setscreenY(1115);
        this.addChild(enjoymodebtn);

    }

    private startgame()
    {
        GameUtil.GameScene.runscene(GameScene._i());
    }

    private enjoymodegame()
    {

    }

}