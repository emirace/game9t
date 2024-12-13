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
var canvasContainer, mainContainer, gameContainer, instructionContainer, resultContainer, moveContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.tutorial = {};
$.players = {};
$.chess = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	buttonLocalContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	boardOptionsContainer = new createjs.Container();
	boardOptionsListContainer = new createjs.Container();
	boardOptionsTutorialContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	boardContainer = new createjs.Container();
	boardDesignContainer = new createjs.Container();
	boardIconContainer = new createjs.Container();
	boardHighlightContainer = new createjs.Container();
	boardGuideContainer = new createjs.Container();
	diceContainer = new createjs.Container();
	playersContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	instructionContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));

	buttonPlay = new createjs.Bitmap(loader.getResult('buttonPlay'));
	centerReg(buttonPlay);

	buttonLocal = new createjs.Bitmap(loader.getResult('buttonLocal'));
	centerReg(buttonLocal);

	buttonOnline = new createjs.Bitmap(loader.getResult('buttonOnline'));
	centerReg(buttonOnline);

	//players
	itemOptions = new createjs.Bitmap(loader.getResult('itemOptions'));
	centerReg(itemOptions);

	optionsTitleTxt = new createjs.Text();
	optionsTitleTxt.font = "60px bpreplaybold";
	optionsTitleTxt.color = '#fff';
	optionsTitleTxt.textAlign = "center";
	optionsTitleTxt.textBaseline='alphabetic';
	optionsTitleTxt.text = textDisplay.optionsTitle;
	optionsTitleTxt.y = -150;

	itemPlayerNumbers = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemPlayerNumbers);

	totalPlayersTxt = new createjs.Text();
	totalPlayersTxt.font = "28px bpreplaybold";
	totalPlayersTxt.color = '#18283c';
	totalPlayersTxt.textAlign = "center";
	totalPlayersTxt.textBaseline='middle';

	buttonPlayersL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
	centerReg(buttonPlayersL);
	buttonPlayersR = new createjs.Bitmap(loader.getResult('buttonArrowRight'));
	centerReg(buttonPlayersR);

	itemVS = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemVS);

	vsModeTxt = new createjs.Text();
	vsModeTxt.font = "28px bpreplaybold";
	vsModeTxt.color = '#18283c';
	vsModeTxt.textAlign = "center";
	vsModeTxt.textBaseline='middle';

	buttonVSL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
	centerReg(buttonVSL);
	buttonVSR = new createjs.Bitmap(loader.getResult('buttonArrowRight'));
	centerReg(buttonVSR);

	itemPoints = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemPoints);

	beadsTxt = new createjs.Text();
	beadsTxt.font = "28px bpreplaybold";
	beadsTxt.color = '#18283c';
	beadsTxt.textAlign = "center";
	beadsTxt.textBaseline='middle';

	buttonBeadsL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
	centerReg(buttonBeadsL);
	buttonBeadsR = new createjs.Bitmap(loader.getResult('buttonArrowRight'));
	centerReg(buttonBeadsR);

	itemType = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemType);

	typeTxt = new createjs.Text();
	typeTxt.font = "22px bpreplaybold";
	typeTxt.color = '#18283c';
	typeTxt.textAlign = "center";
	typeTxt.textBaseline='middle';

	buttonTypeL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
	centerReg(buttonTypeL);
	buttonTypeR = new createjs.Bitmap(loader.getResult('buttonArrowRight'));
	centerReg(buttonTypeR);

	themeContainer = new createjs.Container();
	buttonThemeL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
	centerReg(buttonThemeL);
	buttonThemeR = new createjs.Bitmap(loader.getResult('buttonArrowRight'));
	centerReg(buttonThemeR);

	buttonNext = new createjs.Bitmap(loader.getResult('buttonNext'));
	centerReg(buttonNext);

	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);

	buttonTutorial = new createjs.Bitmap(loader.getResult('buttonTutorial'));
	centerReg(buttonTutorial);

	itemPlayerNumbers.y = buttonPlayersL.y = buttonPlayersR.y = -50;
	totalPlayersTxt.y = -50;

	itemVS.y = buttonVSL.y = buttonVSR.y = 35;
	vsModeTxt.y = 35;

	themeContainer.y = buttonThemeL.y = buttonThemeR.y = -90;

	itemPoints.y = buttonBeadsL.y = buttonBeadsR.y = -5;
	beadsTxt.y = -5;

	itemType.y = buttonTypeL.y = buttonTypeR.y = 80;
	typeTxt.y = 83;

	buttonPlayersL.x = buttonBeadsL.x = buttonTypeL.x = buttonVSL.x = -190;
	buttonPlayersR.x = buttonBeadsR.x = buttonTypeR.x = buttonVSR.x = 190;

	buttonThemeL.x = -190;
	buttonThemeR.x = 190;

	buttonNext.y = buttonStart.y = buttonTutorial.y = 180;
	buttonNext.x = buttonStart.x = -50;
	buttonTutorial.x = 140;

	buttonTutorialL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
	centerReg(buttonTutorialL);
	buttonTutorialR = new createjs.Bitmap(loader.getResult('buttonArrowRight'));
	centerReg(buttonTutorialR);

	buttonTutorialL.x = -270;
	buttonTutorialR.x = 270;

	buttonBack = new createjs.Bitmap(loader.getResult('buttonBack'));
	centerReg(buttonBack);
	buttonBack.y = 180;

	tutorialTitleTxt = new createjs.Text();
	tutorialTitleTxt.font = "40px bpreplaybold";
	tutorialTitleTxt.color = '#fff';
	tutorialTitleTxt.textAlign = "left";
	tutorialTitleTxt.textBaseline='alphabetic';
	tutorialTitleTxt.text = textDisplay.tutorialTitle;
	tutorialTitleTxt.y = -150;
	tutorialTitleTxt.x = -220;

	tutorialPageTxt = new createjs.Text();
	tutorialPageTxt.font = "40px bpreplaybold";
	tutorialPageTxt.color = '#fff';
	tutorialPageTxt.textAlign = "right";
	tutorialPageTxt.textBaseline='alphabetic';
	tutorialPageTxt.y = -150;
	tutorialPageTxt.x = 220;

	boardOptionsTutorialContainer.addChild(tutorialTitleTxt, tutorialPageTxt, buttonBack, buttonTutorialL, buttonTutorialR);

	for(var n=0; n<6; n++){
		$.tutorial[n] = new createjs.Bitmap(loader.getResult('itemTutorial' + (n+1)));
		centerReg($.tutorial[n]);
		boardOptionsTutorialContainer.addChild($.tutorial[n]);
	}

	boardOptionsListContainer.addChild(optionsTitleTxt, itemPlayerNumbers, itemVS, vsModeTxt, buttonVSL, buttonVSR, totalPlayersTxt, buttonPlayersL, buttonPlayersR, itemPoints, beadsTxt, buttonBeadsL, buttonBeadsR, itemType, typeTxt, buttonTypeL, buttonTypeR, themeContainer, buttonThemeL, buttonThemeR, buttonStart, buttonTutorial, buttonNext);
	boardOptionsContainer.addChild(itemOptions, boardOptionsListContainer, boardOptionsTutorialContainer);

	//game
	itemStatus = new createjs.Bitmap(loader.getResult('itemStatus'));
	centerReg(itemStatus);

	itemDiceShadow = new createjs.Bitmap(loader.getResult('itemDiceShadow'));
	centerReg(itemDiceShadow);

	statusTxt = new createjs.Text();
	statusTxt.font = "25px bpreplaybold";
	statusTxt.color = '#fff';
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.text = textDisplay.gameOver;
	statusTxt.y = -23;

	statusWinTxt = new createjs.Text();
	statusWinTxt.font = "23px bpreplaybold";
	statusWinTxt.color = '#fff';
	statusWinTxt.textAlign = "center";
	statusWinTxt.textBaseline='alphabetic';
	statusWinTxt.text = textDisplay.share;
	statusWinTxt.y = 15;

	statusWinRuleTxt = new createjs.Text();
	statusWinRuleTxt.font = "15px bpreplaybold";
	statusWinRuleTxt.color = '#18283c';
	statusWinRuleTxt.textAlign = "center";
	statusWinRuleTxt.textBaseline='alphabetic';
	statusWinRuleTxt.text = textDisplay.share;
	statusWinRuleTxt.y = 46;

	statusContainer.addChild(itemStatus, statusTxt, statusWinTxt, statusWinRuleTxt);
	
	itemInstruct = new createjs.Bitmap(loader.getResult('itemInstruct'));
	centerReg(itemInstruct);

	instructTxt = new createjs.Text();
	instructTxt.font = "23px bpreplaybold";
	instructTxt.color = '#fff';
	instructTxt.textAlign = "center";
	instructTxt.textBaseline='alphabetic';
	instructTxt.text = textDisplay.instruction1;
	instructTxt.y = 8;

	itemInstruct2 = new createjs.Bitmap(loader.getResult('itemInstruct2'));
	centerReg(itemInstruct2);

	instructTxt2 = new createjs.Text();
	instructTxt2.font = "19px bpreplaybold";
	instructTxt2.color = '#fff';
	instructTxt2.textAlign = "center";
	instructTxt2.textBaseline='alphabetic';
	instructTxt2.text = textDisplay.instruction2;
	instructTxt2.y = 8;

	instructionContainer.addChild(itemInstruct, instructTxt, itemInstruct2, instructTxt2);

	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemPop'));
	itemResultP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "25px bpreplaybold";
	resultShareTxt.color = '#fff';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "60px bpreplaybold";
	resultTitleTxt.color = '#fff';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;
	
	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "75px bpreplaybold";
	resultDescTxt.lineHeight = 35;
	resultDescTxt.color = '#ff9912';
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
	popTitleTxt.color = "#fff";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "40px bpreplaybold";
	popDescTxt.lineHeight = 50;
	popDescTxt.color = "#fff";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;

	//room
	roomContainer = new createjs.Container();
	nameContainer = new createjs.Container();

	gameLogsTxt = new createjs.Text();
	gameLogsTxt.font = "25px bpreplaybold";
	gameLogsTxt.color = "#fff";
	gameLogsTxt.textAlign = "center";
	gameLogsTxt.textBaseline='alphabetic';
	gameLogsTxt.text = '';
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	buttonLocalContainer.addChild(buttonLocal, buttonOnline);
	mainContainer.addChild(logo, logoP, buttonPlay, buttonLocalContainer);
	boardContainer.addChild(boardDesignContainer, boardIconContainer, boardHighlightContainer, boardGuideContainer, itemDiceShadow, diceContainer);
	gameContainer.addChild(boardContainer, playersContainer, statusContainer, instructionContainer);
	
	resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, bgP, mainContainer, nameContainer, roomContainer, boardOptionsContainer, gameContainer, gameLogsTxt, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
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
		boardOptionsContainer.x = canvasW/2;
		boardOptionsContainer.y = canvasH/2;

		if(viewport.isLandscape){
			bg.visible = true;
			bgP.visible = false;

			logo.visible = true;
			logoP.visible = false;

			buttonPlay.x = (canvasW/2);
			buttonPlay.y = canvasH/100 * 75;

			buttonLocal.x = canvasW/2 - 140;
			buttonLocal.y = canvasH/100 * 75;

			buttonOnline.x = canvasW/2 + 140;
			buttonOnline.y = canvasH/100 * 75;

			//game
			
			//result
			itemResult.visible = true;
			itemResultP.visible = false;
			
			buttonFacebook.x = canvasW/100*43;
			buttonFacebook.y = canvasH/100*58;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*58;
			buttonWhatsapp.x = canvasW/100*57;
			buttonWhatsapp.y = canvasH/100*58;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 68;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 53;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 37;

			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 47;
			
			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = (canvasW/2);
			buttonConfirm.y = (canvasH/100 * 60);
			
			buttonCancel.x = (canvasW/2);
			buttonCancel.y = (canvasH/100 * 72);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 37;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 43;

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

			buttonPlay.x = (canvasW/2);
			buttonPlay.y = canvasH/100 * 74;
			
			buttonLocal.x = canvasW/2;
			buttonLocal.y = canvasH/100 * 74;

			buttonOnline.x = canvasW/2;
			buttonOnline.y = canvasH/100 * 83;

			//game
			
			//result
			itemResult.visible = false;
			itemResultP.visible = true;
			
			buttonFacebook.x = canvasW/100*39;
			buttonFacebook.y = canvasH/100*56;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*56;
			buttonWhatsapp.x = canvasW/100*61;
			buttonWhatsapp.y = canvasH/100*56;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 64;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 52;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 40;

			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 47;
			
			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = (canvasW/2);
			buttonConfirm.y = (canvasH/100 * 58);
			
			buttonCancel.x = (canvasW/2);
			buttonCancel.y = (canvasH/100 * 67);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 40;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 46;

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
		
		var distanceNum = 65;
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

		resizeGameLayout()
		resizeSocketLog()
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