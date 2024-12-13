////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
 function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/logo_p.png', id:'logoP'},
			{src:'assets/button_play.png', id:'buttonPlay'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_next.png', id:'buttonNext'},
			{src:'assets/button_online.png', id:'buttonOnline'},
			{src:'assets/button_local.png', id:'buttonLocal'},

			{src:'assets/button_back.png', id:'buttonBack'},
			{src:'assets/item_tutorial_1.png', id:'itemTutorial1'},
			{src:'assets/item_tutorial_2.png', id:'itemTutorial2'},
			{src:'assets/item_tutorial_3.png', id:'itemTutorial3'},
			{src:'assets/item_tutorial_4.png', id:'itemTutorial4'},
			{src:'assets/item_tutorial_5.png', id:'itemTutorial5'},
			{src:'assets/item_tutorial_6.png', id:'itemTutorial6'},

			{src:'assets/item_options.png', id:'itemOptions'},
			{src:'assets/button_arrow_left.png', id:'buttonArrowLeft'},
			{src:'assets/button_arrow_right.png', id:'buttonArrowRight'},
			{src:'assets/button_tutorial.png', id:'buttonTutorial'},
			{src:'assets/item_number.png', id:'itemNumber'},

			{src:'assets/item_dice_shadow.png', id:'itemDiceShadow'},
			{src:'assets/item_player.png', id:'itemPlayer'},
			{src:'assets/item_player_h.png', id:'itemPlayerH'},
			{src:'assets/item_status.png', id:'itemStatus'},
			{src:'assets/item_instruct.png', id:'itemInstruct'},
			{src:'assets/item_instruct2.png', id:'itemInstruct2'},
		
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_pop.png', id:'itemPop'},
			{src:'assets/item_pop_p.png', id:'itemPopP'},
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_music_on.png', id:'buttonMusicOn'},
			{src:'assets/button_music_off.png', id:'buttonMusicOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
	];

	for(var n=0; n<themesSettings.length; n++){
		manifest.push({src:themesSettings[n].hole, id:'hole'+n});
		manifest.push({src:themesSettings[n].holeHighlight, id:'holeHighlight'+n});
		manifest.push({src:themesSettings[n].dice, id:'dice'+n});
		manifest.push({src:themesSettings[n].diceHighlight, id:'diceHighlight'+n});

		for(var c=0; c<themesSettings[n].boards.length; c++){
			manifest.push({src:themesSettings[n].boards[c], id:'board'+n+'_'+c});
		}

		for(var c=0; c<themesSettings[n].pieceTop.length; c++){
			manifest.push({src:themesSettings[n].pieceTop[c].src, id:'pieceTop'+n+'_'+c});
		}

		for(var c=0; c<themesSettings[n].pieceBottom.length; c++){
			manifest.push({src:themesSettings[n].pieceBottom[c].src, id:'pieceBottom'+n+'_'+c});
		}
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/sound_click.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/sound_dice.ogg', id:'soundDice'});
		manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/sound_start.ogg', id:'soundStart'});
		manifest.push({src:'assets/sounds/sound_win.ogg', id:'soundWin'});
		manifest.push({src:'assets/sounds/sound_correct.ogg', id:'soundCorrect'});
		manifest.push({src:'assets/sounds/sound_incorrect.ogg', id:'soundIncorrect'});
		manifest.push({src:'assets/sounds/sound_turn.ogg', id:'soundTurn'});
		manifest.push({src:'assets/sounds/sound_place.ogg', id:'soundPlace'});
		manifest.push({src:'assets/sounds/sound_pick1.ogg', id:'soundPick1'});
		manifest.push({src:'assets/sounds/sound_pick2.ogg', id:'soundPick2'});
		manifest.push({src:'assets/sounds/sound_pick3.ogg', id:'soundPick3'});
		manifest.push({src:'assets/sounds/music_game.ogg', id:'musicGame'});
		manifest.push({src:'assets/sounds/music_main.ogg', id:'musicMain'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}