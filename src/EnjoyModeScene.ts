/**
 * Created by pior on 16/3/22.
 */

class EnjoyModeScene extends GameUtil.BassPanel
{

    private smAdpl: AdaptGamelayer;
    private bigAdpl: egret.DisplayObjectContainer;

    private curpage: number;

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
        this.curpage = 1;

        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1,0x4b3c43);
        this.addChild(shap);

        this.bigAdpl = new egret.DisplayObjectContainer();
        this.addChild(this.bigAdpl);

        this.smAdpl = new AdaptGamelayer();
        this.addChild(this.smAdpl);
        this.smAdpl.initlayer(this.mStageH);
        this.showAdpl();
        this.smAdpl.adpat();

        var btname:string[] = ['leftbtn_png','returnbtn_png','rightbtn_png'];
        var btncall: Function[] = [this.uppage,this.returnhome,this.downpage];
        for(var i:number=0;i < 3;i++){
            var btn: GameUtil.Menu = new GameUtil.Menu(this,btname[i],btname[i],btncall[i]);
            btn.x = 80+300*i;
            btn.y = GameUtil.setscreenY(1272);
            this.addChild(btn);
        }

        //this.bigAdpl = new egret.DisplayObjectContainer();


    }

    private showAdpl()
    {
        this.bigAdpl.removeChildren();

        var pic: GameUtil.Menu = new GameUtil.Menu(this,'showall'+this.curpage +'_jpg','showall'+this.curpage+'_jpg',this.nulcall);
        pic.x = this.mStageW/2;
        pic.y = this.mStageH/2;
        this.bigAdpl.addChild(pic);

        var dectexts: string[] = ['技能:吞噬力量(自动),每杀一个敌人就把那人横放在身下,使自己的体力+1(可叠加)','技能:戌己杏黄旗(自动),一回合内自动抵挡第一次伤害(不能抵挡控制);\n技能:辅佐(自动),法力上限提升到10点',
        '技能:战神之力(手动),使一个将士本回合武力+1','技能:魅惑(手动),移动后选择一个相邻的敌方将士本回合变为我方人物,令其原地行动一次','技能:引燃之火(手动),对距离2~3格的一个将士及其相邻者造成2点伤害',
        '技能:激流之水(手动),对前方同竖列最近4格将士造成2点伤害','技能:飞行(自动),移动时可越过敌人','技能:毒雾(手动),对距离2格及其相邻格子造成3点伤害(可攻击空地)','技能:潜行(自动),以反面上场和移动,不能被敌方选为目标,若发起战斗或受到范围伤害才翻面结算;\n技能:百步红珠(手动),对距离2~3格的一个将士造成3点伤害',
        '技能:太阳金针(手动),可在移动后(也可在原地)对周围距离1~2格全部敌方将士造成2点伤害'];
        var decheronames: string[] = ['食人猛士','姜子牙','蚩尤','苏妲己','御火法师','御水法师','雷震子','常昊','戴礼','高兰英'];
        var dectext: GameUtil.MyTextField = new GameUtil.MyTextField(40,GameUtil.setscreenY(1165),30,0,1);
        dectext.$setWidth(660);
        dectext.$setHeight(250);
        dectext.textColor = 0xffffff;
        dectext.setText('');
        this.bigAdpl.addChild(dectext);
        dectext.textFlow = new Array<egret.ITextElement>(
            {text:"【"},
            { text:decheronames[this.curpage-1], style: { "textColor":0xff0000} }
            ,{ text:"】" },
            { text:dectexts[this.curpage-1], style: { } }
        );
        dectext.verticalAlign = egret.VerticalAlign.BOTTOM;


        //for(var j:number=0;j < 2;j++){
        //    var cur: number = this.curpage*2 - j;
        //    var pic: GameUtil.Menu = new GameUtil.Menu(this,'downpic'+cur+'_png','downpic'+cur+'_png',this.showbigpic,[cur]);
        //    pic.x = 378;
        //    pic.y = 300+j*602;
        //    this.smAdpl.putItme(pic);
        //}
    }

    private uppage()
    {
        if(this.curpage == 1){
            this.curpage = 10;
        }
        else
        {
            this.curpage--;
        }

        this.showAdpl();

    }
    private downpage()
    {
        if(this.curpage == 10){
            this.curpage = 1;
        }
        else
        {
            this.curpage++;
        }

        this.showAdpl();
    }

    private showbigpic(curid:number)
    {
        this.addChild(this.bigAdpl);
        var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1,0x4b3c43);
        this.bigAdpl.addChild(shap);
        shap.touchEnabled = true;

        var apd: AdaptGamelayer = new AdaptGamelayer();
        apd.initlayer(this.mStageH);
        this.bigAdpl.addChild(apd);

        var pic: GameUtil.Menu = new GameUtil.Menu(this,'showall'+curid+'_png','showall'+curid+'_png',this.nulcall);
        pic.x = this.mStageW/2;
        pic.y = this.mStageH/2;
        apd.putItme(pic);
        apd.adpat();

        var btn: GameUtil.Menu = new GameUtil.Menu(this,'returnbtn_png','returnbtn_png',this.returnscene);
        btn.x = 380;
        btn.y = GameUtil.setscreenY(1272);
        this.bigAdpl.addChild(btn);


    }

    private returnscene()
    {
        this.bigAdpl.removeChildren();
        this.removeChild(this.bigAdpl);
    }

    private nulcall()
    {

    }

    private returnhome()
    {
        GameUtil.GameScene.runscene(new StartGameScene());
    }

}