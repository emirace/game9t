////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, confirmContainer, resultContainer;
var guideline, bg, logo, buttonStart, buttonContinue, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.thumbs = {};
$.boards = {};
$.players = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	buttonLocalContainer = new createjs.Container();
	selectContainer = new createjs.Container();
	modeContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	boardsContainer = new createjs.Container();
	pathContainer = new createjs.Container();
	pathActionContainer = new createjs.Container();
	gameLayoutContainer = new createjs.Container();
	playersContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 70;

	buttonLocal = new createjs.Bitmap(loader.getResult('buttonLocal'));
	centerReg(buttonLocal);

	buttonOnline = new createjs.Bitmap(loader.getResult('buttonOnline'));
	centerReg(buttonOnline);

	buttonLocal.x = canvasW/2 - 100;
	buttonLocal.y = canvasH/100 * 70;

	buttonOnline.x = canvasW/2 + 100;
	buttonOnline.y = canvasH/100 * 70;
	
	//select
	itemSelect = new createjs.Bitmap(loader.getResult('itemSelect'));
	
	buttonRight = new createjs.Bitmap(loader.getResult('buttonRight'));
	centerReg(buttonRight);
	buttonRight.x = canvasW/100 * 83;
	buttonRight.y = canvasH/100 * 50;
	
	buttonLeft = new createjs.Bitmap(loader.getResult('buttonLeft'));
	centerReg(buttonLeft);
	buttonLeft.x = canvasW/100 * 17;
	buttonLeft.y = canvasH/100 * 50;
	
	buttonSelectContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonSelectContinue);
	buttonSelectContinue.x = canvasW/2;
	buttonSelectContinue.y = canvasH/100 * 77;
	
	itemThumbSelect = new createjs.Bitmap(loader.getResult('itemThumbSelect'));
	centerReg(itemThumbSelect);
	selectContainer.addChild(itemThumbSelect);
	
	var startThumbX = 390;
	var startThumbY = 370;
	var curThumbX = startThumbX;
	var curThumbY = startThumbY;
		
	for(var n = 0; n<3; n++){
		$.thumbs[n] = new createjs.Bitmap(loader.getResult('itemThumb'));
		centerReg($.thumbs[n]);
		$.thumbs[n].x = curThumbX;
		$.thumbs[n].y = curThumbY;
		
		if(n == 0){
			itemThumbSelect.x = curThumbX;
			itemThumbSelect.y = curThumbY;
		}
		curThumbX += 250;
		selectContainer.addChild($.thumbs[n]);
	}
	
	//mode
	itemMode = new createjs.Bitmap(loader.getResult('itemMode'));
	
	buttonMin = new createjs.Bitmap(loader.getResult('buttonMin'));
	centerReg(buttonMin);
	buttonMin.x = canvasW/100 * 38;
	buttonMin.y = canvasH/100 * 46;
	
	buttonPlus = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonPlus);
	buttonPlus.x = canvasW/100 * 62;
	buttonPlus.y = canvasH/100 * 46;
	
	buttonPlayer = new createjs.Bitmap(loader.getResult('buttonPlayer'));
	centerReg(buttonPlayer);
	buttonPlayer.x = canvasW/2;
	buttonPlayer.y = canvasH/100 * 67;
	
	buttonComputer = new createjs.Bitmap(loader.getResult('buttonComputer'));
	centerReg(buttonComputer);
	buttonComputer.x = canvasW/2;
	buttonComputer.y = canvasH/100 * 79;
	
	totalPlayerTxt = new createjs.Text();
	totalPlayerTxt.font = "90px groboldregular";
	totalPlayerTxt.color = "#fff";
	totalPlayerTxt.textAlign = "center";
	totalPlayerTxt.textBaseline='alphabetic';
	totalPlayerTxt.text = 2;
	totalPlayerTxt.x = canvasW/2;
	totalPlayerTxt.y = canvasH/100 * 50;
		
	//game
	var thumbCount = 0;
	for(var n = 0; n<boards_arr.length; n++){
		$.thumbs['thumb_'+n] = new createjs.Bitmap(loader.getResult('boardThumbnail'+n));
		centerReg($.thumbs['thumb_'+n]);
		$.thumbs['thumb_'+n].x = $.thumbs[thumbCount].x;
		$.thumbs['thumb_'+n].y = $.thumbs[thumbCount].y;
		thumbCount++;
		if(thumbCount>2){
			thumbCount = 0;
		}
		selectContainer.addChild($.thumbs['thumb_'+n]);
		
		$.boards[n] = new createjs.Bitmap(loader.getResult('boardImage'+n));
		$.boards[n].visible = false;
		boardsContainer.addChild($.boards[n]);
	}
	
	for(var n = 0; n<players_arr.length; n++){
		$.players[n] = new createjs.Bitmap(loader.getResult('player'+n));
		$.players[n].regX = $.players[n].image.naturalWidth/2;
		$.players[n].regY = $.players[n].image.naturalHeight-5;
		playersContainer.addChild($.players[n]);
	}
	
	buttonRoll = new createjs.Bitmap(loader.getResult('buttonRoll'));
	centerReg(buttonRoll);
	
	iconArrow = new createjs.Bitmap(loader.getResult('iconArrow'));
	centerReg(iconArrow);
	
	itemStatus = new createjs.Bitmap(loader.getResult('itemStatus'));
	statusTxt = new createjs.Text();
	statusTxt.font = "45px groboldregular";
	statusTxt.color = "#fff";
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.text = 'TESTING';
	statusTxt.x = canvasW/2;
	statusTxt.y = canvasH/100 * 51;
	
	statusShadowTxt = new createjs.Text();
	statusShadowTxt.font = "45px groboldregular";
	statusShadowTxt.color = "#000";
	statusShadowTxt.textAlign = "center";
	statusShadowTxt.textBaseline='alphabetic';
	statusShadowTxt.text = 'TESTING';
	statusShadowTxt.x = statusTxt.x;
	statusShadowTxt.y = statusTxt.y + 3;
	statusShadowTxt.alpha = .3;
	
	var _frameW = 68.33;
	var _frameH = 70;
	
	var _frame = {"regX": _frameW/2, "regY": _frameW/2, "height": _frameH, "count": 6, "width": _frameW};
	var _animations = {animate:{frames: [0,1,2,3,4,5], speed:1}};
						
	diceData = new createjs.SpriteSheet({
		"images": [loader.getResult('iconDice').src],
		"frames": _frame,
		"animations": _animations
	});
	
	diceAnimate = new createjs.Sprite(diceData, "animate");
	diceAnimate.framerate = 20;
	diceAnimate.gotoAndStop(0);

	playerTurnTxt = new createjs.Text();
	playerTurnTxt.font = "20px groboldregular";
	playerTurnTxt.color = "#fff";
	playerTurnTxt.textAlign = "right";
	playerTurnTxt.textBaseline='alphabetic';
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "28px groboldregular";
	resultTitleTxt.color = "#de2c2f";
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = resultTitleWinText;
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100 * 38;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "40px groboldregular";
	resultScoreTxt.color = "#de2c2f";
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.text = resultTitleWinText;
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100 * 44;
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "20px groboldregular";
	resultShareTxt.color = "#92141b";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = shareText;
	resultShareTxt.x = canvasW/2;
	resultShareTxt.y = canvasH/100 * 49;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	buttonFacebook.x = canvasW/100 * 44;
	buttonTwitter.x = canvasW/2;
	buttonWhatsapp.x = canvasW/100 * 56;
	buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH/100*54;
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	createHitarea(buttonContinue);
	buttonContinue.x = canvasW/2;
	buttonContinue.y = canvasH/100 * 63;
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 42;
	buttonConfirm.y = canvasH/100 * 62;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 58;
	buttonCancel.y = canvasH/100 * 62;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "30px groboldregular";
	confirmMessageTxt.color = "#de2c2f";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.lineHeight = 35;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *45;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;

	//room
	nameContainer = new createjs.Container();
	roomContainer = new createjs.Container();

	gameLogsTxt = new createjs.Text();
	gameLogsTxt.font = "20px groboldregular";
	gameLogsTxt.color = "#fff";
	gameLogsTxt.textAlign = "center";
	gameLogsTxt.textBaseline='alphabetic';
	gameLogsTxt.text = '';
	gameLogsTxt.x = canvasW/2;
	gameLogsTxt.y = canvasH/100 * 75;
	
	if(guide){
		guideline = new createjs.Shape();
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	buttonLocalContainer.addChild(buttonLocal, buttonOnline);
	mainContainer.addChild(logo, buttonStart, buttonLocalContainer);
	selectContainer.addChild(itemSelect, buttonRight, buttonLeft, buttonSelectContinue);
	modeContainer.addChild(itemMode, buttonMin, buttonPlus, buttonPlayer, buttonComputer, totalPlayerTxt);
	gameContainer.addChild(boardsContainer, pathContainer, pathActionContainer, playersContainer, gameLayoutContainer);
	gameLayoutContainer.addChild(iconArrow, buttonRoll, diceAnimate, playerTurnTxt, statusContainer);
	statusContainer.addChild(itemStatus, statusShadowTxt, statusTxt);
	resultContainer.addChild(itemResult, resultTitleTxt, resultScoreTxt, buttonContinue);
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	statusContainer.alpha = 0;
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, mainContainer, nameContainer, roomContainer, selectContainer, modeContainer, gameContainer, gameLogsTxt, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 58;
		if(curPage == 'main'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}
		
		buttonRoll.x = (canvasW - offset.x) - 60;
		buttonRoll.y = (canvasH - offset.y) - 60;
		diceAnimate.x = buttonRoll.x;
		diceAnimate.y = buttonRoll.y-5;

		playerTurnTxt.x = buttonRoll.x + 35;
		playerTurnTxt.y = buttonRoll.y - 55;

		resizeSocketLog();
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}