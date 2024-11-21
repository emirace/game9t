///////////////////////////////////////////////////////////
// SOCKET CUSTOM
////////////////////////////////////////////////////////////
function startSocketGame() {
  postSocketUpdate("init");
}

function updateSocketGame(status, data, time) {
  if (multiplayerSettings.game == "snakesandladders") {
    if (status == "init") {
      toggleSocketLoader(false);
      socketData.socketGamelogs = [];
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
      }
      gameData.totalplayers = data.length;
      if (socketData.host) {
        postSocketUpdate("level");
      }
    } else if (status == "level") {
      goPage("level");
      selectBoardThumbs(0);
      selectPage(1);
      if (!socketData.host) {
        gameLogsTxt.visible = true;
        toggleSocketLoader(true, textMultiplayerDisplay.waitingHost);
      }
    } else if (status == "updatelevel") {
      selectPage(data);
    } else if (status == "updatethumb") {
      selectBoardThumbs(data);
    } else if (status == "start") {
      toggleSocketLoader(false);
      socketData.turn = false;
      if (data.index == socketData.index) {
        socketData.turn = true;
        updateGameSocketLog(time + textMultiplayerDisplay.youStart);
        playerTurnTxt.text = textMultiplayerDisplay.youStart;
      } else {
        updateGameSocketLog(
          time +
            textMultiplayerDisplay.playerStart.replace("[USER]", data.username)
        );
        playerTurnTxt.text = textMultiplayerDisplay.playerStart.replace(
          "[USER]",
          data.username
        );
      }
      goPage("game");
      gameData.player = data.turn;
      prepareArrow();
    } else if (status == "dice") {
      gameData.diceNum = data;
      diceAnimate.gotoAndStop(gameData.diceNum);
    } else if (status == "roll") {
      animateDice(data);
    } else if (status == "rollcomplete") {
      socketData.loaded = [];
      updateAnimateDiceComplete();
    } else if (status == "extraturn") {
      var loadedIndex = socketData.loaded.indexOf(data);
      if (loadedIndex == -1) {
        socketData.loaded.push(data);
      }

      if (
        socketData.loaded.length == gameData.totalplayers &&
        socketData.host
      ) {
        if (socketData.turn) {
          animateDice();
        }
      }
    } else if (status == "movecomplete") {
      var loadedIndex = socketData.loaded.indexOf(data);
      if (loadedIndex == -1) {
        socketData.loaded.push(data);
      }

      if (
        socketData.loaded.length == gameData.totalplayers &&
        socketData.host
      ) {
        postSocketUpdate("nextplayer");
      }
    } else if (status == "nextplayer") {
      socketData.turn = false;
      socketData.winner = data.username;
      if (data.index == socketData.index) {
        socketData.turn = true;
        updateGameSocketLog(time + textMultiplayerDisplay.yourTurn);
        playerTurnTxt.text = textMultiplayerDisplay.yourTurn;
      } else {
        updateGameSocketLog(
          time +
            textMultiplayerDisplay.playerTurn.replace("[USER]", data.username)
        );
        playerTurnTxt.text = textMultiplayerDisplay.playerTurn.replace(
          "[USER]",
          data.username
        );
      }
      gameData.player = data.turn;
      prepareArrow();
    }
  }
}
