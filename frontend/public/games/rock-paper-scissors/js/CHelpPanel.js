function CHelpPanel(){
    var _oFade;
    var _oFadeListener;
    var _oBg;
    var _oPanelContainer;
    var _oContentContainer;
    var _oContinueBut;
    var _oBackBut;
    var _oSkipBut;
    var _pStartPosSkip;
    var _pStartPosContinue;
    var _pStartPosBack;
    
    var _oMatchesBitmap;
   
    var _iPageN;

    this._init = function(){
        _iPageN = 1;
        _oPanelContainer = new createjs.Container();
        _oPanelContainer.x = -600;
        _oContentContainer = new createjs.Container();
        var oSpriteBg = s_oSpriteLibrary.getSprite('help_panel');
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH/2 - 320;
        _oBg.y = 100;
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        
        
        _oPanelContainer.addChild(_oBg);
        _oPanelContainer.addChild(_oContentContainer);
        s_oStage.addChild(_oFade);
        s_oStage.addChild(_oPanelContainer);
        
        this.initHelpPage1();

        var iArrowOffset = 260;

        var oSpriteBack = s_oSpriteLibrary.getSprite('but_left');        
        _pStartPosBack = {x: CANVAS_WIDTH * 0.5 - oSpriteBack.width/2 - iArrowOffset, y: CANVAS_HEIGHT * 0.5 + 150};
        _oBackBut = new CGfxButton(_pStartPosBack.x, _pStartPosBack.y, oSpriteBack, _oPanelContainer);
        _oBackBut.addEventListener(ON_MOUSE_UP, this._onBack, this);

        var oSpriteContinue = s_oSpriteLibrary.getSprite('but_right');        
        _pStartPosContinue = {x: CANVAS_WIDTH * 0.5 + oSpriteContinue.width/2 + iArrowOffset, y: CANVAS_HEIGHT * 0.5 + 150};
        _oContinueBut = new CGfxButton(_pStartPosContinue.x, _pStartPosContinue.y, oSpriteContinue, _oPanelContainer);
        _oContinueBut.addEventListener(ON_MOUSE_UP, this._onContinue, this);

        var oSpriteSkip = s_oSpriteLibrary.getSprite('but_skip');        
        _pStartPosSkip = {x: CANVAS_WIDTH * 0.5, y: CANVAS_HEIGHT * 0.5 + 190};
        _oSkipBut = new CGfxButton(_pStartPosSkip.x, _pStartPosSkip.y, oSpriteSkip, _oPanelContainer);
        _oSkipBut.addEventListener(ON_MOUSE_UP, this._onExitHelp, this);
        _oFadeListener = _oFade.on("click", function(){});
        _oContentContainer.x = 290
        _oContentContainer.y = 230;
        this.show();
       
    };

    this.initHelpPage1 = function()
    {
        var iWidth = 300;
        var iHeight = 44;
        var iX = 300 - iWidth/2;
        var iY = -85;
        var oTitle = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    42, "center", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_HELP_TITLE2,
                    true, true, false,
                    false 
        );
        
        var iWidth = 595;
        var iHeight = 200;
        var iX = 300 - iWidth/2;
        var iY = -20;
        var oTextRules = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    28, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_GAME_RULES,
                    true, true, true,
                    false 
        );

    };

    this.initHelpPage2 = function() 
    {
        _oMatchesBitmap = createBitmap(s_oSpriteLibrary.getSprite("help_content"));
        _oContentContainer.addChild(_oMatchesBitmap);

        var iWidth = 300;
        var iHeight = 44;
        var iX = 300 - iWidth/2;
        var iY = -85;
        var oTitle = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    42, "center", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_HELP_TITLE1,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5;
        var iY = -42;
        var oTextRW = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_ROCK_WINS,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5;
        var iY = -42 + 82;
        var oTextRL = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_ROCK_LOSE,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5;
        var iY = -42 + 82 + 82;
        var oTextRD = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_ROCK_DRAW,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5 + 210;
        var iY = -42;
        var oTextPW = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_PAPER_WINS,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5 + 210;
        var iY = -42 + 82;
        var oTextPL = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_PAPER_LOSE,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5 + 210;
        var iY = -42 + 82 + 82;
        var oTextPD = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_PAPER_DRAW,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5 + 210 + 210;
        var iY = -42;
        var oTextSW = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_SCISSORS_WINS,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5 + 210 + 210;
        var iY = -42 + 82;
        var oTextSL = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_SCISSORS_LOSE,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 44;
        var iX = 5 + 210 + 210;
        var iY = -42 + 82 + 82;
        var oTextSD = new CTLText(_oContentContainer, 
                    iX, iY, iWidth, iHeight, 
                    38, "left", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_SCISSORS_DRAW,
                    true, true, false,
                    false 
        );
        
    };

    
    // BACK TO FIRST HELP PAGE
    this._onBack = function() {
        _iPageN--;
       if (_iPageN < 1)
            _iPageN = 1;
        this.removePage();

    };
    
   this.removePage = function ()
   {
     _oContentContainer.removeAllChildren();
        switch (_iPageN) {
            case 1:
                this.initHelpPage1 ();
                break;
            case 2:
                this.initHelpPage2();
                break;
           
            default:

                break;
        }
   };
    
    // CREATE A SECOND HELP PAGE
    this._onContinue = function() {
        _iPageN++;
        if (_iPageN > 2)
            _iPageN = 2;
        this.removePage();
    };

    this.unload = function(){
        _oFade.off("click",_oFadeListener);
        s_oStage.removeChild(_oPanelContainer, _oFade);
        _oContinueBut.unload();
        _oBackBut.unload();
        _oSkipBut.unload();

    };
    this.show = function ()
    {
      new createjs.Tween.get(_oPanelContainer).to({x: 0}, 1200, createjs.Ease.elasticOut);
    };
    this._onExitHelp = function(){
        this.unload();
        setTimeout( s_oGame._onExitHelp, 200);
    };

    this._init();

}