function CRecordPanel ()
{
    var _oContainer;
    var _oBg;
    var _oLabel;
    var _oTextScore;
    var _oTextBestScore;
    var _oTextMatchWins;
    var _oTextSecondPlayerMatchWins;
    this.init = function ()
    {
        if (s_oGame.isMultiPlayer())
        {
           this.initMultiPanel(); 
        }
        else
        {
            this.initSoloPanel();
        }
    };
    this.initSoloPanel = function ()
    {
        _oContainer = new createjs.Container();
        _oBg = createBitmap(s_oSpriteLibrary.getSprite("box_record"));
        _oContainer.addChild(_oBg);
        var oContainerBounds = _oContainer.getBounds();

        _oContainer.x = 490;
        _oContainer.y = 800;
        
        var iWidth = 100;
        var iHeight = 34;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 5;
        _oLabel = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    32, "center", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_RECORD_BOX,
                    true, true, false,
                    false 
        );


        var iWidth = 180;
        var iHeight = 22;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 50;
        _oTextMatchWins = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    22, "left", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_MATCHES + s_iMatchWon,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 22;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 85;
        _oTextScore = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    22, "left", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_SCORE + s_oGame.getScore(),
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 22;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 115;
        _oTextBestScore = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    22, "left", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_YOUR_BEST_SCORE + s_oGame.getBestScore(),
                    true, true, false,
                    false 
        );

        this.show();
        s_oStage.addChild (_oContainer);
    };
    this.initMultiPanel = function ()
    {
        _oContainer = new createjs.Container();
        _oBg = createBitmap(s_oSpriteLibrary.getSprite("box_record"));
        _oContainer.addChild(_oBg);
        var oContainerBounds = _oContainer.getBounds();

        _oContainer.x = 490;
        _oContainer.y = 800;
        
        var iWidth = 100;
        var iHeight = 34;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 5;
        _oLabel = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    32, "center", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_RECORD_BOX,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 30;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 60;
        _oTextMatchWins = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    28, "left", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_PLAYER_ONE_MATCHES_WON + s_iPlayerOneMatchWon + TEXT_PLAYER_ONE_MATCHES_WON2,
                    true, true, false,
                    false 
        );

        var iWidth = 180;
        var iHeight = 30;
        var iX = oContainerBounds.width /2 - iWidth/2;
        var iY = 110;
        _oTextScore = new CTLText(_oContainer, 
                    iX, iY, iWidth, iHeight, 
                    28, "left", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_PLAYER_TWO_MATCHES_WON + s_iPlayerTwoMatchWon + TEXT_PLAYER_TWO_MATCHES_WON2,
                    true, true, false,
                    false 
        );
        
        this.show();
        

        s_oStage.addChild (_oContainer);
    };
    this.show = function ()
    {
      new createjs.Tween.get(_oContainer).wait(400).to({y:390}, 600, createjs.Ease.backOut);  
    };
    this.updateScore = function ()
    {
        if (!s_oGame.isMultiPlayer())
        {
    _oTextMatchWins.refreshText(TEXT_MATCHES + s_iMatchWon);
    _oTextScore.refreshText(TEXT_SCORE + s_oGame.getScore());
    _oTextBestScore.refreshText(TEXT_YOUR_BEST_SCORE + s_oGame.getBestScore());
        }
        else
        {
           _oTextMatchWins.refreshText(TEXT_PLAYER_ONE_MATCHES_WON + s_iPlayerOneMatchWon + TEXT_PLAYER_ONE_MATCHES_WON2);
            _oTextScore.refreshText(TEXT_PLAYER_TWO_MATCHES_WON + s_iPlayerTwoMatchWon + TEXT_PLAYER_TWO_MATCHES_WON2);
        }
    };
    this.init();
}