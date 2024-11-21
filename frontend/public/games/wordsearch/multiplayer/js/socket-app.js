///////////////////////////////////////////////////////////
// SOCKET CUSTOM
////////////////////////////////////////////////////////////
function startSocketGame() {
  postSocketUpdate("init");
}

function updateSocketGame(status, data, time) {
  if (multiplayerSettings.game == "wordsearch") {
    if (status == "init") {
      toggleSocketLoader(false);
      socketData.socketGameLogs = [];
      gameLogsTxt.text = "";
      if (data[0].index == socketData.index) {
        socketData.host = true;
      }

      for (var n = 0; n < data.length; n++) {
        if (data[n].index == socketData.index) {
          socketData.gameIndex = n;
          if (!multiplayerSettings.enterName) {
            showSocketNotification(
              textMultiplayerDisplay.playerNotification.replace(
                "[USER]",
                data[n].username
              )
            );
          }
        }
        $.players["gamePlayer" + n].text = data[n].username;
      }
      gameData.totalplayers = data.length;
      postSocketUpdate("category");
    } else if (status == "category") {
      categoryData.page = 1;
      goPage("category");
      if (!socketData.host) {
        gameLogsTxt.visible = true;
        toggleSocketLoader(true, textMultiplayerDisplay.waitingHost);
      }
    } else if (status == "updatecategory") {
      selectCategoryPage(data);
    } else if (status == "custom") {
      gameData.custom.column = customSettings.columnMin;
      gameData.custom.row = customSettings.rowMin;
      gameData.custom.words = customSettings.wordsMin;
      checkCustomSettings();
      goPage("custom");
      if (!socketData.host) {
        gameLogsTxt.visible = true;
        toggleSocketLoader(true, textMultiplayerDisplay.waitingHost);
      }
    } else if (status == "updatecustom") {
      gameData.custom.row = data.row;
      gameData.custom.column = data.column;
      gameData.custom.words = data.words;
      checkCustomSettings();
    } else if (status == "start") {
      toggleSocketLoader(false);
      goPage("game");

      socketData.turn = false;
      if (data.index == socketData.index) {
        socketData.turn = true;
        updateGameSocketLog(time + textMultiplayerDisplay.youStart);
        gameData.player = socketData.host == true ? 0 : 1;
      } else {
        updateGameSocketLog(
          time +
            textMultiplayerDisplay.playerStart.replace("[USER]", data.username)
        );
        gameData.player = socketData.host == true ? 1 : 0;
      }

      checkPlayerTurn();
    } else if (status == "updatetimer") {
      timeData.timer = data.timer;
      timeData.playerTimer = data.playerTimer;
      updateTimer();
    } else if (status == "updatepuzzle") {
      gameData.puzzle = data.puzzle;
      gameData.solve = data.solve;
      gameData.words = data.words;
      drawPuzzle();
      drawPuzzleWords();
    } else if (status == "updatemovecomplete") {
      togglePlayer();
      stopStroke();

      socketData.turn = false;
      if (data.index == socketData.index) {
        socketData.turn = true;
        updateGameSocketLog(time + textMultiplayerDisplay.yourTurn);
        gameData.player = socketData.host == true ? 0 : 1;
      } else {
        updateGameSocketLog(
          time +
            textMultiplayerDisplay.playerTurn.replace("[USER]", data.username)
        );
        gameData.player = socketData.host == true ? 1 : 0;
      }

      checkPlayerTurn();
    } else if (status == "startstroke") {
      gameData.strokeObj = $.puzzle[data.row + "_" + data.column];
      gameData.strokeColor = data.strokeColor;
      gameData.strokeDrawing = true;
      gameData.strokeStart = $.puzzle[data.row + "_" + data.column].pos;

      if (puzzleSettings.multiplayerStrokeColor) {
        gameData.strokeColor =
          puzzleSettings.multiplayerStrokeColors[gameData.player];
      }
      createNewStroke();
      playSound("soundHover");
    } else if (status == "updatestroke") {
      drawStroke(
        data.strokeIndex,
        data.strokeColor,
        data.sx,
        data.sy,
        data.ex,
        data.ey
      );
      loopStrokeLetter(data.ex, data.ey);
    } else if (status == "removestroke") {
      playSound("soundError");
      stopStroke();
    } else if (status == "completestroke") {
      completeStroke(data.wordIndex, data.row, data.column);
      updateCurWord("");
    } else if (status == "updateroundcomplete") {
      socketData.turn = false;
      if (data.index == socketData.index) {
        socketData.turn = true;
        updateGameSocketLog(time + textMultiplayerDisplay.yourTurn);
        gameData.player = socketData.host == true ? 0 : 1;
      } else {
        updateGameSocketLog(
          time +
            textMultiplayerDisplay.playerTurn.replace("[USER]", data.username)
        );
        gameData.player = socketData.host == true ? 1 : 0;
      }
      checkPlayerTurn();
    }
  }
}
