function CGameSection()
{
    var _oSectionContainer;
    var _oMsgBoxContainer;
    var _oContainerTextTurn;
    var _oVSText;
    var _oTextContinue;
    var _oMatchOverText;
    var _oHandsContainer;
    var _aPlayerOneSprites;
    var _aPlayerTwoSprites;
    var _aSpritesArrays;
    var _oHitArea;
    var _oListener;
    var _iTweenCounter;
    var _bRoundEnded;
    var _bMatchEnded = false;
    var _oTextTurn;
    var _oSound;
    this.init = function ()
    {
        s_oGameSection = this;
        _oSound = playSound("throw");
        _oSound.stop();
        
        var oBgSprite = s_oSpriteLibrary.getSprite("game_section");
        _oSectionContainer = new createjs.Container();
        _oSectionContainer.x = CANVAS_WIDTH/2;
        _oSectionContainer.y = 85;
        _oSectionContainer.regX = oBgSprite.width/2;
        s_oStage.addChild(_oSectionContainer);

        var oBg = createBitmap(oBgSprite);
        _oSectionContainer.addChild(oBg);

        _oHandsContainer = new createjs.Container();
        _oSectionContainer.addChild(_oHandsContainer);

        var iX = 90;
        var iY = 30;
        _oContainerTextTurn = new createjs.Container();
        _oContainerTextTurn.x = iX;
        _oContainerTextTurn.y = iY;
        _oSectionContainer.addChild(_oContainerTextTurn);

        var iWidth = 200;
        var iHeight = 80;
        _oTextTurn = new CTLText(_oContainerTextTurn, 
                    0, 0, iWidth, iHeight, 
                    60, "center", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    " ",
                    true, true, false,
                    false 
        );
        
        var iWidth = 100;
        var iHeight = 80;
        var iX = oBgSprite.width/2 - iWidth/2;
        var iY = 80;
        _oVSText = new CTLText(_oSectionContainer, 
                    iX, iY, iWidth, iHeight, 
                    70, "center", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_VS,
                    true, true, false,
                    false 
        );
        _oVSText.setVisible(false);

        var iWidth = 400;
        var iHeight = 40;
        var iX = oBgSprite.width/2 - iWidth/2;
        var iY = 230;
        _oTextContinue = new CTLText(_oSectionContainer, 
                    iX, iY, iWidth, iHeight, 
                    40, "center", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    TEXT_CONTINUE,
                    true, true, false,
                    false 
        );
        _oTextContinue.setVisible(false);
        
        _aPlayerOneSprites = [];
        _aPlayerTwoSprites = [];

        _iTweenCounter = 0;
        _bRoundEnded = false;
        for (var i = 0; i < 3; i++) {
            oSprite = createBitmap(s_oSpriteLibrary.getSprite("p1_" + i));
            oSprite.y = 50 + oSprite.getBounds().height / 2;
            oSprite.x = 50 + oSprite.getBounds().width / 2;
            oSprite.regX = oSprite.getBounds().width / 2;
            oSprite.regY = oSprite.getBounds().height / 2;
            _aPlayerOneSprites.push(oSprite);
            _oHandsContainer.addChild(oSprite);
            oSprite.visible = false;
        }
        for (var i = 0; i < 3; i++) {
            oSprite = createBitmap(s_oSpriteLibrary.getSprite("p2_" + i));
            oSprite.y = 50 + oSprite.getBounds().height / 2;
            oSprite.x = 590 + oSprite.getBounds().width /2;
            oSprite.regX = oSprite.getBounds().width / 2;
            oSprite.regY = oSprite.getBounds().height / 2;
            _aPlayerTwoSprites.push(oSprite);
            _oHandsContainer.addChild(oSprite);
            oSprite.visible = false;
        }
        _aSpritesArrays = [_aPlayerOneSprites, _aPlayerTwoSprites];
        var _oContainerBounds = _oSectionContainer.getBounds();
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,0,0,1)").drawRect(0, 0, _oContainerBounds.width, _oContainerBounds.height);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this.nextRound);
        _oHitArea.visible = false;
        _oSectionContainer.addChild(_oHitArea);
        
        var oMsgBoxBgSprite = s_oSpriteLibrary.getSprite("msg_box");

        _oMsgBoxContainer = new createjs.Container();
        _oMsgBoxContainer.x = CANVAS_WIDTH/2 - oMsgBoxBgSprite.width/2;
        _oMsgBoxContainer.y = 600;

        oBg = createBitmap(oMsgBoxBgSprite);
        _oMsgBoxContainer.addChild(oBg);

        var iWidth = oMsgBoxBgSprite.width - 60;
        var iHeight = oMsgBoxBgSprite.height - 100;
        var iX = oMsgBoxBgSprite.width/2 - iWidth/2;
        var iY = oMsgBoxBgSprite.height/2 - iHeight/2;
        _oMatchOverText = new CTLText(_oMsgBoxContainer, 
                    iX, iY, iWidth, iHeight, 
                    68, "center", "#c84343", PRIMARY_FONT, 1.1,
                    2, 2,
                    " ",
                    true, true, true,
                    false 
        );
    };


    this.toggleVisibleText = function (){
        _oVSText.setVisible(!_oVSText.isVisible());
        _oTextContinue.setVisible(!_oTextContinue.isVisible());
    };

    this.unload = function ()
    {   
        _oHitArea.off("click",_oListener);
        s_oStage.removeChild(_oSectionContainer);
    };

    this.matchOver = function (szMsg){
        s_oStage.addChild(_oMsgBoxContainer);

        _bMatchEnded = true;
        _oHandsContainer.alpha = 0.5;
        this.toggleVisibleText();
        
        _oMatchOverText.refreshText(szMsg);

        new createjs.Tween.get(_oMsgBoxContainer).to({ y: CANVAS_HEIGHT - 550}, 600);
    };

    this.nextRound = function (){
        s_oStage.removeChild(_oMsgBoxContainer);
        _oHandsContainer.alpha = 1;
        if (!s_bOnSelect && !_bMatchEnded)
        {
            _oHitArea.visible = false;

            s_oGame.nextRound();
            s_oGameSection.toggleVisibleText();

            for (var i = 0; i < _aPlayerOneSprites.length; i++) {
                _aPlayerOneSprites[i].visible = false;
            }
            for (var i = 0; i < _aPlayerTwoSprites.length; i++) {
                _aPlayerTwoSprites[i].visible = false;
            }
            _bRoundEnded = false;
        } else
        {
            s_oGame.restart();
        }
    };

    this.showThrowes = function (playerOne, playerTwo){
            _oVSText.setVisible(true);
            _oTextTurn.setVisible(false);
            _oHitArea.visible = false;
            _aPlayerOneSprites[0].visible = true;
            _aPlayerOneSprites[0].alpha = 1;

            _aPlayerTwoSprites[0].visible = true;
            _aPlayerTwoSprites[0].alpha = 1;
            
            new createjs.Tween.get(_oHandsContainer)
            .to({y: -30}, 200)
            .call(this.playThrow)
            .to({y: +30}, 200)
            .call(this.playThrow)
            .to({y: -30}, 400)
            .call(this.playThrow)
            .to({y: +30}, 200) 
            .call(this.playThrow)
            .to({y: 0}, 200)
            .call(function (){
                _oThis._showThrowes(playerOne, playerTwo);
                s_oGame.compareThrowes();
                _oTextContinue.setVisible(true);

            }
            );
        
    };
    this.playThrow = function ()
    {
       _oSound.play();
    }
    this._showThrowes = function (playerOne, playerTwo)
    {
        createjs.Tween.removeTweens(_oHandsContainer);
        if (!_bRoundEnded)
        {
            for (var i = 0; i < _aPlayerOneSprites.length; i++) {
                _aPlayerOneSprites[i].visible = false;
                _aPlayerOneSprites[i].alpha = 1;
            }
            for (var i = 0; i < _aPlayerTwoSprites.length; i++) {
                _aPlayerTwoSprites[i].visible = false;
                _aPlayerTwoSprites[i].alpha = 1;

            }
            _aPlayerOneSprites[playerOne].visible = true;
            _aPlayerTwoSprites[playerTwo].visible = true;
            _oHitArea.visible = true;

        }
        _bRoundEnded = true;

    };

    this.playerWonEffect = function (playerID)
    {
        var scale = 1.2;
        var time = 200;
            for (var i = 0; i < _aSpritesArrays[playerID].length; i++) {
                new createjs.Tween.get(_aSpritesArrays[playerID][i])
                        .to({scaleX: scale, scaleY: scale}, time)
                        .to({scaleX: 1, scaleY: 1}, time)
                        .to({scaleX: scale, scaleY: scale}, time)
                        .to({scaleX: 1, scaleY: 1}, time);
            }
    };
    this.playerLoseEffect = function (playerID)
    {
      var rotation = 10 * (Math.random() * 2);
      var time = 100;
            for (var i = 0; i <  _aSpritesArrays[playerID].length; i++) {
                new createjs.Tween.get(_aSpritesArrays[playerID][i])
                        .to({rotation: rotation}, time)
                        .to({rotation: -rotation, alpha: 0.5}, time*2)
                        .to({rotation: rotation}, time)
                        .to({rotation: -rotation}, time*2)
                        .to({rotation: 0}, time);

            }
        
    };

    this.playerOneChoosing = function(){
        _oTextTurn.setVisible(true);
        _oTextTurn.refreshText(TEXT_PLAYER_ONE);
        _oContainerTextTurn.x = 100;
        _oContainerTextTurn.y = 20;
    };  

    this.playerTwoChoosing = function(){
        _oTextTurn.refreshText(TEXT_PLAYER_TWO);

        new createjs.Tween.get(_oContainerTextTurn).to({x: 600}, 500, createjs.Ease.backInOut);
    };

    this.init();
    var _oThis = this;
}

var s_oGameSection;

