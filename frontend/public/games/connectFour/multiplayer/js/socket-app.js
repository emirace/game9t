///////////////////////////////////////////////////////////
// SOCKET CUSTOM
////////////////////////////////////////////////////////////
function startSocketGame() {
  postSocketUpdate("init");
}

function updateSocketGame(status, data, time) {
  if (multiplayerSettings.game == "connectfour") {
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
      postSocketUpdate("custom");
    } else if (status == "custom") {
      gameData.custom.column = customSettings.columnMin;
      gameData.custom.row = customSettings.rowMin;
      gameData.custom.connect = customSettings.connectMin;
      checkCustomSettings();
      goPage("custom");
      if (!socketData.host) {
        gameLogsTxt.visible = true;
        toggleSocketLoader(true, textMultiplayerDisplay.waitingHost);
      }
    } else if (status == "updatecustom") {
      gameData.custom.row = data.row;
      gameData.custom.column = data.column;
      gameData.custom.connect = data.connect;
      checkCustomSettings();
    } else if (status == "players") {
      goPage("players");
      if (!socketData.host) {
        gameLogsTxt.visible = true;
        toggleSocketLoader(true, textMultiplayerDisplay.waitingHost);
      }
    } else if (status == "updateplayers") {
      gameData.icon = data.icon;
      gameData.switch = data.switch;
      gameData.icons = data.icons;
      displayPlayerIcon();
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

      displayPlayerTurn();
    } else if (status == "updatetimer") {
      timeData.timer = data;
      updateTimer();
    } else if (status == "updatemove") {
      placeMove(data.column);
    } else if (status == "updatemovecomplete") {
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

      gameData.moving = false;
      displayPlayerTurn();
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

      gameData.moving = false;
      displayPlayerTurn();
    }
  }
}
