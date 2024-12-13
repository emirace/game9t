////////////////////////////////////////////////////////////
// GAME v1.1
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */

//theme settings
var themesSettings = [
  {
    boards: ["assets/board_01_a.png", "assets/board_01_b.png"],
    colors: ["RED", "BLUE", "YELLOW", "BLACK", "WHITE", "GREEN"],
    hole: "assets/board_hole_01.png",
    holeHighlight: "assets/board_hole_01_h.png",
    dice: "assets/item_dice_01.png",
    diceHighlight: "assets/item_dice_01_h.png",
    pieceTop: [
      { src: "assets/chess_01_a.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_01_b.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_01_c.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_01_d.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_01_e.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_01_f.png", regX: 18, regY: 20, height: 60 },
    ],
    pieceBottom: [
      { src: "assets/chess_01_a_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_01_b_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_01_c_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_01_d_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_01_e_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_01_f_b.png", regX: 18, regY: 10, height: 60 },
    ],
  },
  {
    boards: ["assets/board_02_a.png", "assets/board_02_b.png"],
    colors: ["RED", "BLUE", "YELLOW", "PURPLE", "WHITE", "GREEN"],
    hole: "assets/board_hole_02.png",
    holeHighlight: "assets/board_hole_02_h.png",
    dice: "assets/item_dice_02.png",
    diceHighlight: "assets/item_dice_02_h.png",
    pieceTop: [
      { src: "assets/chess_02_a.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_02_b.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_02_c.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_02_d.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_02_e.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_02_f.png", regX: 18, regY: 20, height: 60 },
    ],
    pieceBottom: [
      { src: "assets/chess_02_a_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_02_b_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_02_c_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_02_d_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_02_e_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_02_f_b.png", regX: 18, regY: 10, height: 60 },
    ],
  },
  {
    boards: ["assets/board_03_a.png", "assets/board_03_b.png"],
    colors: ["RED", "BLUE", "YELLOW", "BLACK", "WHITE", "GREEN"],
    hole: "assets/board_hole_03.png",
    holeHighlight: "assets/board_hole_03_h.png",
    dice: "assets/item_dice_03.png",
    diceHighlight: "assets/item_dice_03_h.png",
    pieceTop: [
      { src: "assets/chess_03_a.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_03_b.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_03_c.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_03_d.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_03_e.png", regX: 18, regY: 20, height: 60 },
      { src: "assets/chess_03_f.png", regX: 18, regY: 20, height: 60 },
    ],
    pieceBottom: [
      { src: "assets/chess_03_a_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_03_b_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_03_c_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_03_d_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_03_e_b.png", regX: 18, regY: 10, height: 60 },
      { src: "assets/chess_03_f_b.png", regX: 18, regY: 10, height: 60 },
    ],
  },
  {
    boards: ["assets/board_04_a.png", "assets/board_04_b.png"],
    colors: ["RED", "BLUE", "YELLOW", "BLACK", "WHITE", "GREEN"],
    hole: "assets/board_hole_04.png",
    holeHighlight: "assets/board_hole_04_h.png",
    dice: "assets/item_dice_01.png",
    diceHighlight: "assets/item_dice_04_h.png",
    pieceTop: [
      { src: "assets/chess_04_a.png", regX: 18, regY: 20, height: 40 },
      { src: "assets/chess_04_b.png", regX: 18, regY: 20, height: 40 },
      { src: "assets/chess_04_c.png", regX: 18, regY: 20, height: 40 },
      { src: "assets/chess_04_d.png", regX: 18, regY: 20, height: 40 },
      { src: "assets/chess_04_e.png", regX: 18, regY: 20, height: 40 },
      { src: "assets/chess_04_f.png", regX: 18, regY: 20, height: 40 },
    ],
    pieceBottom: [
      { src: "assets/chess_04_a_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_04_b_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_04_c_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_04_d_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_04_e_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_04_f_b.png", regX: 18, regY: 10, height: 50 },
    ],
  },
  {
    boards: ["assets/board_05_a.png", "assets/board_05_b.png"],
    colors: ["RED", "BLUE", "YELLOW", "PURPLE", "WHITE", "GREEN"],
    hole: "assets/board_hole_05.png",
    holeHighlight: "assets/board_hole_05_h.png",
    dice: "assets/item_dice_02.png",
    diceHighlight: "assets/item_dice_05_h.png",
    pieceTop: [
      { src: "assets/chess_05_a.png", regX: 18, regY: 10, height: 40 },
      { src: "assets/chess_05_b.png", regX: 18, regY: 10, height: 40 },
      { src: "assets/chess_05_c.png", regX: 18, regY: 10, height: 40 },
      { src: "assets/chess_05_d.png", regX: 18, regY: 10, height: 40 },
      { src: "assets/chess_05_e.png", regX: 18, regY: 10, height: 40 },
      { src: "assets/chess_05_f.png", regX: 18, regY: 10, height: 40 },
    ],
    pieceBottom: [
      { src: "assets/chess_05_a_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_05_b_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_05_c_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_05_d_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_05_e_b.png", regX: 18, regY: 10, height: 50 },
      { src: "assets/chess_05_f_b.png", regX: 18, regY: 10, height: 50 },
    ],
  },
];

//game settings
var gameSettings = {
  showColorAnimation: true, //start with pieces animation
  showColorTime: 1,
  showColorPickSpeed: 1,
  showColorDownSpeed: 0.5,
  autoRollDice: false, //auto roll dice
  nextPlayer: false, //switch to next player when player match the color on the dice
  aiThinkSpeed: 1,
  pickSpeed: 0.2,
  pickDelay: 0.5,
  backDownSpeed: 0.2,
  correctSpeed: 0.2,
  autoEnd: true, //end game when no possible pieces to win
};

//game text display
var textDisplay = {
  optionsTitle: "OPTIONS",
  tutorialTitle: "HOW TO PLAY?",
  totalPlayers: "[NUMBER] PLAYERS",
  totalPieces: "[NUMBER] PIECES",
  vs: ["VS COMPUTER", "VS PLAYER"],
  modes: ["LARGEST NUMBER WIN", "4 SAME COLORS WIN", "6 PIECES COLORS WIN"],
  instruction1: "ROLL DICE TO BEGIN",
  instruction2: "PICK PIECES THAT MATCH THE DICE COLOR",
  playerName: "PLAYER [NUMBER]",
  scoreType: ["PIECES", "PIECES", "COLORS"],
  userTurn: "YOUR TURN",
  playerTurn: "PLAYING...",
  gameOver: "GAME OVER",
  youWin: "YOU WIN",
  playerWin: "[NAME] WIN",
  gameDraw: "GAME DRAW",
  noPlayerWin: "NO PLAYER WIN",
  winRules: [
    "Largest number of pieces",
    "4 same color pieces",
    "6 piece of each colors",
  ],
  exitTitle: "EXIT GAME",
  exitMessage: "Are you sure you want\nto quit game?",
  share: "SHARE YOUR SCORE:",
  resultTitle: "BEST SCORE",
  resultDesc: "[NUMBER] PIECES",
};

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = "Highscore on Memory Chess is [SCORE] pieces"; //social share score title
var shareMessage =
  "[SCORE] pieces is mine new highscore on Memory Chess game! Try it now!"; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = { enable: false };
var playerData = { score: 0, scores: [], colors: [] };
var gameData = {
  paused: true,
  player: 0,
  lastPlayer: 0,
  players: 0,
  themeIndex: 0,
  sizeIndex: 0,
  ai: true,
  complete: false,
  names: [],
  reveals: [],
};
var tweenData = { score: 0, tweenScore: 0 };
var animateData = { alpha: 0 };

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
function buildGameButton() {
  $(window).focus(function () {
    if (!buttonSoundOn.visible) {
      toggleSoundInMute(false);
    }

    if (typeof buttonMusicOn != "undefined") {
      if (!buttonMusicOn.visible) {
        toggleMusicInMute(false);
      }
    }
  });

  $(window).blur(function () {
    if (!buttonSoundOn.visible) {
      toggleSoundInMute(true);
    }

    if (typeof buttonMusicOn != "undefined") {
      if (!buttonMusicOn.visible) {
        toggleMusicInMute(true);
      }
    }
  });

  buttonPlay.cursor = "pointer";
  buttonPlay.addEventListener("click", function (evt) {
    playSound("soundButton");
    if (typeof initSocket == "function" && multiplayerSettings.enable) {
      if (multiplayerSettings.localPlay) {
        toggleMainButton("local");
      } else {
        checkQuickGameMode();
      }
    } else {
      goPage("options");
    }
  });

  buttonLocal.cursor = "pointer";
  buttonLocal.addEventListener("click", function (evt) {
    playSound("soundButton");
    socketData.online = false;
    buttonLocalContainer.visible = false;
    startLocalGame();
  });

  buttonOnline.cursor = "pointer";
  buttonOnline.addEventListener("click", function (evt) {
    playSound("soundButton");
    buttonPlay.visible = false;
    buttonLocalContainer.visible = false;
    buttonLocalContainer.visible = false;
    startPlayerGame();
  });

  buttonPlayersL.cursor = "pointer";
  buttonPlayersL.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleTotalPlayers(false);
  });

  buttonPlayersR.cursor = "pointer";
  buttonPlayersR.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleTotalPlayers(true);
  });

  buttonVSL.cursor = "pointer";
  buttonVSL.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleAI(true);
  });

  buttonVSR.cursor = "pointer";
  buttonVSR.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleAI(false);
  });

  buttonBeadsL.cursor = "pointer";
  buttonBeadsL.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleBeads(false);
  });

  buttonBeadsR.cursor = "pointer";
  buttonBeadsR.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleBeads(true);
  });

  buttonTypeL.cursor = "pointer";
  buttonTypeL.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleGameType(false);
  });

  buttonTypeR.cursor = "pointer";
  buttonTypeR.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleGameType(true);
  });

  buttonThemeL.cursor = "pointer";
  buttonThemeL.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleTheme(false);
  });

  buttonThemeR.cursor = "pointer";
  buttonThemeR.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleTheme(true);
  });

  buttonTutorialL.cursor = "pointer";
  buttonTutorialL.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleTutorial(false);
  });

  buttonTutorialR.cursor = "pointer";
  buttonTutorialR.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleTutorial(true);
  });

  buttonNext.cursor = "pointer";
  buttonNext.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleBoardOptions(2);
  });

  buttonTutorial.cursor = "pointer";
  buttonTutorial.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleBoardOptions(3);
  });

  buttonBack.cursor = "pointer";
  buttonBack.addEventListener("click", function (evt) {
    playSound("soundButton");
    toggleBoardOptions(gameData.lastOption);
  });

  buttonStart.cursor = "pointer";
  buttonStart.addEventListener("click", function (evt) {
    playSound("soundButton");
    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online
    ) {
      postSocketUpdate("start");
    } else {
      goPage("game");
    }
  });

  itemExit.addEventListener("click", function (evt) {});

  buttonContinue.cursor = "pointer";
  buttonContinue.addEventListener("click", function (evt) {
    playSound("soundButton");
    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online &&
      multiplayerSettings.rejoinRoom
    ) {
      goPage("room");
      $("#roomlists").val(socketData.lastRoom);
      joinSocketRoom();
    } else {
      goPage("main");
    }
  });

  buttonFacebook.cursor = "pointer";
  buttonFacebook.addEventListener("click", function (evt) {
    share("facebook");
  });

  buttonTwitter.cursor = "pointer";
  buttonTwitter.addEventListener("click", function (evt) {
    share("twitter");
  });
  buttonWhatsapp.cursor = "pointer";
  buttonWhatsapp.addEventListener("click", function (evt) {
    share("whatsapp");
  });

  buttonSoundOff.cursor = "pointer";
  buttonSoundOff.addEventListener("click", function (evt) {
    toggleSoundMute(true);
  });

  buttonSoundOn.cursor = "pointer";
  buttonSoundOn.addEventListener("click", function (evt) {
    toggleSoundMute(false);
  });

  if (typeof buttonMusicOff != "undefined") {
    buttonMusicOff.cursor = "pointer";
    buttonMusicOff.addEventListener("click", function (evt) {
      toggleMusicMute(true);
    });
  }

  if (typeof buttonMusicOn != "undefined") {
    buttonMusicOn.cursor = "pointer";
    buttonMusicOn.addEventListener("click", function (evt) {
      toggleMusicMute(false);
    });
  }

  buttonFullscreen.cursor = "pointer";
  buttonFullscreen.addEventListener("click", function (evt) {
    toggleFullScreen();
  });

  buttonExit.cursor = "pointer";
  buttonExit.addEventListener("click", function (evt) {
    togglePop(true);
    toggleOption();
  });

  buttonSettings.cursor = "pointer";
  buttonSettings.addEventListener("click", function (evt) {
    toggleOption();
  });

  buttonConfirm.cursor = "pointer";
  buttonConfirm.addEventListener("click", function (evt) {
    playSound("soundButton");
    togglePop(false);

    stopAudio();
    exitSocketGame("left", playerData);
    stopGame();
    goPage("main");

    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online
    ) {
      exitSocketRoom();
    }
  });

  buttonCancel.cursor = "pointer";
  buttonCancel.addEventListener("click", function (evt) {
    playSound("soundButton");
    togglePop(false);
  });

  window.addEventListener(
    "blur",
    function () {
      TweenMax.ticker.useRAF(false);
    },
    false
  );

  window.addEventListener(
    "focus",
    function () {
      TweenMax.ticker.useRAF(true);
    },
    false
  );

  gameData.memorychess = {
    sizes: [24, 40],
    maxPlayers: 6,
    minPlayers: 2,
    winMode: 0,
  };

  gameData.players = gameData.memorychess.minPlayers;
  gameData.sizeIndex = 0;
  gameData.themeIndex = 0;
  gameData.lastThemeIndex = -1;
  gameData.winMode = 0;
  gameData.lastOption = 1;
  gameData.tutorial = 1;

  displayBoardOptions();
}

/*!
 *
 * TOGGLE GAME TYPE - This is the function that runs to toggle game type
 *
 */
function toggleMainButton(con) {
  if (typeof initSocket == "function" && multiplayerSettings.enable) {
    gameLogsTxt.visible = true;
    gameLogsTxt.text = "";
  }

  buttonPlay.visible = false;
  buttonLocalContainer.visible = false;

  if (con == "default") {
    buttonPlay.visible = true;
  } else if (con == "local") {
    buttonLocalContainer.visible = true;
  }
}

function checkQuickGameMode() {
  socketData.online = true;
  if (!multiplayerSettings.enterName) {
    buttonPlay.visible = false;
    buttonLocalContainer.visible = false;

    addSocketRandomUser();
  } else {
    goPage("name");
  }
}

function toggleTotalPlayers(con) {
  if (con) {
    gameData.players++;
    gameData.players =
      gameData.players > gameData.memorychess.maxPlayers
        ? gameData.memorychess.maxPlayers
        : gameData.players;
  } else {
    gameData.players--;
    gameData.players =
      gameData.players < gameData.memorychess.minPlayers
        ? gameData.memorychess.minPlayers
        : gameData.players;
  }

  updateCardsOption();
}

function toggleBeads(con) {
  if (con) {
    gameData.sizeIndex++;
    gameData.sizeIndex =
      gameData.sizeIndex > gameData.memorychess.sizes.length - 1
        ? gameData.memorychess.sizes.length - 1
        : gameData.sizeIndex;
  } else {
    gameData.sizeIndex--;
    gameData.sizeIndex = gameData.sizeIndex < 0 ? 0 : gameData.sizeIndex;
  }

  updateCardsOption();
}

function toggleAI(con) {
  gameData.ai = con;
  updateCardsOption();
}

function toggleGameType(con) {
  if (con) {
    gameData.winMode++;
    gameData.winMode = gameData.winMode > 2 ? 2 : gameData.winMode;
  } else {
    gameData.winMode--;
    gameData.winMode = gameData.winMode < 0 ? 0 : gameData.winMode;
  }

  updateCardsOption();
}

function toggleTheme(con) {
  if (con) {
    gameData.themeIndex++;
    gameData.themeIndex =
      gameData.themeIndex > themesSettings.length - 1
        ? themesSettings.length - 1
        : gameData.themeIndex;
  } else {
    gameData.themeIndex--;
    gameData.themeIndex = gameData.themeIndex < 0 ? 0 : gameData.themeIndex;
  }

  updateCardsOption();
}

function updateCardsOption() {
  displayBoardOptions();
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (socketData.host) {
      postSocketUpdate(
        "updateoptions",
        {
          sizeIndex: gameData.sizeIndex,
          winMode: gameData.winMode,
          themeIndex: gameData.themeIndex,
          option: gameData.lastOption,
        },
        true
      );
    }
  }
}

function displayBoardOptions() {
  var totalPieces = gameData.memorychess.sizes[gameData.sizeIndex];
  totalPlayersTxt.text = textDisplay.totalPlayers.replace(
    "[NUMBER]",
    gameData.players
  );
  vsModeTxt.text = gameData.ai == true ? textDisplay.vs[0] : textDisplay.vs[1];
  beadsTxt.text = textDisplay.totalPieces.replace("[NUMBER]", totalPieces);
  typeTxt.text = textDisplay.modes[gameData.winMode];

  //theme
  if (gameData.lastThemeIndex != gameData.themeIndex) {
    gameData.lastThemeIndex = gameData.themeIndex;

    themeContainer.removeAllChildren();

    var randomPiece = [];
    for (
      var c = 0;
      c < themesSettings[gameData.themeIndex].pieceTop.length;
      c++
    ) {
      randomPiece.push(c);
    }
    shuffle(randomPiece);
    randomPiece.length = randomPiece.length > 6 ? 6 : randomPiece.length;

    var pieceW = 40;
    var posData = { x: 0, y: 0 };
    posData.x = -((pieceW * randomPiece.length - 1) / 2);
    posData.x += pieceW / 2;
    for (var n = 0; n < randomPiece.length; n++) {
      var newPiece = new createjs.Bitmap(
        loader.getResult(
          "pieceTop" + gameData.themeIndex + "_" + randomPiece[n]
        )
      );
      centerReg(newPiece);
      newPiece.scaleX = newPiece.scaleY = 0.7;
      newPiece.x = posData.x;
      posData.x += pieceW;
      themeContainer.addChild(newPiece);
    }
  }
}

function toggleBoardOptions(page) {
  itemPlayerNumbers.visible = false;
  totalPlayersTxt.visible = false;
  buttonPlayersL.visible = false;
  buttonPlayersR.visible = false;

  itemVS.visible = false;
  vsModeTxt.visible = false;
  buttonVSL.visible = false;
  buttonVSR.visible = false;

  itemPoints.visible = false;
  beadsTxt.visible = false;
  buttonBeadsL.visible = false;
  buttonBeadsR.visible = false;

  itemType.visible = false;
  typeTxt.visible = false;
  buttonTypeL.visible = false;
  buttonTypeR.visible = false;

  themeContainer.visible = false;
  buttonThemeL.visible = false;
  buttonThemeR.visible = false;

  buttonNext.visible = false;
  buttonStart.visible = false;
  buttonTutorial.visible = false;
  boardOptionsListContainer.visible = false;

  buttonTutorialL.visible = false;
  buttonTutorialR.visible = false;
  buttonBack.visible = false;
  boardOptionsTutorialContainer.visible = false;

  if (page == 1) {
    gameData.lastOption = 1;
    boardOptionsListContainer.visible = true;
    itemPlayerNumbers.visible = true;
    totalPlayersTxt.visible = true;
    buttonPlayersL.visible = true;
    buttonPlayersR.visible = true;

    itemVS.visible = true;
    vsModeTxt.visible = true;
    buttonVSL.visible = true;
    buttonVSR.visible = true;

    buttonNext.visible = true;
    buttonTutorial.visible = true;
  } else if (page == 2) {
    gameData.lastOption = 2;
    boardOptionsListContainer.visible = true;

    itemType.visible = true;
    typeTxt.visible = true;
    buttonTypeL.visible = true;
    buttonTypeR.visible = true;

    itemPoints.visible = true;
    beadsTxt.visible = true;
    buttonBeadsL.visible = true;
    buttonBeadsR.visible = true;

    themeContainer.visible = true;
    buttonThemeL.visible = true;
    buttonThemeR.visible = true;
    buttonStart.visible = true;
    buttonTutorial.visible = true;

    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online
    ) {
      if (!socketData.host) {
        buttonBeadsL.visible = false;
        buttonBeadsR.visible = false;
        buttonTypeL.visible = false;
        buttonTypeR.visible = false;
        buttonThemeL.visible = false;
        buttonThemeR.visible = false;
        buttonStart.visible = false;
        buttonTutorial.visible = false;
      }
    }
  } else if (page == 3) {
    boardOptionsTutorialContainer.visible = true;
    buttonTutorialL.visible = true;
    buttonTutorialR.visible = true;
    buttonBack.visible = true;

    displayTutorial();
  }

  updateCardsOption();
  resizeGameLayout();
}

function toggleTutorial(con) {
  if (con) {
    gameData.tutorial++;
    gameData.tutorial = gameData.tutorial > 6 ? 6 : gameData.tutorial;
  } else {
    gameData.tutorial--;
    gameData.tutorial = gameData.tutorial < 1 ? 1 : gameData.tutorial;
  }

  displayTutorial();
}

function displayTutorial() {
  for (var n = 0; n < 6; n++) {
    $.tutorial[n].visible = false;
  }
  $.tutorial[gameData.tutorial - 1].visible = true;
  tutorialPageTxt.text = gameData.tutorial + "/6";

  buttonTutorialL.visible = true;
  buttonTutorialR.visible = true;
  if (gameData.tutorial == 1) {
    buttonTutorialL.visible = false;
  }
  if (gameData.tutorial == 6) {
    buttonTutorialR.visible = false;
  }
}

function resizeSocketLog() {
  if (curPage == "main") {
    if (viewport.isLandscape) {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 75;
    } else {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 75;
    }
  } else if (curPage == "options") {
    if (viewport.isLandscape) {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 67;
    } else {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 65;
    }
  }
}

/*!
 *
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 *
 */
function togglePop(con) {
  confirmContainer.visible = con;
}

/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
var curPage = "";
function goPage(page) {
  curPage = page;

  $("#roomWrapper").hide();
  $("#roomWrapper .innerContent").hide();
  gameLogsTxt.visible = false;

  mainContainer.visible = false;
  nameContainer.visible = false;
  roomContainer.visible = false;
  boardOptionsContainer.visible = false;
  gameContainer.visible = false;
  resultContainer.visible = false;

  var targetContainer = null;
  switch (page) {
    case "main":
      targetContainer = mainContainer;

      if (typeof initSocket == "function" && multiplayerSettings.enable) {
        socketData.online = false;
      }
      toggleMainButton("default");
      playMusicLoop("musicMain");
      stopMusicLoop("musicGame");
      break;

    case "name":
      targetContainer = nameContainer;
      $("#roomWrapper").show();
      $("#roomWrapper .nameContent").show();
      $("#roomWrapper .fontNameError").html("");
      $("#enterName").show();
      break;

    case "room":
      targetContainer = roomContainer;
      $("#roomWrapper").show();
      $("#roomWrapper .roomContent").show();
      switchSocketRoomContent("lists");
      break;

    case "options":
      targetContainer = boardOptionsContainer;

      gameData.sizeIndex = 0;
      gameData.winMode = 0;
      gameData.themeIndex = 0;

      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        gameData.ai = false;
        toggleBoardOptions(2);
      } else {
        gameData.ai = true;
        toggleBoardOptions(1);
      }
      break;

    case "game":
      targetContainer = gameContainer;
      playMusicLoop("musicGame");
      stopMusicLoop("musicMain");
      startGame();
      break;

    case "result":
      targetContainer = resultContainer;
      stopGame();
      togglePop(false);

      playMusicLoop("musicMain");
      stopMusicLoop("musicGame");
      playSound("soundResult");
      tweenData.tweenScore = 0;

      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        playerData.score = playerData.scores[socketData.gameIndex];

        if (socketData.host) {
          postSocketCloseRoom();
        } else {
          exitSocketRoom();
        }
      } else {
        playerData.score = playerData.scores[0];
      }

      tweenData.tweenScore = 0;
      TweenMax.to(tweenData, 0.5, {
        tweenScore: playerData.score,
        overwrite: true,
        onUpdate: function () {
          resultDescTxt.text = textDisplay.resultDesc.replace(
            "[NUMBER]",
            addCommas(Math.floor(tweenData.tweenScore))
          );
        },
      });

      saveGame(playerData.score);
      break;
  }

  if (targetContainer != null) {
    targetContainer.visible = true;
    targetContainer.alpha = 0;
    TweenMax.to(targetContainer, 0.5, { alpha: 1, overwrite: true });
  }

  resizeCanvas();
}

/*!
 *
 * START GAME - This is the function that runs to start game
 *
 */
function startGame() {
  gameData.paused = false;
  gameData.rollCon = false;
  gameData.piecesCon = false;

  gameData.seq = [];
  gameData.ready = false;
  gameData.player = 0;
  gameData.lastPlayer = -1;

  gameData.rollTime = 0;
  gameData.rollCorrect = false;

  gameData.settings = {
    size: gameData.memorychess.sizes[gameData.sizeIndex],
    winMode: gameData.winMode,
  };

  playerData.scores = [];
  for (var n = 0; n < gameData.players; n++) {
    playerData.scores.push(0);
  }

  playerData.colors = [];
  for (var n = 0; n < gameData.players; n++) {
    var colors = [];
    for (var c = 0; c < 6; c++) {
      colors.push(0);
    }
    playerData.colors.push(colors);
  }

  statusContainer.alpha = 0;
  instructionContainer.alpha = 0;
  animateBlink(animateData);
  buildBoard();
  showDice();
  playSound("soundStart");

  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    var startCount = socketData.gameIndex;
    for (var n = 0; n < gameData.players; n++) {
      gameData.seq.push(startCount);
      startCount++;
      startCount = startCount > gameData.players - 1 ? 0 : startCount;
    }
    postSocketUpdate("ready", socketData.gameIndex);
  } else {
    for (var n = 0; n < gameData.players; n++) {
      gameData.seq.push(n);
    }
    setupChess();
  }
}

function startBoard() {
  gameData.instructCount = 0;
  showInstruction(1);
  displayPlayerTurn();
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
  gameData.paused = true;
  TweenMax.killAll(false, true, false);
}

function saveGame(score) {
  if (typeof toggleScoreboardSave == "function") {
    $.scoreData.score = score;
    if (typeof type != "undefined") {
      $.scoreData.type = type;
    }
    toggleScoreboardSave(true);
  }

  /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 *
 * RESIZE GAME LAYOUT - This is the function that runs to resize game layout
 *
 */
function resizeGameLayout() {
  if (curPage == "game") {
    statusContainer.x = canvasW / 2;
    statusContainer.y = canvasH / 2;

    instructionContainer.x = canvasW / 2;
    instructionContainer.y = (canvasH / 100) * 65;

    boardContainer.x = canvasW / 2;
    boardContainer.y = (canvasH / 100) * 45;

    boardContainer.scaleX = boardContainer.scaleY = 1;
    boardContainer.rotation = 0;

    var minBoardWidth = 750;
    var minBoardHeight = 500;
    if (!viewport.isLandscape) {
      minBoardWidth = 650;
      minBoardHeight = 520;
      if (gameData.settings.width > gameData.settings.height) {
        boardContainer.rotation = 90;
      }
    }

    var boardScaleW = 1;
    var boardScaleH = 1;
    if (gameData.settings.height > minBoardHeight) {
      var boardScaleH = minBoardHeight / gameData.settings.height;
    }
    if (gameData.settings.width > minBoardWidth) {
      var boardScaleW = minBoardWidth / gameData.settings.width;
    }

    if (boardScaleW < boardScaleH) {
      boardContainer.scaleX = boardContainer.scaleY = boardScaleW;
    } else {
      boardContainer.scaleX = boardContainer.scaleY = boardScaleH;
    }

    if (gameData.ready) {
      var positionLayout = [
        {
          x: (canvasW / 100) * 15,
          y: canvasH / 2,
          horizontal: true,
        },
        {
          x: (canvasW / 100) * 85,
          y: canvasH / 2,
          horizontal: true,
        },
        {
          x: (canvasW / 100) * 15,
          y: canvasH / 2,
          horizontal: false,
        },
        {
          x: (canvasW / 100) * 85,
          y: canvasH / 2,
          horizontal: false,
        },
        {
          x: (canvasW / 100) * 15,
          y: canvasH / 2,
          horizontal: false,
        },
        {
          x: (canvasW / 100) * 85,
          y: canvasH / 2,
          horizontal: false,
        },
      ];

      if (!viewport.isLandscape) {
        positionLayout = [
          {
            x: canvasW / 2,
            y: (canvasH / 100) * 86,
            horizontal: true,
          },
          {
            x: canvasW / 2,
            y: (canvasH / 100) * 12,
            horizontal: true,
          },
          {
            x: canvasW / 2,
            y: (canvasH / 100) * 86,
            horizontal: false,
          },
          {
            x: canvasW / 2,
            y: (canvasH / 100) * 12,
            horizontal: false,
          },
          {
            x: canvasW / 2,
            y: (canvasH / 100) * 86,
            horizontal: false,
          },
          {
            x: canvasW / 2,
            y: (canvasH / 100) * 12,
            horizontal: false,
          },
        ];
      }

      var positionArr = [];
      if (gameData.players == 2) {
        positionArr = [0, 1];
      } else if (gameData.players >= 5) {
        if (viewport.isLandscape) {
          positionLayout[0].y = canvasH / 2 - 150;
          positionLayout[1].y = canvasH / 2 - 150;
          positionLayout[2].y = canvasH / 2;
          positionLayout[3].y = canvasH / 2;
          positionLayout[4].y = canvasH / 2 + 150;
          positionLayout[5].y = canvasH / 2 + 150;
          positionArr = [0, 1, 2, 3, 4, 5];
        } else {
          positionLayout[0].x = canvasW / 2 - 150;
          positionLayout[1].x = canvasW / 2 - 150;
          positionLayout[2].x = canvasW / 2;
          positionLayout[3].x = canvasW / 2;
          positionLayout[4].x = canvasW / 2 + 150;
          positionLayout[5].x = canvasW / 2 + 150;
          positionArr = [0, 2, 4, 1, 3, 5];
        }
      } else {
        if (viewport.isLandscape) {
          positionLayout[0].y = canvasH / 2 - 70;
          positionLayout[1].y = canvasH / 2 - 70;
          positionLayout[2].y = canvasH / 2 + 70;
          positionLayout[3].y = canvasH / 2 + 70;
          positionArr = [0, 1, 2, 3];
        } else {
          positionLayout[0].x = canvasW / 2 - 90;
          positionLayout[1].x = canvasW / 2 - 90;
          positionLayout[2].x = canvasW / 2 + 90;
          positionLayout[3].x = canvasW / 2 + 90;
          positionArr = [0, 2, 1, 3];
        }
      }

      for (var n = 0; n < gameData.players; n++) {
        var seqIndex = gameData.seq[n];
        $.players[seqIndex].x = positionLayout[positionArr[n]].x;
        $.players[seqIndex].y = positionLayout[positionArr[n]].y;
        $.players[seqIndex].horizontal =
          positionLayout[positionArr[n]].horizontal;
      }
    }
  }
}

/*!
 *
 * PREPARE PLAYERS - This is the function that runs to prepare players
 *
 */
function preparePlayers() {
  playersContainer.removeAllChildren();

  for (var n = 0; n < gameData.players; n++) {
    $.players[n] = new createjs.Container();
    $.players[n].score = 0;
    $.players[n].playerIndex = n;

    var bgPlayer = new createjs.Bitmap(loader.getResult("itemPlayer"));
    centerReg(bgPlayer);
    var bgPlayerH = new createjs.Bitmap(loader.getResult("itemPlayerH"));
    centerReg(bgPlayerH);
    bgPlayerH.visible = false;

    var newPlayerName = new createjs.Text();
    newPlayerName.font = "18px bpreplaybold";
    newPlayerName.color = "#fff";
    newPlayerName.textAlign = "center";
    newPlayerName.textBaseline = "middle";
    newPlayerName.text = textDisplay.playerName.replace("[NUMBER]", n + 1);
    newPlayerName.y = 30;

    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online
    ) {
      newPlayerName.text = gameData.names[n];
    }

    var newPlayerScore = new createjs.Text();
    newPlayerScore.font = "25px bpreplaybold";
    newPlayerScore.color = "#64F8FF";
    newPlayerScore.textAlign = "center";
    newPlayerScore.textBaseline = "middle";
    newPlayerScore.text = playerData.scores[n];
    newPlayerScore.y = -20;

    var newPlayerScoreType = new createjs.Text();
    newPlayerScoreType.font = "12px bpreplaybold";
    newPlayerScoreType.color = "#fff";
    newPlayerScoreType.textAlign = "center";
    newPlayerScoreType.textBaseline = "middle";
    newPlayerScoreType.y = -2;

    var newPlayerStatus = new createjs.Text();
    newPlayerStatus.font = "18px bpreplaybold";
    newPlayerStatus.color = "#fff";
    newPlayerStatus.textAlign = "center";
    newPlayerStatus.textBaseline = "middle";
    newPlayerStatus.text = "";
    newPlayerStatus.y = 65;

    $.players[n].playerName = newPlayerName;
    $.players[n].playerScore = newPlayerScore;
    $.players[n].playerScoreType = newPlayerScoreType;
    $.players[n].playerStatus = newPlayerStatus;
    $.players[n].bgPlayerH = bgPlayerH;
    $.players[n].pieces = [];

    $.players[n].addEventListener("click", function (evt) {
      showPlayerPieces(evt.currentTarget.playerIndex);
    });

    $.players[n].addChild(
      bgPlayer,
      bgPlayerH,
      newPlayerName,
      newPlayerScore,
      newPlayerScoreType,
      newPlayerStatus
    );

    updatePlayerScore(n);
    playersContainer.addChild($.players[n]);
  }

  resizeGameLayout();
}

/*!
 *
 * BUILD BOARD - This is the function that runs to build board
 *
 */
function buildBoard() {
  boardDesignContainer.removeAllChildren();
  diceContainer.removeAllChildren();
  gameData.pieces = [];
  gameData.reveals = [];

  var chessIndex = 0;
  var totalColors = [4, 4, 4, 4, 4, 4];

  var _frame = { regX: 90 / 2, regY: 90 / 2, height: 90, width: 90, count: 12 };
  var _animations = {
    animate: { frames: [0, 1, 2, 3, 4, 5], speed: 1 },
  };
  spritesheetData = new createjs.SpriteSheet({
    images: [loader.getResult("dice" + gameData.themeIndex).src],
    frames: _frame,
    animations: _animations,
  });

  itemDice = new createjs.Sprite(spritesheetData, "animate");
  itemDice.framerate = 20;

  itemDiceH = new createjs.Bitmap(
    loader.getResult("diceHighlight" + gameData.themeIndex)
  );
  centerReg(itemDiceH);
  itemDiceH.visible = false;
  diceContainer.addChild(itemDice, itemDiceH);

  itemDice.cursor = "pointer";
  itemDice.addEventListener("click", function (evt) {
    rollDice(true);
  });

  if (gameData.sizeIndex == 0) {
    var bgBoard = new createjs.Bitmap(
      loader.getResult("board" + gameData.themeIndex + "_" + 0)
    );
    centerReg(bgBoard);
    boardDesignContainer.addChild(bgBoard);

    var chessData = {
      total: 8,
      angle: 38,
      degree: 0,
      radius: 100,
    };

    chessData.degree = 360 / chessData.total;
    for (var n = 0; n < chessData.total; n++) {
      $.chess[chessIndex] = new createjs.Bitmap(
        loader.getResult("hole" + gameData.themeIndex)
      );
      centerReg($.chess[chessIndex]);

      $.chess["highlight" + chessIndex] = new createjs.Bitmap(
        loader.getResult("holeHighlight" + gameData.themeIndex)
      );
      centerReg($.chess["highlight" + chessIndex]);
      $.chess["highlight" + chessIndex].visible = false;

      var chessPos = getAnglePosition(0, 0, chessData.radius, chessData.angle);
      $.chess[chessIndex].x = $.chess["highlight" + chessIndex].x = chessPos.x;
      $.chess[chessIndex].y = $.chess["highlight" + chessIndex].y =
        chessPos.y * 0.6;

      gameData.pieces.push($.chess[chessIndex]);
      boardDesignContainer.addChild(
        $.chess[chessIndex],
        $.chess["highlight" + chessIndex]
      );
      chessData.angle += chessData.degree;
      chessIndex++;
    }

    var chessData = {
      total: 16,
      angle: 35,
      degree: 0,
      radius: 190,
    };
    chessData.degree = 360 / chessData.total;
    for (var n = 0; n < chessData.total; n++) {
      $.chess[chessIndex] = new createjs.Bitmap(
        loader.getResult("hole" + gameData.themeIndex)
      );
      centerReg($.chess[chessIndex]);

      $.chess["highlight" + chessIndex] = new createjs.Bitmap(
        loader.getResult("holeHighlight" + gameData.themeIndex)
      );
      centerReg($.chess["highlight" + chessIndex]);
      $.chess["highlight" + chessIndex].visible = false;

      var chessPos = getAnglePosition(0, 0, chessData.radius, chessData.angle);
      $.chess[chessIndex].x = $.chess["highlight" + chessIndex].x = chessPos.x;
      $.chess[chessIndex].y = $.chess["highlight" + chessIndex].y =
        chessPos.y * 0.6;

      gameData.pieces.push($.chess[chessIndex]);
      boardDesignContainer.addChild(
        $.chess[chessIndex],
        $.chess["highlight" + chessIndex]
      );
      chessData.angle += chessData.degree;
      chessIndex++;
    }

    itemDice.x = itemDice.oriX = 0;
    itemDice.y = itemDice.oriY = 250;
  } else {
    totalColors = [6, 6, 7, 7, 7, 7];
    var bgBoard = new createjs.Bitmap(
      loader.getResult("board" + gameData.themeIndex + "_" + 1)
    );
    centerReg(bgBoard);
    boardDesignContainer.addChild(bgBoard);

    var chessData = {
      row: 7,
      column: 7,
      x: 0,
      y: 0,
      sX: -160,
      sY: -120,
      spaceX: 55,
      spaceY: 40,
      ratio: 1,
    };
    chessData.x = chessData.sX;
    chessData.y = chessData.sY;

    for (var r = 0; r < chessData.row; r++) {
      for (var c = 0; c < chessData.column; c++) {
        var skipCon = false;
        if (r > 1 && r < 5) {
          if (c > 1 && c < 5) {
            skipCon = true;
          }
        }

        if (!skipCon) {
          $.chess[chessIndex] = new createjs.Bitmap(
            loader.getResult("hole" + gameData.themeIndex)
          );
          centerReg($.chess[chessIndex]);

          $.chess["highlight" + chessIndex] = new createjs.Bitmap(
            loader.getResult("holeHighlight" + gameData.themeIndex)
          );
          centerReg($.chess["highlight" + chessIndex]);
          $.chess["highlight" + chessIndex].visible = false;

          $.chess[chessIndex].x = $.chess["highlight" + chessIndex].x =
            chessData.x;
          $.chess[chessIndex].y = $.chess["highlight" + chessIndex].y =
            chessData.y;

          gameData.pieces.push($.chess[chessIndex]);
          boardDesignContainer.addChild(
            $.chess[chessIndex],
            $.chess["highlight" + chessIndex]
          );
          chessIndex++;
        }
        chessData.x += chessData.spaceX * chessData.ratio;
      }

      chessData.ratio += 0.045;
      chessData.x = chessData.sX * chessData.ratio;
      chessData.y += chessData.spaceY;
    }

    itemDice.x = itemDice.oriX = 0;
    itemDice.y = itemDice.oriY = 250;
  }

  gameData.pieceColors = [];
  for (
    var n = 0;
    n < themesSettings[gameData.themeIndex].pieceTop.length;
    n++
  ) {
    for (var c = 0; c < totalColors[n]; c++) {
      gameData.pieceColors.push(n);
    }
  }
  shuffle(gameData.pieceColors);
}

/*!
 *
 * SETUP CHESS - This is the function that runs to setup chess
 *
 */
function setupChess() {
  gameData.ready = true;
  preparePlayers();

  boardIconContainer.removeAllChildren();

  for (var n = 0; n < gameData.pieces.length; n++) {
    var newMask = new createjs.Shape();
    newMask.x = $.chess[n].x;
    newMask.y = $.chess[n].y;
    newMask.graphics
      .beginFill("red")
      .mt(-19, -200)
      .lt(19, -200)
      .lt(19, 0)
      .qt(0, 18, -19, 0);

    var pieceIndex = gameData.pieceColors[n];
    var pieceTop = new createjs.Bitmap(
      loader.getResult("pieceTop" + gameData.themeIndex + "_" + pieceIndex)
    );
    pieceTop.regX =
      themesSettings[gameData.themeIndex].pieceTop[pieceIndex].regX;
    pieceTop.regY =
      themesSettings[gameData.themeIndex].pieceTop[pieceIndex].regY;
    pieceTop.x = pieceTop.oriX = $.chess[n].x;
    pieceTop.y = pieceTop.oriY =
      $.chess[n].y -
      themesSettings[gameData.themeIndex].pieceTop[pieceIndex].height;
    pieceTop.mask = newMask;
    pieceTop.chessIndex = n;
    pieceTop.pieceIndex = pieceIndex;
    boardIconContainer.addChild(pieceTop);

    var pieceBottom = new createjs.Bitmap(
      loader.getResult("pieceBottom" + gameData.themeIndex + "_" + pieceIndex)
    );
    pieceBottom.regX =
      themesSettings[gameData.themeIndex].pieceBottom[pieceIndex].regX;
    pieceBottom.regY =
      themesSettings[gameData.themeIndex].pieceBottom[pieceIndex].regY;
    pieceBottom.x = pieceBottom.oriX = $.chess[n].x;
    pieceBottom.y = pieceBottom.oriY =
      $.chess[n].y -
      themesSettings[gameData.themeIndex].pieceBottom[pieceIndex].height;
    pieceBottom.mask = newMask;
    pieceBottom.visible = false;
    boardIconContainer.addChild(pieceBottom);

    var pieceTopH = pieceTop.clone();
    var pieceBottomH = pieceBottom.clone();
    setColorFilter(pieceTopH, 255, 255, 255);
    setColorFilter(pieceBottomH, 255, 255, 255);
    pieceBottomH.visible = pieceTopH.visible = false;
    pieceBottomH.alpha = 0.3;
    boardIconContainer.addChild(pieceBottomH, pieceTopH);

    pieceTop.cursor = "pointer";
    pieceTop.addEventListener("click", function (evt) {
      if (!gameData.piecesCon) {
        return;
      }

      showPiece(evt.target.chessIndex, evt.target.pieceIndex);
      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        postSocketUpdate(
          "showpiece",
          {
            chessIndex: evt.target.chessIndex,
            pieceIndex: evt.target.pieceIndex,
          },
          true
        );
      }
    });

    $.chess[n].maskShape = newMask;
    $.chess[n].pieceTop = pieceTop;
    $.chess[n].pieceBottom = pieceBottom;
    $.chess[n].pieceTarget = null;
    $.chess[n].animating = false;
    $.chess[n].pieceTopH = pieceTopH;
    $.chess[n].pieceBottomH = pieceBottomH;
    boardIconContainer.addChild($.chess["mask" + n]);
  }

  boardIconContainer.sortChildren(sortFunction);
  if (gameSettings.showColorAnimation) {
    animateChess();
  } else {
    startBoard();
  }
}

function setColorFilter(obj, r, g, b) {
  obj.filters = [new createjs.ColorFilter(0, 0, 0, 1, r, g, b, 0)];
  var cacheW = 100;
  var cacheH = 300;
  obj.cache(-(cacheW / 2), -(cacheH / 2), cacheW, cacheH);
}

function animateChess() {
  gameData.animateCount = 0;

  var delayNum = 0;
  for (var n = 0; n < gameData.pieces.length; n++) {
    var chessIndex = n;

    $.chess[chessIndex].pieceTop.mask = null;
    $.chess[chessIndex].pieceBottom.mask = null;

    $.chess[chessIndex].pieceTop.visible = false;
    $.chess[chessIndex].pieceBottom.visible = false;
    $.chess[chessIndex].pieceTarget = $.chess[chessIndex].pieceBottom;

    $.chess[chessIndex].pieceTarget.visible = true;
    $.chess[chessIndex].pieceTarget.rotation = randomIntFromInterval(-180, 180);
    $.chess[chessIndex].pieceTarget.x =
      $.chess[chessIndex].pieceTarget.x + randomIntFromInterval(-50, 50);
    $.chess[chessIndex].pieceTarget.y =
      $.chess[chessIndex].pieceTarget.y + randomIntFromInterval(50, 100);

    delayNum = randomIntFromInterval(3, 6) * 0.1;
    TweenMax.to(
      $.chess[chessIndex].pieceTarget,
      gameSettings.showColorPickSpeed,
      {
        delay: delayNum,
        rotation: 0,
        x: $.chess[chessIndex].x,
        y: $.chess[chessIndex].y - 120,
        ease: "Expo.easeOut",
        onStart: function () {
          var randomPick = randomIntFromInterval(1, 3);
          playSound("soundPick" + randomPick);
        },
        onComplete: animateChessComplete,
        onCompleteParams: [chessIndex],
      }
    );
  }
}

function animateChessComplete(n) {
  var rotateNum = randomBoolean() == true ? 180 : -180;
  var delayNum = gameSettings.showColorTime + randomIntFromInterval(0, 3) * 0.1;
  TweenMax.to($.chess[n].pieceTarget, gameSettings.showColorDownSpeed, {
    delay: delayNum,
    rotation: rotateNum,
    y: $.chess[n].pieceTarget.oriY,
    onStart: function () {
      $.chess[n].pieceTarget.scaleX = -1;
    },
    onComplete: function () {
      gameData.animateCount++;
      $.chess[n].pieceTop.visible = false;
      $.chess[n].pieceBottom.visible = false;

      $.chess[n].pieceTop.x = $.chess[n].pieceBottom.x;
      $.chess[n].pieceTop.y = $.chess[n].pieceBottom.y - 100;

      $.chess[n].pieceBottom.x = $.chess[n].pieceBottom.oriX;
      $.chess[n].pieceBottom.y = $.chess[n].pieceBottom.oriY;
      $.chess[n].pieceBottom.scaleX = 1;
      $.chess[n].pieceBottom.rotation = 0;

      $.chess[n].pieceTarget = $.chess[n].pieceTop;
      $.chess[n].pieceTarget.visible = true;
      $.chess[n].pieceTarget.mask = $.chess[n].maskShape;

      var delayNum = randomIntFromInterval(0, 0.3) * 0.1;
      TweenMax.to($.chess[n].pieceTarget, gameSettings.showColorDownSpeed, {
        delay: delayNum,
        x: $.chess[n].pieceTarget.oriX,
        y: $.chess[n].pieceTarget.oriY,
        onStart: function () {
          playSound("soundPlace");
        },
      });

      if (gameData.animateCount == gameData.pieces.length) {
        TweenMax.to(boardContainer, 1, { onComplete: startBoard });
      }
    },
  });
}

var sortFunction = function (obj1, obj2, options) {
  if (obj1.y > obj2.y) {
    return 1;
  }
  if (obj1.y < obj2.y) {
    return -1;
  }
  return 0;
};

/*!
 *
 * SHOW PIECE - This is the function that runs to show piece
 *
 */
function showPiece(chessIndex, pieceIndex) {
  var randomPick = randomIntFromInterval(1, 3);
  playSound("soundPick" + randomPick);

  gameData.piecesCon = false;
  for (var n = 0; n < gameData.pieces.length; n++) {
    $.chess["highlight" + n].visible = false;
    $.chess[n].pieceTopH.visible = false;
  }

  $.chess[chessIndex].pieceTarget = $.chess[chessIndex].pieceTop;
  var oriY = $.chess[chessIndex].pieceTarget.y;
  TweenMax.to($.chess[chessIndex].pieceTarget, gameSettings.pickSpeed, {
    y: oriY - 80,
    onComplete: function () {
      TweenMax.to($.chess[chessIndex].pieceTarget, gameSettings.pickDelay, {
        onComplete: function () {
          if (gameData.diceIndex == pieceIndex) {
            //correct
            gameData.rollCorrect = true;
            playSound("soundCorrect");
            increasePlayerScore(pieceIndex);
            showCorrectPiece(chessIndex, pieceIndex);
          } else {
            //incorrect
            //playSound('soundIncorrect');
            gameData.reveals.push(chessIndex);
            gameData.reveals = removeDuplicates(gameData.reveals);

            playSound("soundPlace");
            TweenMax.to(
              $.chess[chessIndex].pieceTarget,
              gameSettings.backDownSpeed,
              {
                y: oriY,
                onComplete: function () {
                  //end turn
                  showPieceComplete(false);
                },
              }
            );
          }
        },
      });
    },
  });
}

function showCorrectPiece(chessIndex, pieceIndex) {
  $.chess[chessIndex].animating = true;
  $.players[gameData.player].pieces.push(chessIndex);
  $.chess[chessIndex].pieceTarget.mask = null;
  var oriY = $.chess[chessIndex].pieceTarget.y;
  var rotateNum = randomBoolean() == true ? 180 : -180;

  playSound("soundPlace");
  TweenMax.to($.chess[chessIndex].pieceTarget, gameSettings.correctSpeed, {
    rotation: rotateNum,
    y: oriY - 50,
    onComplete: function () {
      $.chess[chessIndex].pieceBottom.y = $.chess[chessIndex].pieceTop.y;
      $.chess[chessIndex].pieceTarget.visible = false;
      $.chess[chessIndex].pieceTarget = $.chess[chessIndex].pieceBottom;
      $.chess[chessIndex].pieceTarget.visible = true;
      $.chess[chessIndex].pieceTarget.mask = $.chess[chessIndex].maskShape;
      $.chess[chessIndex].animating = false;

      TweenMax.to($.chess[chessIndex].pieceTarget, gameSettings.correctSpeed, {
        y: $.chess[chessIndex].pieceTarget.oriY,
        onComplete: function () {
          checkBoardWin();
        },
      });
    },
  });
}

function showPieceComplete(check) {
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate("showpiececomplete", {
      index: socketData.gameIndex,
      check: check,
    });
  } else {
    if (check) {
      if (gameSettings.nextPlayer) {
        nextPlayerTurn();
      }
    } else {
      nextPlayerTurn();
    }
    displayPlayerTurn();
  }
}

function showPlayerPieces(player) {
  for (var n = 0; n < gameData.pieces.length; n++) {
    if ($.chess[n].pieceBottom.visible && !$.chess[n].animating) {
      $.chess[n].pieceBottomH.visible = false;
      TweenMax.to($.chess[n].pieceBottom, 0.2, {
        y: $.chess[n].pieceBottom.oriY,
        overwrite: true,
      });
    }
  }

  for (var n = 0; n < $.players[player].pieces.length; n++) {
    var chessIndex = $.players[player].pieces[n];
    if (
      $.chess[chessIndex].pieceBottom.visible &&
      !$.chess[chessIndex].animating
    ) {
      $.chess[chessIndex].pieceBottomH.visible = false;
      TweenMax.to($.chess[chessIndex].pieceBottom, 0.5, {
        y: $.chess[chessIndex].pieceBottom.oriY - 50,
        ease: "Expo.easeOut",
        overwrite: true,
        onComplete: showPlayerPiecesComplete,
        onCompleteParams: [chessIndex],
      });
      TweenMax.to($.chess[chessIndex].pieceBottomH, 0.5, {
        alpha: 0.3,
        y: $.chess[chessIndex].pieceBottom.oriY - 50,
        ease: "Expo.easeOut",
        overwrite: true,
      });
    }
  }
}

function showPlayerPiecesComplete(chessIndex) {
  TweenMax.to($.chess[chessIndex].pieceBottom, 0.5, {
    y: $.chess[chessIndex].pieceBottom.oriY,
    ease: "Expo.easeIn",
    overwrite: true,
  });
  TweenMax.to($.chess[chessIndex].pieceBottomH, 0.5, {
    alpha: 0,
    y: $.chess[chessIndex].pieceBottom.oriY,
    ease: "Expo.easeIn",
    overwrite: true,
    onComplete: function () {
      $.chess[chessIndex].pieceBottomH.visible = false;
    },
  });
}

/*!
 *
 * CHECK BOARD WIN - This is the function that runs to check board win
 *
 */
function checkBoardWin() {
  var isOver = false;

  var possibleWin = gameSettings.autoEnd ? true : false;
  var piecesLeft = [];
  var colorsCounts = [0, 0, 0, 0, 0, 0];
  for (var n = 0; n < gameData.pieces.length; n++) {
    if ($.chess[n].pieceTop.visible) {
      piecesLeft.push($.chess[n].pieceTop.pieceIndex);
      colorsCounts[$.chess[n].pieceTop.pieceIndex]++;
    }
  }

  gameData.playerWin = -1;
  if (gameData.settings.winMode == 0) {
    possibleWin = true;
    if (piecesLeft.length == 0) {
      isOver = true;
    }
  } else if (gameData.settings.winMode == 1) {
    var totalColor = 0;
    for (var n = 0; n < playerData.colors[gameData.player].length; n++) {
      var currentColorTotal = playerData.colors[gameData.player][n];
      if (colorsCounts[n] + currentColorTotal >= 4) {
        possibleWin = true;
      }
      if (currentColorTotal > totalColor) {
        totalColor = playerData.colors[gameData.player][n];
      }
    }

    if (totalColor == 4) {
      gameData.playerWin = gameData.player;
      isOver = true;
    } else if (piecesLeft.length == 0) {
      isOver = true;
    } else if (!possibleWin) {
      isOver = true;
    }
  } else if (gameData.settings.winMode == 2) {
    var totalColors = 0;
    for (var n = 0; n < playerData.colors[gameData.player].length; n++) {
      var currentColorTotal = playerData.colors[gameData.player][n];
      if (currentColorTotal == 0) {
        if (colorsCounts[n] > 0) {
          possibleWin = true;
        }
      } else if (currentColorTotal > 0) {
        totalColors++;
      }
    }
    if (totalColors == 6) {
      gameData.playerWin = gameData.player;
      isOver = true;
    } else if (piecesLeft.length == 0) {
      isOver = true;
    } else if (!possibleWin) {
      isOver = true;
    }
  }

  if (isOver) {
    showEndStatus();
    exitSocketGame("timeup", playerData);
    endGame();
  } else {
    showPieceComplete(true);
  }
}

/*!
 *
 * SHOW DICE - This is the function that runs to show dice
 *
 */
function showDice(index) {
  var diceIndex = index == undefined ? randomIntFromInterval(6, 11) : index + 6;
  itemDice.gotoAndStop(diceIndex);
  itemDice.alpha = 1;
}

function rollDice(notAI) {
  gameData.diceIndex = randomIntFromInterval(0, 5);
  if (gameData.rollTime > 5) {
    gameData.rollTime = 0;

    var pieceColors = [];
    for (var n = 0; n < gameData.pieces.length; n++) {
      if ($.chess[n].pieceTop.visible) {
        pieceColors.push($.chess[n].pieceTop.pieceIndex);
      }
    }
    shuffle(pieceColors);
    gameData.diceIndex = pieceColors[0];
  }

  var isPlayer = checkIsPlayer(gameData.player);
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (isPlayer) {
      if (gameData.rollCon) {
        itemDiceH.visible = false;
        gameData.rollCon = false;
        proceedRollDice();
        postSocketUpdate(
          "proceedrolldice",
          { diceIndex: gameData.diceIndex },
          true
        );
      }
    }
  } else {
    var isPlayer = checkIsPlayer(gameData.player);
    if (isPlayer) {
      if (gameData.rollCon) {
        itemDiceH.visible = false;
        gameData.rollCon = false;
        proceedRollDice();
      }
    } else if (!notAI) {
      //ai
      proceedRollDice();
    }
  }
}

function proceedRollDice() {
  if (gameData.rollCorrect) {
    gameData.rollTime = 0;
  } else {
    gameData.rollTime++;
  }

  playSound("soundDice");
  itemDice.gotoAndPlay("animate");

  var rollPos = [];
  var pos = {
    x: itemDice.oriX,
    y: itemDice.oriY,
    startX: itemDice.oriX,
    startY: itemDice.oriY,
    radiusX: 0,
    radiusY: 0,
  };
  var radiusX = 20;
  var radiusY = 20 / 1.5;
  var radiusW = 600;
  var radiusH = 100;

  for (var l = 0; l < 2; l++) {
    for (var p = 0; p < 4; p++) {
      pos.radiusX = radiusX * (l + 1);
      pos.radiusY = radiusY * (l + 1);

      if (pos.radiusX >= radiusW) {
        pos.radiusX = radiusW;
      }

      if (pos.radiusY >= radiusH) {
        pos.radiusY = radiusH;
      }

      if (p == 0) {
        pos.x = pos.startX - pos.radiusX;
        pos.y = pos.startY;
      } else if (p == 1) {
        pos.x = pos.startX;
        pos.y = pos.startY - pos.radiusY;
      } else if (p == 2) {
        pos.x = pos.startX + pos.radiusX;
        pos.y = pos.startY;
      } else if (p == 3) {
        pos.x = pos.startX;
        pos.y = pos.startY + pos.radiusY;
      }

      rollPos.push({ x: pos.x, y: pos.y });
    }
  }

  var finalX = itemDice.oriX + randomIntFromInterval(-100, 100);
  var finalY = itemDice.oriY + randomIntFromInterval(-50, 50);
  shuffle(rollPos);
  rollPos.push({ x: finalX, y: finalY });
  TweenMax.to(itemDice, 1, {
    bezier: { type: "thru", values: rollPos, curviness: 2, autoRotate: false },
    ease: Linear.easeNone,
    overwrite: true,
    onComplete: rollDiceComplete,
  });
}

function rollDiceComplete() {
  showDice(gameData.diceIndex);

  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate("rolldicecomplete", { index: socketData.gameIndex });
  } else {
    rollDiceNext();
  }
}

function rollDiceNext() {
  var isPlayer = checkIsPlayer(gameData.player);
  if (isPlayer) {
    gameData.rollCon = false;
    gameData.piecesCon = true;
    showInstruction(2);
  } else {
    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online
    ) {
      postSocketUpdate("rolldicecomplete", { index: socketData.gameIndex });
    } else {
      //ai
      TweenMax.to(boardContainer, gameSettings.aiThinkSpeed, {
        onComplete: function () {
          aiMove();
        },
      });
    }
  }
}

/*!
 *
 * NEXT PLAYER - This is the function that runs to next player
 *
 */
function aiMove() {
  var selectChessIndex = -1;
  if (gameData.reveals.length > 0) {
    for (var n = 0; n < gameData.reveals.length; n++) {
      var chessIndex = gameData.reveals[n];
      if (
        $.chess[chessIndex].pieceTop.visible &&
        $.chess[chessIndex].pieceTop.pieceIndex == gameData.diceIndex
      ) {
        selectChessIndex = chessIndex;
        gameData.reveals.splice(n, 1);
        n = gameData.reveals.length;
      }
    }
  }

  if (selectChessIndex == -1) {
    var randomPieces = [];
    for (var n = 0; n < gameData.pieces.length; n++) {
      if ($.chess[n].pieceTop.visible && gameData.reveals.indexOf(n) == -1) {
        randomPieces.push(n);
      }
    }
    if (randomPieces.length == 0) {
      for (var n = 0; n < gameData.pieces.length; n++) {
        if ($.chess[n].pieceTop.visible) {
          randomPieces.push(n);
        }
      }
    }
    shuffle(randomPieces);
    selectChessIndex = randomPieces[0];
  }

  showPiece(selectChessIndex, $.chess[selectChessIndex].pieceTop.pieceIndex);
}

/*!
 *
 * NEXT PLAYER - This is the function that runs to next player
 *
 */
function nextPlayerTurn() {
  gameData.player++;
  gameData.player =
    gameData.player > gameData.players - 1 ? 0 : gameData.player;
}

/*!
 *
 * DISPLAY PLAYER TURN - This is the function that runs to display player turn
 *
 */
function checkIsPlayer(player) {
  var isPlayer = false;
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (player == socketData.gameIndex) {
      isPlayer = true;
    }
  } else {
    if (gameData.ai) {
      if (player == 0) isPlayer = true;
    } else {
      isPlayer = true;
    }
  }
  return isPlayer;
}

function displayPlayerTurn() {
  var isPlayer = checkIsPlayer(gameData.player);

  for (var n = 0; n < gameData.players; n++) {
    $.players[n].playerStatus.text = "";
    $.players[n].bgPlayerH.visible = false;
    TweenMax.killTweensOf($.players[n].bgPlayerH);
  }

  $.players[gameData.player].bgPlayerH.visible = true;
  animateBlink($.players[gameData.player].bgPlayerH);

  if (isPlayer) {
    $.players[gameData.player].playerStatus.text = textDisplay.userTurn;
  } else {
    $.players[gameData.player].playerStatus.text = textDisplay.playerTurn;
  }

  if (gameData.lastPlayer != gameData.player) {
    playSound("soundTurn");
    aniamtePlayerFocus($.players[gameData.player]);
  }

  gameData.lastPlayer = gameData.player;
  if (gameData.ai && gameData.player != 0) {
    TweenMax.to(boardContainer, 0.5, {
      onComplete: function () {
        rollDice(false);
      },
    });
  } else {
    if (isPlayer) {
      gameData.rollCon = true;
      itemDiceH.visible = true;
      if (gameSettings.autoRollDice) {
        rollDice(true);
      }
    }
  }
}

function animateBlink(obj) {
  obj.alpha = 0.5;
  var tweenSpeed = 0.2;
  TweenMax.to(obj, tweenSpeed, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {
      TweenMax.to(obj, tweenSpeed, {
        alpha: 0.5,
        overwrite: true,
        onComplete: animateBlink,
        onCompleteParams: [obj],
      });
    },
  });
}

function aniamtePlayerFocus(obj) {
  TweenMax.to(obj, 0.2, {
    scaleX: 1.3,
    scaleY: 1.3,
    ease: Sine.easeIn,
    overwrite: true,
    onComplete: function () {
      TweenMax.to(obj, 0.2, {
        scaleX: 1,
        scaleY: 1,
        ease: Sine.easeOut,
        overwrite: true,
      });
    },
  });
}

function getDuration(distance, pixelsPerSecond) {
  var duration = distance / pixelsPerSecond;
  return duration;
}

/*!
 *
 * INCREASE PLAYER SCORE - This is the function that runs to increase player score
 *
 */
function increasePlayerScore(pieceIndex) {
  playerData.scores[gameData.player]++;
  playerData.colors[gameData.player][pieceIndex]++;

  updatePlayerScore(gameData.player);
}

function updatePlayerScore(player) {
  if (gameData.settings.winMode == 0) {
    $.players[player].playerScore.text = playerData.scores[player];
    $.players[player].playerScoreType.text =
      textDisplay.scoreType[gameData.settings.winMode];
  } else if (gameData.settings.winMode == 1) {
    $.players[player].playerScore.text = "x" + playerData.scores[player];
    if (playerData.scores[player] == 0) {
      $.players[player].playerScoreType.text =
        textDisplay.scoreType[gameData.settings.winMode];
    } else {
      var totalColor = 0;
      var currentColor = -1;
      for (var n = 0; n < playerData.colors[player].length; n++) {
        if (playerData.colors[player][n] > totalColor) {
          totalColor = playerData.colors[player][n];
          currentColor = n;
        }
      }

      $.players[player].playerScore.text = "x" + totalColor;
      $.players[player].playerScoreType.text =
        themesSettings[gameData.themeIndex].colors[currentColor];
    }
  } else if (gameData.settings.winMode == 2) {
    $.players[player].playerScore.text = "x" + playerData.scores[player];
    if (playerData.scores[player] == 0) {
      $.players[player].playerScoreType.text =
        textDisplay.scoreType[gameData.settings.winMode];
    } else {
      var totalColors = 0;
      for (var n = 0; n < playerData.colors[player].length; n++) {
        if (playerData.colors[player][n] > 0) {
          totalColors++;
        }
      }

      $.players[player].playerScore.text = "x" + totalColors;
    }
  }
}

/*!
 *
 * SHOW GAME STATUS - This is the function that runs to update game status
 *
 */

function showInstruction(type) {
  if (gameData.instructCount >= 2) {
    return;
  }

  var isPlayer = checkIsPlayer(gameData.player);
  if (!isPlayer) {
    return;
  }

  gameData.instructCount++;

  itemInstruct.visible = false;
  instructTxt.visible = false;
  itemInstruct2.visible = false;
  instructTxt2.visible = false;

  var delayNum = 1.5;
  if (type == 1) {
    itemInstruct.visible = true;
    instructTxt.visible = true;
  } else {
    delayNum = 2;
    itemInstruct2.visible = true;
    instructTxt2.visible = true;
  }

  instructionContainer.alpha = 0;
  TweenMax.to(instructionContainer, 0.5, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {
      TweenMax.to(instructionContainer, 0.5, {
        delay: delayNum,
        alpha: 0,
        overwrite: true,
        onComplete: function () {},
      });
    },
  });
}

function showEndStatus() {
  playSound("soundWin");

  var gameDraw = false;
  var topScoreIndex = 0;
  var topScore = 0;
  for (var n = 0; n < gameData.players; n++) {
    if (topScore < playerData.scores[n]) {
      topScore = playerData.scores[n];
      topScoreIndex = n;
    }
  }

  var isPlayer = false;
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (gameData.settings.winMode == 0) {
      if (topScoreIndex == socketData.gameIndex) {
        isPlayer = true;
      }
    } else {
      if (gameData.playerWin == socketData.gameIndex) {
        isPlayer = true;
      }
    }
  } else {
    if (gameData.settings.winMode == 0) {
      if (gameData.ai) {
        if (topScoreIndex == 0) isPlayer = true;
      }
    } else {
      if (gameData.ai) {
        if (gameData.playerWin == 0) isPlayer = true;
      }
    }
  }

  if (gameData.settings.winMode == 0) {
    if (isPlayer) {
      var winText = textDisplay.youWin;
    } else {
      var winText = textDisplay.playerWin.replace(
        "[NAME]",
        $.players[topScoreIndex].playerName.text
      );
    }
  } else {
    if (gameData.playerWin == -1) {
      gameDraw = true;
    } else {
      if (isPlayer) {
        var winText = textDisplay.youWin;
      } else {
        var winText = textDisplay.playerWin.replace(
          "[NAME]",
          $.players[topScoreIndex].playerName.text
        );
      }
    }
  }

  if (gameDraw) {
    statusTxt.text = textDisplay.gameDraw;
    statusWinTxt.text = textDisplay.noPlayerWin;
  } else {
    statusTxt.text = textDisplay.gameOver;
    statusWinTxt.text = winText;
  }

  statusWinRuleTxt.text = textDisplay.winRules[gameData.settings.winMode];
  TweenMax.to(statusContainer, 1, { alpha: 1, overwrite: true });
}

/*!
 *
 * UPDATE GAME - This is the function that runs to loop game update
 *
 */
function updateGame() {
  if (!gameData.paused) {
    if (gameData.rollCon) {
      itemDiceH.alpha = animateData.alpha;
    }

    if (gameData.piecesCon) {
      for (var n = 0; n < gameData.pieces.length; n++) {
        if ($.chess[n].pieceTop.visible) {
          $.chess["highlight" + n].visible = true;
          $.chess["highlight" + n].alpha = animateData.alpha;

          $.chess[n].pieceTopH.visible = true;
          $.chess[n].pieceTopH.alpha = 0; //animateData.alpha - .8;
        }
      }
    }

    itemDiceShadow.x = itemDiceH.x = itemDice.x;
    itemDiceShadow.y = itemDiceH.y = itemDice.y;
  }
}

/*!
 *
 * END GAME - This is the function that runs for game end
 *
 */
function endGame() {
  gameData.paused = true;
  TweenMax.to(gameContainer, 4, {
    overwrite: true,
    onComplete: function () {
      goPage("result");
    },
  });
}

/*!
 *
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 *
 */
function millisecondsToTimeGame(milli) {
  var milliseconds = milli % 1000;
  var seconds = Math.floor((milli / 1000) % 60);
  var minutes = Math.floor((milli / (60 * 1000)) % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

/*!
 *
 * OPTIONS - This is the function that runs to toggle options
 *
 */

function toggleOption() {
  if (optionsContainer.visible) {
    optionsContainer.visible = false;
  } else {
    optionsContainer.visible = true;
  }
}

/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleSoundMute(con) {
  buttonSoundOff.visible = false;
  buttonSoundOn.visible = false;
  toggleSoundInMute(con);
  if (con) {
    buttonSoundOn.visible = true;
  } else {
    buttonSoundOff.visible = true;
  }
}

function toggleMusicMute(con) {
  buttonMusicOff.visible = false;
  buttonMusicOn.visible = false;
  toggleMusicInMute(con);
  if (con) {
    buttonMusicOn.visible = true;
  } else {
    buttonMusicOff.visible = true;
  }
}

function toggleFullScreen() {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action) {
  gtag("event", "click", { event_category: "share", event_label: action });

  var loc = location.href;
  loc = loc.substring(0, loc.lastIndexOf("/") + 1);

  var title = "";
  var text = "";

  title = shareTitle.replace("[SCORE]", playerData.score);
  text = shareMessage.replace("[SCORE]", playerData.score);

  var shareurl = "";

  if (action == "twitter") {
    shareurl = "https://twitter.com/intent/tweet?url=" + loc + "&text=" + text;
  } else if (action == "facebook") {
    shareurl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(
        loc +
          "share.php?desc=" +
          text +
          "&title=" +
          title +
          "&url=" +
          loc +
          "&thumb=" +
          loc +
          "share.jpg&width=590&height=300"
      );
  } else if (action == "google") {
    shareurl = "https://plus.google.com/share?url=" + loc;
  } else if (action == "whatsapp") {
    shareurl =
      "whatsapp://send?text=" +
      encodeURIComponent(text) +
      " - " +
      encodeURIComponent(loc);
  }

  window.open(shareurl);
}
