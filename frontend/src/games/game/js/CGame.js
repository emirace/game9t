function CGame(oData) {

    var _oInterface;
    var _oSelectionPlayer;
    var _iScore;
    var _bPause;
    var _oGameSection;
    var _oPlayer;
    var _oSecondPlayer;
    var _bMultiPlayer;
    var _iCurrMatchWonPlayerOne;
    var _iCurrMatchWonPlayerTwo;
    var _bAllThrowSet = false;
    var _iPlayerOneThrow;
    var _iPlayerTwoThrow;
    var _bCompared;
    var _iPlayerTurn;
    var _oRecordBox;
    this._init = function (oData){
        setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);

        if (oData) {
            OCCURENCES = oData.victoryOccurences;
        } else
        {
            OCCURENCES = 50;
        }
        s_oGame = this;

        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(oBg);

        _bCompared = false;
        _iScore = 0;
        _iPlayerOneThrow = null;
        _iPlayerTwoThrow = null;
        _iCurrMatchWonPlayerOne = 0;
        _iCurrMatchWonPlayerTwo = 0;
        _iPlayerTurn = 0;

        _bPause = true;
        _oSelectionPlayer = new CSelectPlayers();

        _oInterface = new CInterface();
    };

    this.initGameSolo = function (){
        _bMultiPlayer = false;
        
        _oGameSection = new CGameSection();
        
        _bPause = false;

        _oPlayer = new CPlayer("Player One", 0);
        _oSecondPlayer = new CCpuPlayer("CPU");

        _oGameSection.playerOneChoosing();

        _oPlayer.showChoosePanel();
        _oRecordBox = new CRecordPanel();
    };

    this.initGameMulti = function (){
        _bMultiPlayer = true;
        
        _oGameSection = new CGameSection();

        _bPause = false;

        _oPlayer = new CPlayer("Player One", 0);
        _oSecondPlayer = new CPlayer("Player Two", 1);

        _oGameSection.playerOneChoosing();

        _oRecordBox = new CRecordPanel();
    };

    this.isMultiPlayer = function (){
        return _bMultiPlayer;
    };

    this.showHelp = function (){
        new CHelpPanel();
    };

    this.unload = function (){
        if(_oPlayer){
            _oPlayer.unload();
        }
        if(_oSecondPlayer){
            _oSecondPlayer.unload();
        }
        if(_oGameSection){
            _oGameSection.unload();
        }
        
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();

        s_oGame = null;
    };

    this.setMultiPlayer = function (bMulti){
        _bMultiPlayer = bMulti;
    };

    this.getPlayerScore = function (id){
        if (id === 0){
            return _iCurrMatchWonPlayerOne;
        }else if (id === 1){
            return _iCurrMatchWonPlayerTwo;
        }
    };

    this.nextRound = function (){
        _bAllThrowSet = false;
        _iPlayerOneThrow = null;
        _iPlayerTwoThrow = null;

        _oGameSection.playerOneChoosing();
        
        if (!_bMultiPlayer){
            _oPlayer.showChoosePanel();
        }
    };

    this.playerThrow = function (playerID, selection){
        switch (playerID)
        {
            case 0:
                _oPlayer.hasSelected(true);
                _iPlayerOneThrow = selection;
                _iPlayerTurn = 1;

                _oGameSection.playerTwoChoosing();
            break;

            case 1:
                _oSecondPlayer.hasSelected(true);
                _iPlayerTwoThrow = selection;
                _iPlayerTurn = 0;
                _oGameSection.showThrowes(_iPlayerOneThrow, _iPlayerTwoThrow);
            break;
        }
    };

    this.togglePause = function ()
    {
        _bPause = !_bPause;
    };

    this.reset = function ()
    {
        _oPlayer.unload();
        _oSecondPlayer.unload();
        _oGameSection.unload();
    };
    this.restart = function ()
    {
        this.reset();
        _oInterface.unload();

        if (_bMultiPlayer)
        {
            _bMultiPlayer = true;
            _bCompared = false;
            _oGameSection = new CGameSection();
            _iPlayerOneThrow = null;
            _iPlayerTwoThrow = null;
            _iCurrMatchWonPlayerOne = 0;
            _iCurrMatchWonPlayerTwo = 0;
            _iPlayerTurn = 0;
            _bPause = false;
            _oPlayer = new CPlayer("Player One", 0);
            _oSecondPlayer = new CPlayer("Player Two", 1);

            _oGameSection.playerOneChoosing();
        } else
        {
            _bMultiPlayer = false;
            _bCompared = false;
            _oGameSection = new CGameSection();
            _iPlayerOneThrow = null;
            _iPlayerTwoThrow = null;
            _iCurrMatchWonPlayerOne = 0;
            _iCurrMatchWonPlayerTwo = 0;
            _iPlayerTurn = 0;
            _bPause = false;
            _oPlayer = new CPlayer("Player One", 0);
            _oSecondPlayer = new CCpuPlayer("CPU");

            _oGameSection.playerOneChoosing();

            _oPlayer.showChoosePanel();
        }
                _oInterface = new CInterface();

        //this._init();
    };

    this.onExit = function ()
    {

        s_oGame.unload();
        s_oMain.gotoMenu();

        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
    };


    this.increaseScore = function (score)
    {
        _iScore += score;
    };

    this.getScore = function ()
    {
        return _iScore;
    };
    this.getBestScore = function ()
    {
        if (getItem(SCORE_ITEM_NAME) !== null)
        {
            return getItem(SCORE_ITEM_NAME);
        }
        return 0;
    };

    this.toggleCompares = function ()
    {
        _bCompared = !_bCompared;
        _bAllThrowSet = !_bAllThrowSet;
    };
    this.compareThrowes = function ()
    {

        
        this.toggleCompares();
        var score = 0;
        if (_iPlayerOneThrow === THROW_MATCHES[_iPlayerTwoThrow][1])
        {
            score = 10 * (s_iMatchWon + 1);
            _oPlayer.roundWon();
            _oGameSection.playerWonEffect(0);
            _oGameSection.playerLoseEffect(1);
            _iCurrMatchWonPlayerOne++;
            playSound("round_won", 0.2,false);
        } else if (_iPlayerOneThrow === THROW_MATCHES[_iPlayerTwoThrow][0])
        {
            score = -5;
            _oGameSection.playerWonEffect(1);
            _oGameSection.playerLoseEffect(0);
            _oSecondPlayer.roundWon();
            _iCurrMatchWonPlayerTwo++;
            if (_bMultiPlayer)
                playSound("round_won", 0.2,false);
            else
                playSound("round_lost", 0.2,false);



        }

        if (_iPlayerOneThrow === _iPlayerTwoThrow)
        {
            score = 0;
            _oGameSection.playerWonEffect(0);
            _oGameSection.playerWonEffect(1);

            _oPlayer.roundWon();
            _oSecondPlayer.roundWon();
            _iCurrMatchWonPlayerOne++;
            _iCurrMatchWonPlayerTwo++;
            playSound("round_won", 0.2,false);

        }
        this.increaseScore(score);


        if (_iCurrMatchWonPlayerOne === 3 || _iCurrMatchWonPlayerTwo === 3)
        {
            _bAllThrowSet = false;

            this.matchOver();
        }
                _oRecordBox.updateScore();


    };
    this.matchOver = function ()
    {
        if (!_bMultiPlayer) //Single Player
        {
           
            _bPause = true;
            if (_iCurrMatchWonPlayerOne > _iCurrMatchWonPlayerTwo)
            {
                s_iMatchWon++;
                
                
                if (_iScore > this.getBestScore())
                {
                    saveItem(SCORE_ITEM_NAME, _iScore);
                    $(s_oMain).trigger("save_score", _iScore);

                }
                
                _oRecordBox.updateScore();
                _oGameSection.matchOver(TEXT_MATCH_WON);


            } else if (_iCurrMatchWonPlayerOne < _iCurrMatchWonPlayerTwo)
            {                
                s_iMatchWon = 0;

                _oGameSection.matchOver(TEXT_MATCH_LOST);
                _iScore = 0;
            }
            else if (_iCurrMatchWonPlayerOne === _iCurrMatchWonPlayerTwo)
            {
               _oGameSection.matchOver(TEXT_MATCH_DRAWN); 
            }
        } else                // Multi Player
        {
            _bPause = true;
            if (_iCurrMatchWonPlayerOne > _iCurrMatchWonPlayerTwo)
            {
                _oGameSection.matchOver(TEXT_PLAYER_ONE_WON);

                s_iPlayerOneMatchWon++;
            } else if (_iCurrMatchWonPlayerOne < _iCurrMatchWonPlayerTwo)
            {
                _oGameSection.matchOver(TEXT_PLAYER_TWO_WON);

                s_iPlayerTwoMatchWon++;
            } else
            {
                _oGameSection.matchOver(TEXT_MATCH_DRAWN);
            }
        }
            _oRecordBox.updateScore();

    };
    this.soloGameUpdate = function ()
    {
        if (_iPlayerTurn === 1)
        {
            _oSecondPlayer.selectThrow(_iPlayerOneThrow);
            this.toggleCompares();
        }

    };

    this.multiGameUpdate = function (){
        if (_iPlayerOneThrow !== null && _iPlayerTwoThrow !== null){
            this.toggleCompares();
        }else{
            switch (_iPlayerTurn){
                case 0:
                    _oPlayer.showChoosePanel();
                break;
                case 1:
                    _oSecondPlayer.showChoosePanel();
                break;
            }
        }
    };
    this.getTurn = function (){
        return _iPlayerTurn;  
    };

    this.showThrowes = function (){
        _oGameSection.showThrowes(_iPlayerOneThrow, _iPlayerTwoThrow);
    };

    this.update = function ()
    {
        if (!_bPause){
            if (_bMultiPlayer === false)
            {
                this.soloGameUpdate();
            } else if (_bMultiPlayer)
            {
                this.multiGameUpdate();
            }
           
        }
    };

    this._init(oData);
}
var s_oGame = null;
var s_bOnSelect;
var s_iMatchWon = 0;
var s_iPlayerOneMatchWon = 0;
var s_iPlayerTwoMatchWon = 0;
