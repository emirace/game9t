///////////////////////////////////////////////////////////
// SOCKET CUSTOM
////////////////////////////////////////////////////////////
function startSocketGame() {
  postSocketUpdate("init");
}

function updateSocketGame(status, data, time) {
  if (multiplayerSettings.game == "memorychess") {
    if (status == "init") {
      toggleSocketLoader(false);
      socketData.socketGamelogs = [];
      if (typeof gameLogsTxt != "undefined") {
        gameLogsTxt.text = "";
      }
      if (data[0].index == socketData.index) {
        socketData.host = true;
      }

      gameData.names = [];
      for (var n = 0; n < data.length; n++) {
        gameData.names.push(data[n].username);
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
      gameData.players = data.length;
      postSocketUpdate("options");
    } else if (status == "options") {
      goPage("options");
      if (!socketData.host) {
        gameLogsTxt.visible = true;
        toggleSocketLoader(true, textMultiplayerDisplay.waitingHost);
      }
    } else if (status == "updateoptions") {
      gameData.sizeIndex = data.sizeIndex;
      gameData.winMode = data.winMode;
      gameData.themeIndex = data.themeIndex;
      toggleBoardOptions(data.option);
    } else if (status == "start") {
      socketData.loaded = [];
      gameLogsTxt.visible = false;
      goPage("game");
    } else if (status == "ready") {
      var loadedIndex = socketData.loaded.indexOf(data);
      if (loadedIndex == -1) {
        socketData.loaded.push(data);
      }

      if (socketData.loaded.length == gameData.players) {
        if (socketData.host) {
          postSocketUpdate("setupchess", gameData.pieceColors);
        }
      }
    } else if (status == "setupchess") {
      socketData.loaded = [];
      gameData.pieceColors = data;
      setupChess();
    } else if (status == "proceedrolldice") {
      socketData.loaded = [];
      gameData.diceIndex = data.diceIndex;
      proceedRollDice();
    } else if (status == "rolldicecomplete") {
      var loadedIndex = socketData.loaded.indexOf(data.index);
      if (loadedIndex == -1) {
        socketData.loaded.push(data.index);
      }

      if (socketData.loaded.length == gameData.players) {
        if (socketData.host) {
          postSocketUpdate("rolldicenext", data.next);
        }
      }
    } else if (status == "rolldicenext") {
      socketData.loaded = [];
      rollDiceNext();
    } else if (status == "showpiece") {
      socketData.loaded = [];
      showPiece(data.chessIndex, data.pieceIndex);
    } else if (status == "showpiececomplete") {
      var loadedIndex = socketData.loaded.indexOf(data.index);
      if (loadedIndex == -1) {
        socketData.loaded.push(data.index);
      }

      if (socketData.loaded.length == gameData.players) {
        if (socketData.host) {
          postSocketUpdate("nextplayerturn", { check: data.check });
        }
      }
    } else if (status == "nextplayerturn") {
      socketData.loaded = [];

      if (data.check) {
        if (gameSettings.nextPlayer) {
          nextPlayerTurn();
        }
      } else {
        nextPlayerTurn();
      }
      displayPlayerTurn();
    }
  }
}
