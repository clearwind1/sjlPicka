/**
 * Created by pior on 16/3/17.
 */
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        _super.call(this);
    }
    var d = __define,c=StartGameScene;p=c.prototype;
    p.init = function () {
        this.showbg();
    };
    p.showbg = function () {
        var bg = new GameUtil.MyBitmap(RES.getRes('startbg_png'), this.mStageW / 2, 0);
        bg.setanchorOff(0.5, 0);
        this.addChild(bg);
        var title = new GameUtil.MyBitmap(RES.getRes('gametitle_png'), this.mStageW / 2, 421);
        this.addChild(title);
        var startbtn = new GameUtil.Menu(this, 'startbtn_png', 'startbtn_png', this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW / 2;
        startbtn.y = GameUtil.setscreenY(940);
        this.addChild(startbtn);
        var enjoymodebtn;
        if (!GameUtil.GameConfig._i().bfirstplay) {
            enjoymodebtn = new GameUtil.Menu(this, 'enjoymodebtn_png', 'enjoymodebtn_png', this.enjoymodegame);
            enjoymodebtn.setScaleMode();
        }
        else {
            enjoymodebtn = new GameUtil.Menu(this, 'enjoymodebtnb_png', 'enjoymodebtnb_png', this.callnull);
        }
        enjoymodebtn.x = this.mStageW / 2;
        enjoymodebtn.y = GameUtil.setscreenY(1115);
        this.addChild(enjoymodebtn);
        var tiptext = new GameUtil.MyTextField(this.mStageW / 2, GameUtil.setscreenY(1304), 15);
        tiptext.setText('盛讯游戏出品');
        tiptext.textColor = 0x8a998d;
        tiptext.touchEnabled = true;
        this.addChild(tiptext);
        this.addChild(SharePage._i());
        SharePage._i().getSignPackage();
    };
    p.startgame = function () {
        GameUtil.GameScene.runscene(GameScene._i());
    };
    p.enjoymodegame = function () {
        GameUtil.GameScene.runscene(new EnjoyModeScene());
    };
    p.callnull = function () {
    };
    return StartGameScene;
})(GameUtil.BassPanel);
egret.registerClass(StartGameScene,"StartGameScene");
