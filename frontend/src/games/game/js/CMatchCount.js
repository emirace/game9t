function CMatchCount(oParentContainer, x, y)
{
    var _oSpriteWin;
    var _oSpriteLose;
    var _oSpriteEmpty;
    var _oParentContainer;

    var _iX;
    var _iY;
    this.init = function (oParentContainer, x, y)
    {
        _oParentContainer = oParentContainer;
        _oSpriteEmpty = createBitmap(s_oSpriteLibrary.getSprite("history_empty"));
        _oSpriteEmpty.x = _iX = x;
        _oSpriteEmpty.y = _iY = y;
        _oParentContainer.addChild(_oSpriteEmpty);
        
    };
    this.reset = function ()
    {
        _oParentContainer.removeChild(_oSpriteWin);

        _oParentContainer.addChild(_oSpriteEmpty);
    };
    this.setWin = function ()
    {
        _oSpriteWin = createBitmap(s_oSpriteLibrary.getSprite("history_win"));
        _oSpriteWin.x = _iX;
        _oSpriteWin.y = _iY;
        _oParentContainer.removeChild(_oSpriteEmpty);

        _oParentContainer.addChild(_oSpriteWin);

    };
    this.init(oParentContainer, x, y);
}

