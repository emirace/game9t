function CCreditsPanel(){
    
    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;
    var _oFade;
    var _oListener;
    
    var _oHitArea;
    
    var _oLink;
    
    var _oContainer;
    
    this._init = function(){
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        s_oStage.addChild(_oFade);
        new createjs.Tween.get(_oFade).to({alpha:0.7},500);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        s_oStage.addChild(_oHitArea);

        var oSpriteMsgBox = s_oSpriteLibrary.getSprite('msg_box');
        
        _oContainer = new createjs.Container();
        _oContainer.regX = oSpriteMsgBox.width/2;
        _oContainer.regY = oSpriteMsgBox.height/2;
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT + oSpriteMsgBox.height/2;
        s_oStage.addChild(_oContainer);

        
        _oBg = createBitmap(oSpriteMsgBox);
        _oContainer.addChild(_oBg);
                
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(oSpriteMsgBox.width - oSprite.width/2 - 10, oSprite.height/2, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);

        oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = createBitmap(oSprite);
        _oButLogo.regX = oSprite.width/2;
        _oButLogo.regY = oSprite.height/2;
        _oButLogo.x = oSpriteMsgBox.width/2;
        _oButLogo.y = oSpriteMsgBox.height/2 +20;
        _oContainer.addChild(_oButLogo);

        var iWidth = oSpriteMsgBox.width-50;
        var iHeight = 70;
        var iX = oSpriteMsgBox.width/2 - iWidth/2;
        var iY = _oButLogo.y - oSprite.height/2 - iHeight;
        var oTitle = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    50, "center", "#cc0000", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_CREDITS_DEVELOPED,
                    true, true, false,
                    false 
        );
		
        var iWidth = oSpriteMsgBox.width-50;
        var iHeight = 70;
        var iX = oSpriteMsgBox.width/2 - iWidth/2;
        var iY = _oButLogo.y + oSprite.height/2;
        var oTitle = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    50, "center", "#cc0000", PRIMARY_FONT, 1.1,
                    2, 2,
                    "www.codethislab.com",
                    true, true, false,
                    false 
        );
        
	    new createjs.Tween.get(_oContainer).to({y:CANVAS_HEIGHT/2},1000, createjs.Ease.quintOut);	
    };
    
    this.unload = function(){
        _oHitArea.off("click", _oListener);
        
        _oButExit.unload(); 
        _oButExit = null;
        
        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oContainer);
        s_oStage.removeChild(_oHitArea);
    };
    
    this._onLogoButRelease = function(){
        window.open("http://www.codethislab.com/index.php?&l=en","_blank");
    };
    
    this._init();
    
    
};


