function CSelectPlayers ()
{
    var _oSelectPlayerContainer;
    var _oBgSprite;
    var _oButSinglePlayer;
    var _oButMultiPlayer;

    this.init = function ()
    {
        var oSpriteBg = s_oSpriteLibrary.getSprite("game_section");
        _oSelectPlayerContainer = new createjs.Container();
        _oSelectPlayerContainer.x = CANVAS_WIDTH/2;
        _oSelectPlayerContainer.y = CANVAS_HEIGHT;
        _oSelectPlayerContainer.regX = oSpriteBg.width/2;
        s_oStage.addChild(_oSelectPlayerContainer);

        _oBgSprite = createBitmap(oSpriteBg);
        _oSelectPlayerContainer.addChild(_oBgSprite);
        
        var iWidth = oSpriteBg.width/2;
        var iHeight = 60;
        var iX = oSpriteBg.width/2 - iWidth/2;
        var iY = 20;
        var _oTextLabel = new CTLText(_oSelectPlayerContainer, 
                    iX, iY, iWidth, iHeight, 
                    56, "center", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_SELECT_PLAYERS,
                    true, true, false,
                    false 
        );

        var oSinglePlayerSprite = s_oSpriteLibrary.getSprite("but_solo");
        _oButSinglePlayer = new CGfxButton(229, 144, oSinglePlayerSprite, _oSelectPlayerContainer);
        _oButSinglePlayer.addEventListener(ON_MOUSE_UP, this.soloSelected, this);
        
        var oMultiPlayerSprite = s_oSpriteLibrary.getSprite("but_multi");
        _oButMultiPlayer = new CGfxButton(687, 144, oMultiPlayerSprite, _oSelectPlayerContainer);
        _oButMultiPlayer.addEventListener(ON_MOUSE_UP, this.multiSelected, this);

        this.show();
        
    };

    this.show = function (){
        _oButMultiPlayer.disable();
        _oButSinglePlayer.disable();

        new createjs.Tween.get(_oSelectPlayerContainer)
        .to({y:85}, 500, createjs.Ease.cubicOut)
        .call(function(){
            _oButMultiPlayer.enable();
            _oButSinglePlayer.enable();
        });
    };

    this.unload = function (){
        _oButMultiPlayer.unload();
        _oButSinglePlayer.unload();

        s_oStage.removeChild(_oSelectPlayerContainer);
    };

    this.soloSelected = function (){
        this.unload();
        s_oGame.initGameSolo();
    };

    this.multiSelected = function (){
        this.unload();
        s_oGame.initGameMulti();
    };
    
    
    this.init();
}

