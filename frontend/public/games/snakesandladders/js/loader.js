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
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_local.png', id:'buttonLocal'},
			{src:'assets/button_online.png', id:'buttonOnline'},
		
			{src:'assets/item_select.png', id:'itemSelect'},
			{src:'assets/button_right.png', id:'buttonRight'},
			{src:'assets/button_left.png', id:'buttonLeft'},
			{src:'assets/item_thumb.png', id:'itemThumb'},
			{src:'assets/item_thumb_select.png', id:'itemThumbSelect'},
		
			{src:'assets/item_mode.png', id:'itemMode'},
			{src:'assets/button_min.png', id:'buttonMin'},
			{src:'assets/button_plus.png', id:'buttonPlus'},
			{src:'assets/button_player.png', id:'buttonPlayer'},
			{src:'assets/button_computer.png', id:'buttonComputer'},
			
			{src:'assets/button_roll.png', id:'buttonRoll'},
			{src:'assets/icon_dice.png', id:'iconDice'},
			{src:'assets/icon_arrow.png', id:'iconArrow'},
			{src:'assets/item_status.png', id:'itemStatus'},
			
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}];
			
	for(var n = 0; n<boards_arr.length; n++){
		manifest.push({src:boards_arr[n].thumbnail, id:'boardThumbnail'+n});
		manifest.push({src:boards_arr[n].image, id:'boardImage'+n});
	}
	
	for(var n = 0; n<players_arr.length; n++){
		manifest.push({src:players_arr[n], id:'player'+n});
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
		manifest.push({src:'assets/sounds/button.ogg', id:'soundClick'});
		manifest.push({src:'assets/sounds/dice.ogg', id:'soundDice'});
		manifest.push({src:'assets/sounds/lucky.ogg', id:'soundLucky'});
		manifest.push({src:'assets/sounds/fail.ogg', id:'soundFail'});
		manifest.push({src:'assets/sounds/result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/move1.ogg', id:'soundMove1'});
		manifest.push({src:'assets/sounds/move2.ogg', id:'soundMove2'});
		manifest.push({src:'assets/sounds/move3.ogg', id:'soundMove3'});
		manifest.push({src:'assets/sounds/move4.ogg', id:'soundMove4'});
		manifest.push({src:'assets/sounds/extra.ogg', id:'soundExtra'});
		manifest.push({src:'assets/sounds/start.ogg', id:'soundStart'});
		
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
	$('#mainLoader span').html('LOADING... '+Math.round(loader.progress/1*100));
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