function CHistoryPanel (x,y, szName, id )
{
    var _oPanelContainer;
    var _oNameText;
    var _aHistoryMatches;
    var _aHistoryThrowes;
    var _ID;
    
    var _targetX;
    this.init = function (x,y, szName, id )
    {
        _ID = id;
        _oPanelContainer = new createjs.Container();
        var oBg;
        if (szName === "Player One")
        {
         oBg = createBitmap(s_oSpriteLibrary.getSprite("box_p1"));
        _oPanelContainer.x = -600;
        }
        else
        {
         oBg = createBitmap(s_oSpriteLibrary.getSprite("box_p2"));
        _oPanelContainer.x = 1500;
        }

        _oPanelContainer.addChild(oBg);
        var iWidth = 180;
        var iHeight = 40;
        var iX = _oPanelContainer.getBounds().width/2 - iWidth/2;
        var iY = 20;
        var oNameText = new CTLText(_oPanelContainer, 
                    iX, iY, iWidth, iHeight, 
                    36, "center", "#fff", PRIMARY_FONT, 1.1,
                    2, 2,
                    szName,
                    true, true, false,
                    false 
        );

        _aHistoryMatches = [];
        var iXPos = iX + 10;
        for (var i = 0; i < 3; i++) {
            var oMatch = new CMatchCount(_oPanelContainer, iXPos, 82);
            iXPos += 60;
            _aHistoryMatches.push(oMatch);
        }
        _aHistoryThrowes = [];
        s_oStage.addChild(_oPanelContainer);
       // _oPanelContainer.x = -600;
        _oPanelContainer.y = y;
        _targetX = x;
        this.show();
    };
    
    this.unload = function ()
    {

      s_oStage.removeChild(_oPanelContainer);  
    };
    this.show = function ()
    {
      new createjs.Tween.get(_oPanelContainer).to({x: _targetX}, 600, createjs.Ease.cubicOut);  
    };
    
    this.win = function ()
    {
        _aHistoryMatches[s_oGame.getPlayerScore(_ID)].setWin();
    };
    
    this.init(x,y, szName, id);
}