function CPlayer (szName, id){
    var _oHistoryPanel;
    var _oSelectThrowPanel;
    var _bSelectedThrow;
    
    
    this.init = function (szName, id)
    {
        if (id === 0){
       		_oHistoryPanel = new CHistoryPanel(230,359, szName, id);
		}else{
			_oHistoryPanel = new CHistoryPanel(728,359, szName, id);
		}

    	_oSelectThrowPanel = new CSelectThrow(id);
    	_oSelectThrowPanel.hide();
    	_bSelectedThrow = false;
    };
    this.hasSelected = function (bool){
      	_bSelectedThrow = bool;  
    };
    
    this.roundWon = function (){
        _oHistoryPanel.win();
    };

    this.showChoosePanel = function (){
      	_oSelectThrowPanel.show();  
    };
    
    this.unload = function (){
		_oSelectThrowPanel.unload();
		_oHistoryPanel.unload();
    };
    
    this.init(szName, id);
}

