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
        var enjoymodebtn = new GameUtil.Menu(this, 'enjoymodebtn_png', 'enjoymodebtn_png', this.enjoymodegame);
        enjoymodebtn.setScaleMode();
        enjoymodebtn.x = this.mStageW / 2;
        enjoymodebtn.y = GameUtil.setscreenY(1115);
        this.addChild(enjoymodebtn);
    };
    p.startgame = function () {
        GameUtil.GameScene.runscene(GameScene._i());
    };
    p.enjoymodegame = function () {
    };
    return StartGameScene;
})(GameUtil.BassPanel);
egret.registerClass(StartGameScene,"StartGameScene");
