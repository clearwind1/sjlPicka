/**
 * Created by pior on 16/3/17.
 */
class GameScene extends GameUtil.BassPanel
{

    private Totalstage: number = 10;

    private curstagetext: GameUtil.MyTextField;     //当前关卡数
    private curstage: number = 1;

    public touchre: Touchrect[];

    private discovercont: egret.DisplayObjectContainer;

    public gamestate:GameState;

    public curtouchdone: number = 0;

    public costime: number = 0;

    public bpassgame: boolean = false;

    public adplayerf: egret.DisplayObjectContainer;

    public constructor()
    {
        super();
    }

    public init()
    {
        this.gamestate = GameState.gaming;
        this.curtouchdone = 0;
        this.costime = 0;
        this.show();
    }

    private show()
    {
        this.touchre = [];
        this.discovercont = new egret.DisplayObjectContainer();
        this.adplayerf = null;

        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1,0xffffff);
        this.addChild(shap);

        var shape: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH-136,1,0x888888);
        this.addChild(shape);

        this.curstagetext = new GameUtil.MyTextField(22,GameUtil.setscreenY(1237),40,0);
        this.curstagetext.setText('Stage '+this.curstage+'/10');
        this.addChild(this.curstagetext);

        this.addChild(TimePanel._i());
        TimePanel._i().reset();

        for(var i: number=0;i < 3;i++)
        {
            var tiptool: Tiptool = new Tiptool(RES.getRes('tiptool_png'),396+i*85,GameUtil.setscreenY(1237));
            this.addChild(tiptool);
        }

        var pausebtn: GameUtil.Menu = new GameUtil.Menu(this,'pausebtn_png','pausebtn_png',this.pausegame);
        pausebtn.x = 659;
        pausebtn.y = GameUtil.setscreenY(1238);
        this.addChild(pausebtn);

        //this.addChild( AdaptGamelayer._i());
        //AdaptGamelayer._i().initlayer(this.mStageH-136);
        this.showAdapLayer();

    }

    private showAdapLayer()
    {
        var adps: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();


        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH-136);
        adps.addChild(shap);

        this.touchre = [];
        var picname:string[] = ['uppic','downpic'];
        for(var j:number=0;j < 2;j++){
            var pic:GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes(picname[j]+this.curstage+'_png'),378,300+j*602);
            pic.x = pic.$getWidth()/2;
            pic.touchEnabled = true;
            pic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchgamescene,this);
            //pic.x = 378;
            pic.y = 300+j*602;
            adps.addChild(pic);
            //AdaptGamelayer._i().putItme(pic);
        }

        var recposx: number[][] = [[689,297,342,273,168],[581,224,424,508,430],[306,144,503,465,329],[272,361,461,564,286],[143,450,251,454,593],[65,373,167,402,673],[529,625,440,295,500],[441,263,384,619,562],[151,259,427,644,658],[523,677,358,573,344]];
        var recposy: number[][] = [[57,236,362,538,414],[256,240,98,340,432],[170,186,126,324,493],[206,369,112,524,483],[345,490,114,156,282],[397,435,231,111,193],[239,410,332,74,120],[481,180,130,435,150],[396,185,318,328,141],[526,309,380,222,243]];
        for(var i: number=0;i < 10;i++)
        {
            this.touchre[i] = new Touchrect(recposx[this.curstage-1][(i%5)],recposy[this.curstage-1][i%5]+Math.floor(i/5)*602,i);
            this.touchre[i].graphics.beginFill(0x000000,0);
            this.touchre[i].graphics.drawRect(0,0,100,100);
            this.touchre[i].graphics.endFill();
            this.touchre[i].$setAnchorOffsetX(50);
            this.touchre[i].$setAnchorOffsetY(50);
            adps.addChild(this.touchre[i]);
            //AdaptGamelayer._i().putItme(this.touchre[i]);
        }

        adps.y = -this.mStageH;

        this.addChild(adps);
        if(adps.$getHeight()>this.mStageH-136){
            adps.scaleY = (this.mStageH-136)/adps.$getHeight();
        }

        var self:any = this;
        var tag = egret.Tween.get(adps).to({y:0},600).call(function(){
            self.adplayerf = adps;
            self.removeChild(adps);
            self.addChild(self.adplayerf);
            egret.Tween.removeTweens(tag);
        });

    }

    private pausegame()
    {
        //console.log('pausegame');
        this.gamestate = GameState.gamepause;
        this.addChild(this.discovercont);
        this.discovercont.touchEnabled = true;

        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.9);
        this.discovercont.addChild(shap);

        var continubtn: GameUtil.Menu = new GameUtil.Menu(this,'continubtn_png','continubtn_png',this.continugame);
        continubtn.x = this.mStageW/2;
        continubtn.y = GameUtil.setscreenY(591);
        this.discovercont.addChild(continubtn);

        var backbomebtn: GameUtil.Menu = new GameUtil.Menu(this,'backhomebtn_png','backhomebtn_png',this.backhome);
        backbomebtn.x = this.mStageW/2;
        backbomebtn.y = continubtn.y + 183;
        this.discovercont.addChild(backbomebtn);

    }

    private continugame()
    {
        this.gamestate = GameState.gaming;
        this.discovercont.removeChildren();
        this.removeChild(this.discovercont);
    }
    private backhome()
    {
        egret.clearInterval(TimePanel._i().intervaltag);
        TimePanel._i().removeChildren();
        GameUtil.GameScene.runscene(new StartGameScene());
    }

    private touchgamescene(evt:egret.TouchEvent)
    {
        //console.log('touchgamescene====',evt);
        //TimePanel._i().cutTimesc();
        var wrongtip: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('wrongpic_png'),evt.stageX,evt.stageY);
        this.addChild(wrongtip);
        var self: any = this;
        egret.setTimeout(function(){
            self.removeChild(wrongtip);
        },this,500);
    }

    public nextgame()
    {
        GameUtil.GameConfig._i().bfirstplay = false;
        if(this.curstage == this.Totalstage)
        {
            this.passgame();
        }
        else
        {
            this.curtouchdone = 0;
            this.curstage++;
            this.curstagetext.setText('Stage '+this.curstage+'/10');

            //AdaptGamelayer._i().removeChildren();
            this.showAdapLayer();
            //AdaptGamelayer._i().adpat(false);
        }

    }

    public gameover()
    {

        //console.log('gameoverfjdksal;');

        GameUtil.GameConfig._i().bfirstplay = false;
        this.gamestate = GameState.gameover;
        this.addChild(this.discovercont);
        this.discovercont.touchEnabled = true;

        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
        this.discovercont.addChild(shap);

        var frame: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('failframe_png'),this.mStageW/2,GameUtil.setscreenY(693));
        this.discovercont.addChild(frame);

        var text: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,frame.y-135,50);
        text.$setWidth(422);
        text.setText('还差一点就通关了再接再励哦!!!');
        text.textAlign = egret.HorizontalAlign.CENTER;
        this.discovercont.addChild(text);

        var playagainbtn: GameUtil.Menu = new GameUtil.Menu(this,'playagainbtn_png','playagainbtn_png',this.playagain);
        playagainbtn.x = this.mStageW/2;
        playagainbtn.y = frame.y + 25;
        this.discovercont.addChild(playagainbtn);

        var sharebtn: GameUtil.Menu = new GameUtil.Menu(this,'sharebtn_png','sharebtn_png',this.sharegmae);
        sharebtn.x = this.mStageW/2;
        sharebtn.y = playagainbtn.y + 131;
        this.discovercont.addChild(sharebtn);

    }

    private passgame()
    {
        this.bpassgame = true;
        egret.clearInterval(TimePanel._i().intervaltag);
        this.gamestate = GameState.gameover;
        this.addChild(this.discovercont);
        this.discovercont.touchEnabled = true;

        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
        this.discovercont.addChild(shap);

        var frame: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('successframe_png'),this.mStageW/2,GameUtil.setscreenY(693));
        this.discovercont.addChild(frame);

        var text: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('passtext_png'),this.mStageW/2,frame.y -135);
        this.discovercont.addChild(text);


        var costimetext: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,frame.y-60,40);
        costimetext.textColor = 0xffffff;
        costimetext.setText('您的成绩是'+Math.ceil(GameScene._i().costime/1000)+'秒');
        this.discovercont.addChild(costimetext);

        var playagainbtn: GameUtil.Menu = new GameUtil.Menu(this,'playagainbtn_png','playagainbtn_png',this.playagain);
        playagainbtn.x = this.mStageW/2;
        playagainbtn.y = frame.y + 25;
        this.discovercont.addChild(playagainbtn);

        var sharebtn: GameUtil.Menu = new GameUtil.Menu(this,'sharebtn_png','sharebtn_png',this.sharegmae);
        sharebtn.x = this.mStageW/2;
        sharebtn.y = playagainbtn.y + 131;
        this.discovercont.addChild(sharebtn);
    }

    private playagain()
    {
        this.costime = 0;
        this.bpassgame = false;
        this.curstage = 1;
        this.curstagetext.setText('Stage '+this.curstage+'/10');
        TimePanel._i().reset();
        AdaptGamelayer._i().removeChildren();
        this.showAdapLayer();
        AdaptGamelayer._i().adpat();
        GameUtil.GameScene.runscene(GameScene._i());
    }
    private sharegmae()
    {
        console.log('sharegame');
        var discont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        this.addChild(discont);

        var self: any = this;
        var discover: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,0.6);
        discont.addChild(discover);
        discover.touchEnabled = true;
        discover.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            self.removeChild(discont);
        },this)

        var sharetip: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('sharetip_png'),this.mStageW,0);
        sharetip.setanchorOff(1,0);
        discont.addChild(sharetip);


        if(this.bpassgame)
        {
            SharePage._i().setdesctext('你还一脸懵逼，我用了'+Math.ceil(this.costime/1000)+'秒就已看透一切！');
        }
        else
        {
            SharePage._i().setdesctext('据说这是今年最好玩的找茬游戏！');
        }
    }


    private static inst: GameScene;
    public static _i(): GameScene
    {
        if(this.inst==null)
        {
            this.inst = new GameScene();
        }

        return this.inst;
    }

}