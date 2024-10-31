function CAreYouSurePanel() {

    var _oButYes;
    var _oButNo;
    var _oFade;
    var _oFadeListener;
    var _oPanelContainer;
    var _oParent = this;
    
    var _pStartPanelPos;

    this._init = function () {
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFadeListener = _oFade.on("click",function(){});
        s_oStage.addChild(_oFade);
        
        new createjs.Tween.get(_oFade).to({alpha:0.7},200);
        
        var oSpritePanel = s_oSpriteLibrary.getSprite('msg_box');

        _pStartPanelPos = {x: CANVAS_WIDTH/2, y: -oSpritePanel.height/2};

        _oPanelContainer = new createjs.Container();   
        _oPanelContainer.x = _pStartPanelPos.x;     
        _oPanelContainer.y = _pStartPanelPos.y;     
        _oPanelContainer.regX = oSpritePanel.width/2;     
        _oPanelContainer.regY = oSpritePanel.height/2;     
        s_oStage.addChild(_oPanelContainer);
        
        
        var oPanel = createBitmap(oSpritePanel);  
        _oPanelContainer.addChild(oPanel);

        var oSprite = s_oSpriteLibrary.getSprite('but_yes');
        _oButYes = new CGfxButton(oSpritePanel.width/2 + 80, oSpritePanel.height - oSprite.height/2 - 20, oSprite, _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_no');
        _oButNo = new CGfxButton(oSpritePanel.width/2 - 80, oSpritePanel.height - oSprite.height/2 - 20, oSprite, _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        
        _oButNo.disable();
        _oButYes.disable();

        var iWidth = oSpritePanel.width-50;
        var iHeight = 140;
        var iX = oSpritePanel.width/2 - iWidth/2;
        var iY = 140 - iHeight/2;
        var oTitle = new CTLText(_oPanelContainer, 
                    iX, iY, iWidth, iHeight, 
                    70, "center", "#ab152c", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_ARE_SURE,
                    true, true, true,
                    false 
        );

        new createjs.Tween.get(_oPanelContainer)
        .to({y:CANVAS_HEIGHT/2},200, createjs.Ease.backOut)
        .call(function(){
            _oButNo.enable();
            _oButYes.enable();

            s_oGame.togglePause();
            s_oMain.stopUpdateNoBlock();            
        });
    };

    this._onButYes = function () {
        s_oMain.startUpdateNoBlock();

        _oButNo.disable();
        _oButYes.disable();
        
        new createjs.Tween.get(_oFade).to({alpha:0},200);
        new createjs.Tween.get(_oPanelContainer).to({y:_pStartPanelPos.y},400, createjs.Ease.backIn).call(function(){

            _oParent.unload();
            s_oGame.onExit();
            
        }); 
    };

    this._onButNo = function () {
        s_oGame.togglePause();
        s_oMain.startUpdateNoBlock();

        _oButNo.disable();
        _oButYes.disable();
        
        new createjs.Tween.get(_oFade).to({alpha:0},500);
        new createjs.Tween.get(_oPanelContainer).to({y:_pStartPanelPos.y},400, createjs.Ease.backIn).call(function(){
            _oParent.unload();
        }); 
        
        
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();

        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        _oFade.off("click",_oFadeListener);
    };

    this._init();
}

