function CSelectThrow (iPlayer, szPlayerName)
{
    var _oSelectThrowContainer;
    var _aButtons;
    var _iPlayerSelect;
    var _oLabelText;
    var _iPlayerId;
    this.init = function (iPlayer, szPlayerName)
    {
        _oSelectThrowContainer = new createjs.Container();
        _aButtons = [];
        var iXPos = 0;
        var oButton;
        for (var i = 0; i < 3; i++) {
            oSprite = s_oSpriteLibrary.getSprite("throw_"+i);
            oButton = new CGfxButton(iXPos, 120, oSprite, _oSelectThrowContainer);
            oButton.addEventListenerWithParams(ON_MOUSE_UP, this.setPlayerSelection, this, i);
            _aButtons.push(oButton);
            iXPos += 250;
        }
        _oSelectThrowContainer.y = 120;
        _oSelectThrowContainer.x = 340;
        _oSelectThrowContainer.alpha = 0;
        s_oStage.addChild (_oSelectThrowContainer); 
        new createjs.Tween.get(_oSelectThrowContainer).to({alpha: 1}, 300);
        _iPlayerId = iPlayer;
    };
    this.unload = function ()
    {   
        for (var i = 0; i < _aButtons.length; i++) {
            _aButtons[i].unload();
        }

        s_oStage.removeChild(_oSelectThrowContainer);
    };
    this.show = function ()
    {
        s_bOnSelect = true;
       _oSelectThrowContainer.visible = true; 
    };
    this.hide = function ()
    {
        
        _oSelectThrowContainer.visible = false;
    };
    this.setPlayerSelection = function (selection)
    {
        _iPlayerSelect = selection;
        s_oGame.playerThrow(_iPlayerId, _iPlayerSelect);
        this.hide();
        s_bOnSelect = false;

        //s_oGame.toggleCompares();
        //s_oGameSection.toggleVisibleText();
    };
    
    this.getPlayerSelection = function ()
    {
      if (!_iPlayerSelect)
          return _iPlayerSelect;
    };
    
    this.init(iPlayer, szPlayerName);
}

