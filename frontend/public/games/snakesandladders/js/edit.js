////////////////////////////////////////////////////////////
// EDIT TRACKS
////////////////////////////////////////////////////////////
var editData = {show:true, pathNum:0, actionNum:0, editPath:null, editPathShape:null, editPathShapeColour:'red', editPathColour:'yellow', editPathWidth:15, pathColour:'red', pathWidth:6, editActionPathColour:'green', editActionPathCurveColour:'orange', editActionPath:null};

$.pathDots = {};
var boardLoader, boardFileFest;

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	$.editor.enable = true;
});

function loadEditPage(){
	gameLayoutContainer.visible = false;
	
	$.get('editTools.html', function(data){
		$('body').prepend(data);
		$('#editWrapper').show();
		toggleEditOption();
		buildEditButtons();
		buttonExit.visible = false;
	});		
}

/*!
 * 
 * BUILD EDIT BUTTONS - This is the function that runs to build edit buttons
 * 
 */
function buildEditButtons(){
	//boards list
	gameData.boardNum = 0;
	buildBoardDropdown();
	
	$('#toggleShowOption').click(function(){
		toggleShowOption();
	});
	
	$("#boardslist").change(function() {
		if($(this).val() != ''){
			gameData.boardNum = $(this).val();
			loadBoardData();
		}
	});
	
	$('#prevBoard').click(function(){
		toggleBoard(false);
	});
	
	$('#nextBoard').click(function(){
		toggleBoard(true);
	});
	
	$('#addBoard').click(function(){
		actionBoard('new');
	});
	
	$('#removeBoard').click(function(){
		actionBoard('remove');
	});
	
	$('#moveBoardUp').click(function(){
		actionBoard('moveup');
	});
	
	$('#moveBoardDown').click(function(){
		actionBoard('movedown');
	});
	
	$('#editBoard').click(function(){
		toggleEditOption('board', true);
	});
	
	$('#boardBack').click(function(){
		toggleEditOption();
	});
	
	$('#updateImage').click(function(){
		boards_arr[gameData.boardNum].thumbnail = $('#thumbnail').val();
		boards_arr[gameData.boardNum].image = $('#image').val();
		boards_arr[gameData.boardNum].startX = Number($('#startX').val());
		boards_arr[gameData.boardNum].startY = Number($('#startY').val());
		
		preparePlayers();
		loadBoardAssets();
	});
	
	$('#editPath').click(function(){
		toggleEditOption('path', true);
	});
	
	//paths
	$('#prevPath').click(function(){
		togglePath(false);
	});
	
	$('#nextPath').click(function(){
		togglePath(true);
	});
	
	editData.pathNum = 0;
	buildPathDropdown();
	$("#pathlist").change(function() {
		if($(this).val() != ''){
			editData.pathNum = $(this).val();
			loadPathData();
		}
	});
	
	/*$('#addPath').click(function(){
		actionPath('new');
	});*/
	
	$('#removePath').click(function(){
		actionPath('remove');
	});
	
	$('#movePathUp').click(function(){
		actionPath('moveup');
	});
	
	$('#movePathDown').click(function(){
		actionPath('movedown');
	});
	
	$('#updatePath').click(function(){
		updatePathDot();
	});
	
	$('#editActionPath').click(function(){
		toggleEditOption('action');
	});
	
	$('#pathBack').click(function(){
		toggleEditOption();
	});
	
	
	//action
	$("#actionType").change(function() {
		boards_arr[gameData.boardNum].paths[editData.pathNum].aOpt.type = Number($(this).val());
	});
	
	$('#addActionPath').click(function(){
		actionSinglePath('new');
	});
	
	$('#removeActionPath').click(function(){
		actionSinglePath('remove');
	});
	
	$('#updateActionPath').click(function(){
		updateActionPathDot();
	});
	
	$('#actionPathBack').click(function(){
		toggleEditOption('path', false);
	});
	
	$('#testAnimation').click(function(){
		testAnimation();
	});
	
	
	//generate
	$('#generateArray').click(function(){
		generateArray();
	});
	
	stage.addEventListener("dblclick", function(evt) {
		if(editData.option == 'path'){
			actionPath('new');
		}else if(editData.option == 'action'){
			actionSinglePath('new');
		}
	});
}

/*!
 * 
 * TOGGLE DISPLAY OPTION - This is the function that runs to toggle display option
 * 
 */
 
function toggleShowOption(){
	if(editData.show){
		editData.show = false;
		$('#editOption').hide();
		$('#toggleShowOption').val('Show Edit Option');
	}else{
		editData.show = true;
		$('#editOption').show();
		$('#toggleShowOption').val('Hide Edit Option');
	}
}

/*!
 * 
 * TOGGLE EDIT OPTION - This is the function that runs to toggle edit option
 * 
 */
function toggleEditOption(con, update){
	editData.option = con;
	
	$('#editBoardWrapper').hide();
	$('#boardEditWrapper').hide();
	$('#pathEditWrapper').hide();
	$('#pathActionEditWrapper').hide();
	pathContainer.visible = false;
	pathActionContainer.visible = false;
	
	if(editData.editPathShape != null){
		editData.editPathShape.graphics.clear();	
	}
	
	if(con == 'board'){
		$('#boardEditWrapper').show();
	}else if(con == 'path'){
		preparePlayers();
		$('#pathEditWrapper').show();
		pathContainer.visible = true;
		
		if(update){
			editData.pathNum = 0;
			buildPathDropdown();
		}else{
			buildPathDots();
			loadPathData();
			drawPathEdit();	
		}
	}else if(con == 'action'){
		$('#pathActionEditWrapper').show();
		pathActionContainer.visible = true;
		editData.actionNum = boards_arr[gameData.boardNum].paths[editData.pathNum].action.length - 1;
		
		$('#actionPathX').val('');
		$('#actionPathY').val('');
		//$('#actionPathCurveX').val('');
		//$('#actionPathCurveY').val('');
		$('#actionSpeed').val('');
		
		buildActionPathDots();
		drawPathEdit();
		loadActionPathData();
	}else{
		$('#editBoardWrapper').show();
	}
}

/*!
 * 
 * BUILD BOARD DROPDOWN - This is the function that runs to build board dropdown
 * 
 */
function buildBoardDropdown(){
	$('#boardslist').empty();
	for(n=0;n<boards_arr.length;n++){
		$('#boardslist').append($("<option/>", {
			value: n,
			text: 'Board '+(n+1)
		}));
	}
	$('#boardslist').val(gameData.boardNum);
	
	loadBoardData();
}

/*!
 * 
 * BUILD PATH DROPDOWN - This is the function that runs to build path dropdown
 * 
 */
function buildPathDropdown(){
	$('#pathlist').empty();
	for(n=0;n<boards_arr[gameData.boardNum].paths.length;n++){
		$('#pathlist').append($("<option/>", {
			value: n,
			text: 'Path '+(n+1)
		}));
	}
	$('#pathlist').val(editData.pathNum);
	
	buildPathDots();
	loadPathData();
	drawPathEdit();
}

/*!
 * 
 * TOGGLE BOARDS - This is the function that runs to toggle boards
 * 
 */
function toggleBoard(con){
	if(con){
		gameData.boardNum++;
		gameData.boardNum = gameData.boardNum > boards_arr.length - 1 ? 0 : gameData.boardNum;
	}else{
		gameData.boardNum--;
		gameData.boardNum = gameData.boardNum < 0 ? boards_arr.length - 1 : gameData.boardNum;
	}
	
	$('#boardslist').prop("selectedIndex", gameData.boardNum);
	
	loadBoardData();
}

/*!
 * 
 * TOGGLE PATHS - This is the function that runs to toggle paths
 * 
 */
function togglePath(con){
	if(con){
		editData.pathNum++;
		editData.pathNum = editData.pathNum > boards_arr[gameData.boardNum].paths.length - 1 ? 0 : editData.pathNum;
	}else{
		editData.pathNum--;
		editData.pathNum = editData.pathNum < 0 ? boards_arr[gameData.boardNum].paths.length - 1 : editData.pathNum;
	}
	
	$('#pathlist').prop("selectedIndex", editData.pathNum);
	
	loadPathData();
}

/*!
 * 
 * LOAD EDITOR DAT - This is the function that runs to load editor data
 * 
 */
function loadBoardData(){
	toggleEditOption();
	
	$('#thumbnail').val(boards_arr[gameData.boardNum].thumbnail);
	$('#image').val(boards_arr[gameData.boardNum].image);
	$('#startX').val(boards_arr[gameData.boardNum].startX);
	$('#startY').val(boards_arr[gameData.boardNum].startY);
	
	preparePlayers();
	loadBoardAssets();
}

function loadPathData(){
	if(boards_arr[gameData.boardNum].paths.length == 0){
		return;	
	}
	
	$('#pathX').val(boards_arr[gameData.boardNum].paths[editData.pathNum].x);
	$('#pathY').val(boards_arr[gameData.boardNum].paths[editData.pathNum].y);
	
	if(pathContainer.visible){
		editData.editPath.x = Number($('#pathX').val());
		editData.editPath.y = Number($('#pathY').val());
	}
}

function loadActionPathData(){
	if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length == 0){
		return;	
	}
	
	var currentActionNum = editData.actionNum;
	if(isEven(currentActionNum)){
		currentActionNum--;
	}
	
	$('#actionType').val(Number(boards_arr[gameData.boardNum].paths[editData.pathNum].aOpt.type));
	$('#actionPathX').val(boards_arr[gameData.boardNum].paths[editData.pathNum].action[editData.actionNum].x);
	$('#actionPathY').val(boards_arr[gameData.boardNum].paths[editData.pathNum].action[editData.actionNum].y);
	//$('#actionPathCurveX').val(boards_arr[gameData.boardNum].paths[editData.pathNum].action[currentActionNum].x);
	//$('#actionPathCurveY').val(boards_arr[gameData.boardNum].paths[editData.pathNum].action[currentActionNum].y);
	$('#actionSpeed').val(boards_arr[gameData.boardNum].paths[editData.pathNum].aOpt.speed);
	
	if(pathActionContainer.visible){
		editData.editPath.x = Number($('#actionPathX').val());
		editData.editPath.y = Number($('#actionPathY').val());
	}
}

/*!
 * 
 * TEST RUN - This is the function that runs to test run
 * 
 */
function testAnimation(){
	animateSlide($.players[0], boards_arr[gameData.boardNum].paths[editData.pathNum].aOpt.speed, boards_arr[gameData.boardNum].paths[editData.pathNum].action);
}

/*!
 * 
 * EDITOR ACTION - This is the function that runs to for editor action
 * 
 */
function actionBoard(action){
	switch(action){
		case 'new':
			boards_arr.push({thumbnail:'', image:'assets/boards/board1.png', paths:[]});
			gameData.boardNum = boards_arr.length - 1;
			buildBoardDropdown();
		break;
		
		case 'remove':
			if(boards_arr.length > 1){
				boards_arr.splice(gameData.boardNum, 1);
				gameData.boardNum = 0;
				buildBoardDropdown();
			}
		break;
		
		case 'moveup':
			if(gameData.boardNum-1 >= 0){
				swapArray(boards_arr, gameData.boardNum-1, gameData.boardNum);
				gameData.boardNum--;
				buildBoardDropdown();
			}
		break;
		
		case 'movedown':
			if(gameData.boardNum+1 < boards_arr.length){
				swapArray(boards_arr, gameData.boardNum+1, gameData.boardNum);
				gameData.boardNum++;
				buildBoardDropdown();
			}
		break;
	}
}

function actionPath(action){
	switch(action){
		case 'new':
			if(boards_arr[gameData.boardNum].paths.length == 0){
				boards_arr[gameData.boardNum].paths.push({x:Math.round(stage.mouseX), y:Math.round(stage.mouseY), action:[], aOpt:{type:0, speed:1}});
				editData.pathNum = boards_arr[gameData.boardNum].paths.length - 1;
			}else{
				var pointNum = editData.pathNum;
				pointNum++;
				boards_arr[gameData.boardNum].paths.splice(pointNum, 0, {x:Math.round(stage.mouseX), y:Math.round(stage.mouseY), action:[], aOpt:{type:0, speed:1}});
				editData.pathNum = pointNum;
			}
			
			buildPathDropdown();
		break;
		
		case 'remove':
			if(boards_arr[gameData.boardNum].paths.length > 1){
				boards_arr[gameData.boardNum].paths.splice(editData.pathNum, 1);
				editData.pathNum--;
				buildPathDropdown();
			}
		break;
		
		case 'moveup':
			if(editData.pathNum-1 >= 0){
				swapArray(boards_arr[gameData.boardNum].paths, editData.pathNum-1, editData.pathNum);
				editData.pathNum--;
				buildPathDropdown();
			}
		break;
		
		case 'movedown':
			if(gameData.boardNum+1 < boards_arr[gameData.boardNum].paths.length){
				swapArray(boards_arr[gameData.boardNum].paths, editData.pathNum+1, editData.pathNum);
				editData.pathNum++;
				buildPathDropdown();
			}
		break;
	}
}

function actionSinglePath(action){
	switch(action){
		case 'new':
			/*var pointX = canvasW/2;
			var pointY = canvasH/2;
			var pointCurveX = pointX+100;
			
			if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length == 0){
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.push({x:boards_arr[gameData.boardNum].paths[editData.pathNum].x, y:boards_arr[gameData.boardNum].paths[editData.pathNum].y});
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.push({x:pointX, y:pointY});
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.push({x:pointCurveX, y:pointY});
			}else{
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.push({x:pointX, y:pointY});
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.push({x:pointCurveX, y:pointY});
			}*/
			
			var currentX = Math.round(stage.mouseX);
			var currentY = Math.round(stage.mouseY)
			if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length == 0){
				boards_arr[gameData.boardNum].paths[editData.pathNum].action = [{x:boards_arr[gameData.boardNum].paths[editData.pathNum].x, y:boards_arr[gameData.boardNum].paths[editData.pathNum].y}, {x:currentX-30, y:currentY-30},{x:currentX, y:currentY}];
				//editData.actionNum = 0;
			}else{
				var pointNum = editData.actionNum;
				if(isEven(editData.actionNum)){
					pointNum++;
				}
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.splice(pointNum, 0, {x:currentX-30, y:currentY-30},{x:currentX, y:currentY});
				//editData.pointNum = pointNum;
			}
			
			editData.actionNum = boards_arr[gameData.boardNum].paths[editData.pathNum].action.length - 1;
			buildActionPathDots();
			drawPathEdit();
			loadActionPathData();
		break;
		
		case 'remove':
			if(isEven(editData.actionNum)){
				editData.actionNum--;
			}
			boards_arr[gameData.boardNum].paths[editData.pathNum].action.splice(editData.actionNum, 2);
			editData.actionNum = boards_arr[gameData.boardNum].paths[editData.pathNum].action.length - 1;
			
			if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length == 1){
				boards_arr[gameData.boardNum].paths[editData.pathNum].action.length = 0;
				editData.actionNum = 0;
			}
			
			buildActionPathDots();
			drawPathEdit();
			loadActionPathData();
		break;
	}
}

/*!
 * 
 * BUILD DOTS - This is the function that runs to build dots
 * 
 */
function buildPathDots(){
	pathContainer.removeAllChildren();
	pathActionContainer.removeAllChildren();
	
	editData.editPath = new createjs.Shape();
	editData.editPath.alpha = .7;
	editData.editPath.graphics.beginFill(editData.editPathColour).drawCircle(0, 0, editData.editPathWidth);
	editData.editPath.visible = true;
	editData.editPath.x = canvasW/2;
	editData.editPath.y = canvasH/2;
	
	editData.editPathShape = new createjs.Shape();
	pathContainer.addChild(editData.editPathShape, editData.editPath);
	
	for(var n=0;n<boards_arr[gameData.boardNum].paths.length;n++){
		createDot(n, boards_arr[gameData.boardNum].paths[n].x, boards_arr[gameData.boardNum].paths[n].y, 'path');
	}
}

function buildActionPathDots(){
	pathActionContainer.removeAllChildren();
	
	editData.editPath = new createjs.Shape();
	editData.editPath.alpha = .7;
	editData.editPath.graphics.beginFill(editData.editPathColour).drawCircle(0, 0, editData.editPathWidth);
	editData.editPath.visible = true;
	editData.editPath.x = canvasW/2;
	editData.editPath.y = canvasH/2;
	
	editData.editPathShape = new createjs.Shape();
	pathActionContainer.addChild(editData.editPathShape, editData.editPath);
	
	editData.editActionPath = new createjs.Shape();
	editData.editActionPath.graphics.beginFill(editData.pathColour).drawCircle(0, 0, editData.pathWidth);
	editData.editActionPath.x = boards_arr[gameData.boardNum].paths[editData.pathNum].x;
	editData.editActionPath.y = boards_arr[gameData.boardNum].paths[editData.pathNum].y;
	editData.editPath.x = boards_arr[gameData.boardNum].paths[editData.pathNum].x;
	editData.editPath.y = boards_arr[gameData.boardNum].paths[editData.pathNum].y;
	pathActionContainer.addChild(editData.editActionPath);
	
	if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length != 0){
		boards_arr[gameData.boardNum].paths[editData.pathNum].action[0].x = boards_arr[gameData.boardNum].paths[editData.pathNum].x;
		boards_arr[gameData.boardNum].paths[editData.pathNum].action[0].y = boards_arr[gameData.boardNum].paths[editData.pathNum].y;	
	}
	
	for(var n=0;n<boards_arr[gameData.boardNum].paths[editData.pathNum].action.length;n++){
		createDot(n, boards_arr[gameData.boardNum].paths[editData.pathNum].action[n].x, boards_arr[gameData.boardNum].paths[editData.pathNum].action[n].y, 'action');
	}
	
	$('#actionStatus').hide();
	if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length == 0){
		$('#actionStatus').show();  
	}
}

function createDot(n,x,y,type){
	$.pathDots[type+n] = new createjs.Shape();
	
	var colourCheckDot = editData.pathColour
	if(type == 'action'){
		colourCheckDot = isEven(n) == true ? editData.editActionPathColour : editData.editActionPathCurveColour;
		colourCheckDot = n == 0 ? editData.pathColour : colourCheckDot;
		//colourCheckDot = n == editData.railPath.length-1 ? colourEnd : colourCheckDot;
	}
	
	$.pathDots[type+n].graphics.beginFill(colourCheckDot).drawCircle(0, 0, editData.pathWidth);
	$.pathDots[type+n].x = x;
	$.pathDots[type+n].y = y;
	
	if(type == 'action'){
		pathActionContainer.addChild($.pathDots[type+n]);
	}else{
		pathContainer.addChild($.pathDots[type+n]);	
	}
	
	var draggable = true;
	if(type == 'action' && n==0){
		draggable = false;
	}
	
	if(draggable){
		$.pathDots[type+n].cursor = "pointer";
		$.pathDots[type+n].name = n;
		$.pathDots[type+n].addEventListener("mousedown", function(evt) {
			toggleDotDragEvent(evt, 'drag')
		});
		$.pathDots[type+n].addEventListener("pressmove", function(evt) {
			toggleDotDragEvent(evt, 'move')
		});
		$.pathDots[type+n].addEventListener("pressup", function(evt) {
			toggleDotDragEvent(evt, 'drop')
		});
	}
}

/*!
 * 
 * DRAW PATH SHAPE - This is the function that runs to draw path shape
 * 
 */
function drawPathEdit(){
	editData.editPathShape.graphics.clear();
	
	if(pathActionContainer.visible){
		editData.editPathShape.graphics.beginStroke(editData.editPathShapeColour).setStrokeStyle(2).moveTo(boards_arr[gameData.boardNum].paths[editData.pathNum].x, boards_arr[gameData.boardNum].paths[editData.pathNum].y);
		
		for(var n=0;n<boards_arr[gameData.boardNum].paths[editData.pathNum].action.length;n++){
			if(boards_arr[gameData.boardNum].paths[editData.pathNum].action.length - n > 2 && isEven(n)){
				editData.editPathShape.graphics.curveTo(boards_arr[gameData.boardNum].paths[editData.pathNum].action[n+1].x, boards_arr[gameData.boardNum].paths[editData.pathNum].action[n+1].y, boards_arr[gameData.boardNum].paths[editData.pathNum].action[n+2].x, boards_arr[gameData.boardNum].paths[editData.pathNum].action[n+2].y);
			}
		}
	}else{
		editData.editPathShape.graphics.beginStroke(editData.editPathShapeColour).setStrokeStyle(2);
		
		for(var n=0;n<boards_arr[gameData.boardNum].paths.length;n++){
			editData.editPathShape.graphics.lineTo(boards_arr[gameData.boardNum].paths[n].x, boards_arr[gameData.boardNum].paths[n].y);
		}
	}
}

/*!
 * 
 * POINT EVENT - This is the function that runs to for point event handler
 * 
 */
function toggleDotDragEvent(obj, con){
	switch(con){
		case 'drag':
			obj.target.offset = {x:obj.target.x-(obj.stageX), y:obj.target.y-(obj.stageY)};
			obj.target.alpha = .5;
			
			editData.editPath.visible = true;
			editData.editPath.x = obj.target.x;
			editData.editPath.y = obj.target.y;
			
			if(pathContainer.visible){
				editData.pathNum = Number(obj.target.name);
				$('#pathlist').val(editData.pathNum);
				loadPathData();
			}else{
				editData.actionNum = Number(obj.target.name);	
				loadActionPathData();
			}
		break;
		
		case 'move':
			obj.target.alpha = .5;
			obj.target.x = (obj.stageX) + obj.target.offset.x;
			obj.target.y = (obj.stageY) + obj.target.offset.y;
			
			editData.editPath.x = obj.target.x;
			editData.editPath.y = obj.target.y;
			
			var newPathX = Math.floor(obj.target.x);
			var newPathY = Math.floor(obj.target.y);
				
			if(pathContainer.visible){
				$('#pathX').val(newPathX);
				$('#pathY').val(newPathY);
				
				boards_arr[gameData.boardNum].paths[editData.pathNum].x = newPathX;
				boards_arr[gameData.boardNum].paths[editData.pathNum].y = newPathY;
			}else{
				/*if(isEven(editData.actionNum)){
					$('#actionPathX').val(newPathX);
					$('#actionPathY').val(newPathY);
				}else{
					$('#actionPathCurveX').val(newPathX);
					$('#actionPathCurveY').val(newPathY);
				}*/
				$('#actionPathX').val(newPathX);
				$('#actionPathY').val(newPathY);
				
				boards_arr[gameData.boardNum].paths[editData.pathNum].action[editData.actionNum].x = newPathX;
				boards_arr[gameData.boardNum].paths[editData.pathNum].action[editData.actionNum].y = newPathY;	
			}
			
			drawPathEdit();
		break;
		
		case 'drop':
			obj.target.alpha = 1;
		break;
	}
}

/*!
 * 
 * UPDATE DOTS - This is the function that runs to update dots
 * 
 */
function updatePathDot(){
	$.pathDots['path'+editData.pathNum].x = Number($('#pathX').val());
	$.pathDots['path'+editData.pathNum].y = Number($('#pathY').val());
	
	boards_arr[gameData.boardNum].paths[editData.pathNum].x = Number($('#pathX').val());
	boards_arr[gameData.boardNum].paths[editData.pathNum].y = Number($('#pathY').val());
			
	editData.editPath.x = Number($('#pathX').val());
	editData.editPath.y = Number($('#pathY').val());
	
	drawPathEdit();
}

function updateActionPathDot(){
	var currentActionNum = editData.actionNum;
	/*if(isEven(currentActionNum)){
		currentActionNum--;
	}*/
	
	/*$.pathDots['action'+(currentActionNum)].x = Number($('#actionPathCurveX').val());
	$.pathDots['action'+(currentActionNum)].y = Number($('#actionPathCurveY').val());
	
	boards_arr[gameData.boardNum].paths[editData.pathNum].action[currentActionNum].x = Number($('#actionPathCurveX').val());
	boards_arr[gameData.boardNum].paths[editData.pathNum].action[currentActionNum].y = Number($('#actionPathCurveY').val());*/
	
	$.pathDots['action'+(currentActionNum)].x = Number($('#actionPathX').val());
	$.pathDots['action'+(currentActionNum)].y = Number($('#actionPathY').val());
	
	boards_arr[gameData.boardNum].paths[editData.pathNum].action[currentActionNum].x = Number($('#actionPathX').val());
	boards_arr[gameData.boardNum].paths[editData.pathNum].action[currentActionNum].y = Number($('#actionPathY').val());
	
	boards_arr[gameData.boardNum].paths[editData.pathNum].aOpt.speed = Number($('#actionSpeed').val());
			
	editData.editPath.x = Number($('#actionPathX').val());
	editData.editPath.y = Number($('#actionPathY').val());
	
	drawPathEdit();
}

/*!
 * 
 * GENERATE ARRAY - This is the function that runs to generate array
 * 
 */
function generateArray(){
	var outputArray = '';
	var space = '					';
	var space2 = '						';
	var space3 = '							';
	
	outputArray += "[\n";
	for(e=0;e<boards_arr.length;e++){
		var pathArray = '';
		var actionArray = '';
		for(var l=0; l < boards_arr[e].paths.length; l++){
			actionArray = '';
			for(var a=0; a < boards_arr[e].paths[l].action.length; a++){
				actionArray += "{x:"+boards_arr[e].paths[l].action[a].x+", y:"+boards_arr[e].paths[l].action[a].y+"},";
			}
			pathArray += "{x:"+boards_arr[e].paths[l].x+", y:"+boards_arr[e].paths[l].y+", action:["+actionArray+"], aOpt:{type:"+boards_arr[e].paths[l].aOpt.type+", speed:"+boards_arr[e].paths[l].aOpt.speed+"}},";
		}
		
		outputArray += space+"{\n";
		outputArray += space2+"thumbnail:'"+boards_arr[e].thumbnail+"',\n";
		outputArray += space2+"image:'"+boards_arr[e].image+"',\n";
		outputArray += space2+"startX:"+boards_arr[e].startX+",\n";
		outputArray += space2+"startY:"+boards_arr[e].startY+",\n";
		outputArray += space2+"paths:["+pathArray+"],\n";
		outputArray += space+"},\n\n";
	}
	outputArray += space+'];';
	outputArray = outputArray.replace(/undefined/g,0);
	$('#outputArray').val(outputArray);	
}

/*!
 * 
 * LOAD BOARD ASSETS - This is the function that runs to load board assets
 * 
 */
function loadBoardAssets(){
	boardsContainer.removeAllChildren();
	
	boardFileFest = [];
	boardFileFest = [{src:boards_arr[gameData.boardNum].image, id:'boardImage'}];
	
	boardLoader = new createjs.LoadQueue(false);
	boardLoader.addEventListener("complete", handleBoardComplete);
	boardLoader.loadManifest(boardFileFest);
}

function handleBoardComplete() {
	var boardImage = new createjs.Bitmap(boardLoader.getResult('boardImage'));
	boardsContainer.addChild(boardImage);
};