function CCpuPlayer (szName)
{
   var _oHistoryPanel;
   var _bHasSelected ;
    
    this.init = function (szName)
    {
        _bHasSelected = false;
       _oHistoryPanel = new CHistoryPanel(728,359, szName, 1);
    };
    this.selectThrow = function (playerSelected)
    {
       
        rand = Math.floor(randomFloatBetween(0,100));
        if (rand < OCCURENCES) //PLAYER 1 WON
            {
            if (rand > OCCURENCES/4)
            selection = THROW_MATCHES[playerSelected][0];
            else
            selection = THROW_MATCHES[playerSelected][2];
            s_oGame.playerThrow(1, selection);
        } 
        else{
            selection = THROW_MATCHES[playerSelected][1];
            s_oGame.playerThrow(1, selection);
        }
    
    };
    this.unload = function ()
    {
        _oHistoryPanel.unload();
    }
    this.roundWon = function ()
    {
        _oHistoryPanel.win();
    };
    this.hasSelected = function ()
    {
        _bHasSelected = !_bHasSelected;
    };
    
    this.init(szName);
}




