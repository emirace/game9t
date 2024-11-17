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
var canvasContainer, mainContainer, buttonTypeContainer, buttonPlayerContainer, buttonLocalContainer, categoryContainer, customContainer, gameContainer, timerContainer, statusContainer, puzzleContainer, puzzleDesignContainer, puzzleTextContainer, puzzleStrokeContainer, puzzleWordsContainer, resultContainer, confirmContainer, optionsContainer;
var bg, bgP, gameLogsTxt, guideline;
var buttonClassic, buttonCustom;
var buttonOnePlayer, buttonTwoPlayer;
var buttonLocal, buttonOnline;
var categoryTitleTxt, buttonCategoryL, buttonCategoryR;
var logo, logoP, buttonStart;
var buttonSolve;
var itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt;
var resultTxt, buttonReplay, resultTimerTxt;
var shareTxt, iconFacebook, iconTwitter, iconWhatsapp;
var itemExit, buttonConfirm, buttonCancel, confirmMessageTxt;
var buttonSettings, buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit;

$.players = {};
$.puzzle = {};
$.words = {};
$.category = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	buttonTypeContainer = new createjs.Container();
	buttonPlayerContainer = new createjs.Container();
	buttonLocalContainer = new createjs.Container();
	categoryContainer = new createjs.Container();
	customContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	timerContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	highlightContainer = new createjs.Container();
	puzzleContainer = new createjs.Container();
	puzzleDesignContainer = new createjs.Container();
	puzzleTextContainer = new createjs.Container();
	puzzleStrokeContainer = new createjs.Container();
	puzzleWordsContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));

	buttonClassic = new createjs.Bitmap(loader.getResult('buttonClassic'));
	centerReg(buttonClassic);

	buttonCustom = new createjs.Bitmap(loader.getResult('buttonCustom'));
	centerReg(buttonCustom);

	buttonOnePlayer = new createjs.Bitmap(loader.getResult('buttonOnePlayer'));
	centerReg(buttonOnePlayer);

	buttonTwoPlayer = new createjs.Bitmap(loader.getResult('buttonTwoPlayer'));
	centerReg(buttonTwoPlayer);

	buttonLocal = new createjs.Bitmap(loader.getResult('buttonLocal'));
	centerReg(buttonLocal);

	buttonOnline = new createjs.Bitmap(loader.getResult('buttonOnline'));
	centerReg(buttonOnline);

	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);

	//category
	categoryTitleTxt = new createjs.Text();
	categoryTitleTxt.font = "45px bpreplaybold";
	categoryTitleTxt.color = '#fff';
	categoryTitleTxt.textAlign = "center";
	categoryTitleTxt.textBaseline='alphabetic';
	categoryTitleTxt.text = textDisplay.categoryTitle;

	for(var n=0; n<categorySettings.length; n++){
		$.category[n] = new createjs.Bitmap(loader.getResult('category'+n));
		centerReg($.category[n]);

		$.category['text'+n] = new createjs.Text();
		$.category['text'+n].font = "25px bpreplaybold";
		$.category['text'+n].color = '#fff';
		$.category['text'+n].textAlign = "center";
		$.category['text'+n].textBaseline='alphabetic';
		$.category['text'+n].text = categorySettings[n].name;
		
		categoryContainer.addChild($.category[n], $.category['text'+n]);
	}

	buttonCategoryL = new createjs.Bitmap(loader.getResult('buttonArrow'));
	buttonCategoryL.scaleX = -1;
	centerReg(buttonCategoryL);
	buttonCategoryR = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonCategoryR);

	//custom
	itemCustom = new createjs.Bitmap(loader.getResult('itemPop'));
	itemCustomP = new createjs.Bitmap(loader.getResult('itemPopP'));

	customTitleTxt = new createjs.Text();
	customTitleTxt.font = "60px bpreplaybold";
	customTitleTxt.color = '#002E7F';
	customTitleTxt.textAlign = "center";
	customTitleTxt.textBaseline='alphabetic';
	customTitleTxt.text = textDisplay.customTitle;

	sizeTxt = new createjs.Text();
	sizeTxt.font = "45px bpreplaybold";
	sizeTxt.color = '#002E7F';
	sizeTxt.textAlign = "center";
	sizeTxt.textBaseline='alphabetic';
	sizeTxt.text = textDisplay.share;

	itemNumberSize = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemNumberSize);

	itemNumberWin = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemNumberWin);

	buttonRowL = new createjs.Bitmap(loader.getResult('buttonMinusTriangle'));
	centerReg(buttonRowL);
	buttonRowR = new createjs.Bitmap(loader.getResult('buttonPlusTriangle'));
	centerReg(buttonRowR);

	buttonColumnL = new createjs.Bitmap(loader.getResult('buttonMinusTriangle'));
	centerReg(buttonColumnL);
	buttonColumnR = new createjs.Bitmap(loader.getResult('buttonPlusTriangle'));
	centerReg(buttonColumnR);

	wordsTxt = new createjs.Text();
	wordsTxt.font = "45px bpreplaybold";
	wordsTxt.color = '#002E7F';
	wordsTxt.textAlign = "center";
	wordsTxt.textBaseline='alphabetic';
	wordsTxt.text = textDisplay.share;

	buttonWordsL = new createjs.Bitmap(loader.getResult('buttonMinus'));
	centerReg(buttonWordsL);
	buttonWordsR = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonWordsR);

	buttonCustomStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonCustomStart);

	customContainer.addChild(itemCustom, itemCustomP, customTitleTxt, buttonCustomStart, itemNumberSize, itemNumberWin, buttonRowL, buttonRowR, buttonColumnL, buttonColumnR, sizeTxt, buttonWordsL, buttonWordsR, wordsTxt);
	
	//game
	boardMask  = new createjs.Shape();
	itemTimer = new createjs.Bitmap(loader.getResult('itemTimer'));
	centerReg(itemTimer);

	timerTxt = new createjs.Text();
	timerTxt.font = "35px bpreplaybold";
	timerTxt.color = '#002E7F';
	timerTxt.textAlign = "center";
	timerTxt.textBaseline='alphabetic';

	timerRedTxt = new createjs.Text();
	timerRedTxt.font = "35px bpreplaybold";
	timerRedTxt.color = '#630202';
	timerRedTxt.textAlign = "center";
	timerRedTxt.textBaseline='alphabetic';
	timerTxt.y = timerRedTxt.y = 13;

	timerContainer.addChild(itemTimer, timerTxt, timerRedTxt);

	itemStatus = new createjs.Bitmap(loader.getResult('itemStatus'));
	centerReg(itemStatus);

	buttonSolve = new createjs.Bitmap(loader.getResult('buttonSolve'));
	centerReg(buttonSolve);

	statusTxt = new createjs.Text();
	statusTxt.font = "35px bpreplaybold";
	statusTxt.color = '#002E7F';
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.y = 13;

	statusContainer.addChild(itemStatus, statusTxt);

	bgHighlight = new createjs.Shape();

	highlightTxt = new createjs.Text();
	highlightTxt.font = puzzleSettings.highlightFontSize + "px bpreplaybold";
	highlightTxt.color = puzzleSettings.highlightTextColor;
	highlightTxt.textAlign = "center";
	highlightTxt.textBaseline='alphabetic';
	highlightTxt.y = puzzleSettings.highlightFontSize/2.5;

	highlightContainer.addChild(bgHighlight, highlightTxt);

	for(var n=0; n<2; n++){
		$.players['gamePlayerContainer'+ n] = new createjs.Container();

		$.players['gamePlayerBg'+ n] = new createjs.Bitmap(loader.getResult('itemPlayer'+(n+1)));
		centerReg($.players['gamePlayerBg'+ n]);

		$.players['gamePlayer'+ n] = new createjs.Text();
		$.players['gamePlayer'+ n].font = "25px bpreplaybold";
		$.players['gamePlayer'+ n].color = '#002E7F';
		$.players['gamePlayer'+ n].textAlign = "center";
		$.players['gamePlayer'+ n].textBaseline='middle';
		$.players['gamePlayer'+ n].text = textDisplay.player1;
		$.players['gamePlayer'+ n].y += 30;

		$.players['gameWords'+ n] = new createjs.Text();
		$.players['gameWords'+ n].font = "25px bpreplaybold";
		$.players['gameWords'+ n].color = '#002E7F';
		$.players['gameWords'+ n].textAlign = "center";
		$.players['gameWords'+ n].textBaseline='middle';
		$.players['gameWords'+ n].text = 0;
		$.players['gameWords'+ n].y += 55;

		$.players['gameTimerBg'+ n] = new createjs.Bitmap(loader.getResult('itemPlayerTimer'));
		centerReg($.players['gameTimerBg'+ n]);
		$.players['gameTimerBg'+ n].y += 100;

		$.players['gameTimer'+ n] = new createjs.Text();
		$.players['gameTimer'+ n].font = "25px bpreplaybold";
		$.players['gameTimer'+ n].color = '#002E7F';
		$.players['gameTimer'+ n].textAlign = "center";
		$.players['gameTimer'+ n].textBaseline='middle';
		$.players['gameTimer'+ n].text = 0;
		$.players['gameTimer'+ n].y += 100;

		$.players['gameTurn'+ n] = new createjs.Text();
		$.players['gameTurn'+ n].font = "25px bpreplaybold";
		$.players['gameTurn'+ n].color = '#fff';
		$.players['gameTurn'+ n].textAlign = "center";
		$.players['gameTurn'+ n].textBaseline='alphabetic';
		$.players['gameTurn'+ n].text = 0;
		$.players['gameTurn'+ n].y -= 110;

		$.players['gameSolved'+ n] = new createjs.Container();
		$.players['gamePlayerContainer'+ n].addChild($.players['gamePlayerBg'+ n], $.players['gamePlayer'+ n], $.players['gameWords'+ n], $.players['gameTimerBg'+ n], $.players['gameTimer'+ n], $.players['gameTurn'+ n]);
		gameContainer.addChild($.players['gamePlayerContainer'+ n]);
	}

	boardBorder = new createjs.Shape();
	boardColor = new createjs.Shape();
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemPop'));
	itemResultP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "25px bpreplaybold";
	resultShareTxt.color = '#002E7F';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "60px bpreplaybold";
	resultTitleTxt.color = '#002E7F';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;
	
	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "45px bpreplaybold";
	resultDescTxt.lineHeight = 35;
	resultDescTxt.color = '#002E7F';
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.text = '';
	
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonMusicOn = new createjs.Bitmap(loader.getResult('buttonMusicOn'));
	centerReg(buttonMusicOn);
	buttonMusicOff = new createjs.Bitmap(loader.getResult('buttonMusicOff'));
	centerReg(buttonMusicOff);
	buttonMusicOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonMusicOn);
	createHitarea(buttonMusicOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemPop'));
	itemExitP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	
	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "60px bpreplaybold";
	popTitleTxt.color = "#002E7F";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "45px bpreplaybold";
	popDescTxt.lineHeight = 50;
	popDescTxt.color = "#002E7F";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;

	//room
	roomContainer = new createjs.Container();
	nameContainer = new createjs.Container();

	gameLogsTxt = new createjs.Text();
	gameLogsTxt.font = "20px bpreplaybold";
	gameLogsTxt.color = "#ccc";
	gameLogsTxt.textAlign = "center";
	gameLogsTxt.textBaseline='alphabetic';
	gameLogsTxt.text = '';
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	buttonTypeContainer.addChild(buttonClassic, buttonCustom);
	buttonPlayerContainer.addChild(buttonOnePlayer, buttonTwoPlayer);
	buttonLocalContainer.addChild(buttonLocal, buttonOnline);
	categoryContainer.addChild(categoryTitleTxt, buttonCategoryL, buttonCategoryR);
	mainContainer.addChild(logo, logoP, buttonTypeContainer, buttonPlayerContainer, buttonLocalContainer, buttonStart);
	puzzleContainer.addChild(puzzleDesignContainer, puzzleStrokeContainer, puzzleTextContainer, statusContainer, highlightContainer, buttonSolve);
	gameContainer.addChild(puzzleContainer, puzzleWordsContainer, timerContainer);
	resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, bgP, mainContainer, nameContainer, roomContainer, categoryContainer, customContainer, gameContainer, resultContainer, gameLogsTxt, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	changeViewport(viewport.isLandscape);
	resizeGameFunc();
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}
	
	gameCanvas.width = stageW;
	gameCanvas.height = stageH;
	
	canvasW=stageW;
	canvasH=stageH;
	
	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){
		if(viewport.isLandscape){
			bg.visible = true;
			bgP.visible = false;

			logo.visible = true;
			logoP.visible = false;
			
			if(customSettings.enable){
				buttonClassic.x = (canvasW/2) - 120;
				buttonClassic.y = canvasH/100 * 75;

				buttonCustom.x = (canvasW/2) + 120;
				buttonCustom.y = canvasH/100 * 75;
				buttonCustom.visible = true;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonCustom.visible = false;
			}

			buttonOnePlayer.x = canvasW/2 - 120;
			buttonOnePlayer.y = canvasH/100 * 75;

			buttonTwoPlayer.x = canvasW/2 + 120;
			buttonTwoPlayer.y = canvasH/100 * 75;

			buttonLocal.x = canvasW/2 - 120;
			buttonLocal.y = canvasH/100 * 75;

			buttonOnline.x = canvasW/2 + 120;
			buttonOnline.y = canvasH/100 * 75;

			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 75;

			//custom
			itemCustom.visible = true;
			itemCustomP.visible = false;

			customTitleTxt.x = canvasW/2;
			customTitleTxt.y = canvasH/100 * 35;

			buttonCustomStart.x = canvasW/2;
			buttonCustomStart.y = canvasH/100 * 68;
			
			buttonRowL.x = (canvasW/2 + 200) - 30;
			buttonRowR.x = (canvasW/2 + 200) + 30;
			buttonColumnL.x = (canvasW/2 - 200) - 30;
			buttonColumnR.x = (canvasW/2 - 200) + 30;

			itemNumberSize.x = canvasW/2;
			sizeTxt.x = canvasW/2;
			itemNumberSize.y = buttonRowL.y = buttonRowR.y = buttonColumnL.y = buttonColumnR.y = canvasH/100 * 43;
			sizeTxt.y = itemNumberSize.y + 20;
			
			buttonWordsL.x = canvasW/2 - 200;
			buttonWordsR.x = canvasW/2 + 200;
			itemNumberWin.x = canvasW/2;
			wordsTxt.x = canvasW/2;
			itemNumberWin.y = buttonWordsL.y = buttonWordsR.y = canvasH/100 * 55;
			wordsTxt.y = itemNumberWin.y + 20;

			//game
			$.players['gamePlayerContainer'+ 0].x = canvasW/2 - 400;
			$.players['gamePlayerContainer'+ 1].x = canvasW/2 + 400;
			$.players['gamePlayerContainer'+ 0].y = $.players['gamePlayerContainer'+ 1].y = canvasH/2;
			
			//result
			itemResult.visible = true;
			itemResultP.visible = false;
			
			buttonFacebook.x = canvasW/100*43;
			buttonFacebook.y = canvasH/100*55;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*55;
			buttonWhatsapp.x = canvasW/100*57;
			buttonWhatsapp.y = canvasH/100*55;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 68;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 49;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 35;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 43;
			
			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = (canvasW/2) - 120;
			buttonConfirm.y = (canvasH/100 * 68);
			
			buttonCancel.x = (canvasW/2) + 120;
			buttonCancel.y = (canvasH/100 * 68);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 38;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 45;

			//room
			$('#roomWrapper').removeClass('forPortrait');
			$('#notificationHolder').removeClass('forPortrait');
			$('#roomlists').attr('size', 10);
			$('#namelists').attr('size', 10);
			$('#roomLogs').attr('rows', 10);
		}else{
			bg.visible = false;
			bgP.visible = true;

			logo.visible = false;
			logoP.visible = true;
			
			if(customSettings.enable){
				buttonClassic.x = (canvasW/2)
				buttonClassic.y = canvasH/100 * 73;

				buttonCustom.x = (canvasW/2)
				buttonCustom.y = canvasH/100 * 85;
				buttonCustom.visible = true;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonCustom.visible = false;
			}

			buttonOnePlayer.x = canvasW/2;
			buttonOnePlayer.y = canvasH/100 * 73;

			buttonTwoPlayer.x = canvasW/2;
			buttonTwoPlayer.y = canvasH/100 * 85;

			buttonLocal.x = canvasW/2;
			buttonLocal.y = canvasH/100 * 73;

			buttonOnline.x = canvasW/2;
			buttonOnline.y = canvasH/100 * 85;

			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 75;

			//custom
			itemCustom.visible = false;
			itemCustomP.visible = true;

			customTitleTxt.x = canvasW/2;
			customTitleTxt.y = canvasH/100 * 38;

			buttonCustomStart.x = canvasW/2;
			buttonCustomStart.y = canvasH/100 * 64;
			
			buttonRowL.x = (canvasW/2 + 200) - 30;
			buttonRowR.x = (canvasW/2 + 200) + 30;
			buttonColumnL.x = (canvasW/2 - 200) - 30;
			buttonColumnR.x = (canvasW/2 - 200) + 30;

			itemNumberSize.x = canvasW/2;
			sizeTxt.x = canvasW/2;
			itemNumberSize.y = buttonRowL.y = buttonRowR.y = buttonColumnL.y = buttonColumnR.y = canvasH/100 * 45;
			sizeTxt.y = itemNumberSize.y + 20;
			
			buttonWordsL.x = canvasW/2 - 200;
			buttonWordsR.x = canvasW/2 + 200;
			itemNumberWin.x = canvasW/2;
			wordsTxt.x = canvasW/2;
			itemNumberWin.y = buttonWordsL.y = buttonWordsR.y = canvasH/100 * 53;
			wordsTxt.y = itemNumberWin.y + 20;

			//game
			$.players['gamePlayerContainer'+ 0].x = canvasW/2 - 150;
			$.players['gamePlayerContainer'+ 1].x = canvasW/2 + 150;
			$.players['gamePlayerContainer'+ 0].y = $.players['gamePlayerContainer'+ 1].y = canvasH/100 * 80;
			
			//result
			itemResult.visible = false;
			itemResultP.visible = true;
			
			buttonFacebook.x = canvasW/100*39;
			buttonFacebook.y = canvasH/100*54;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*54;
			buttonWhatsapp.x = canvasW/100*61;
			buttonWhatsapp.y = canvasH/100*54;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 64;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 49;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 38;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 45;
			
			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = (canvasW/2) - 120;
			buttonConfirm.y = (canvasH/100 * 64);
			
			buttonCancel.x = (canvasW/2) + 120;
			buttonCancel.y = (canvasH/100 * 64);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 38;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 48;

			//room
			$('#roomWrapper').addClass('forPortrait');
			$('#notificationHolder').addClass('forPortrait');
			$('#roomlists').attr('size', 8);
			$('#namelists').attr('size', 8);
			$('#roomLogs').attr('rows', 6);
		}
	}
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
		
		var distanceNum = 60;
		var nextCount = 0;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}

		timerContainer.x = offset.x + 80;
		timerContainer.y = offset.y + 50;

		resizeCategory();
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