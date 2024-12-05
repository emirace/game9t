////////////////////////////////////////////////////////////
// GAME v2.1
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */

//category
var categorySettings = [
  {
    name: "ANIMAL",
    image: "assets/category_animals.png",
    words: [
      "giraffe",
      "fox",
      "tiger",
      "squirrel",
      "camel",
      "lion",
      "hyena",
      "deer",
      "monkey",
      "elephant",
      "mouse",
      "horse",
      "koala",
      "kangaroo",
      "gorilla",
      "leopard",
      "otter",
      "raccoon",
      "mole",
      "owl",
      "sheep",
      "panda",
      "bison",
      "rabbit",
      "zebra",
      "wolf",
    ],
  },
  {
    name: "COUNTRY",
    image: "assets/category_country.png",
    words: [
      "alhania",
      "argentina",
      "australia",
      "belgium",
      "brazil",
      "canada",
      "chile",
      "china",
      "colombia",
      "denmark",
      "egypt",
      "finland",
      "france",
      "germany",
      "greece",
      "hungary",
      "korea",
      "iceland",
      "india",
      "indonesia",
      "italy",
      "japan",
      "malaysia",
      "mexico",
      "netherlands",
      "norway",
      "pakistan",
      "poland",
      "portugal",
      "serbia",
      "singapore",
      "spain",
      "sweden",
      "thailand",
      "turkey",
      "ukraine",
      "russia",
      "usa",
      "vietnam",
    ],
  },
  {
    name: "FRUIT",
    image: "assets/category_fruits.png",
    words: [
      "orange",
      "apple",
      "avocado",
      "mango",
      "peach",
      "cherry",
      "grape",
      "banana",
      "watermelon",
      "strawberry",
      "guava",
      "kiwi",
      "pear",
      "fig",
      "lemon",
      "papaya",
      "plum",
      "coconut",
      "lychee",
    ],
  },
  {
    name: "FOOD",
    image: "assets/category_foods.png",
    words: [
      "cheese",
      "fish",
      "candy",
      "bread",
      "rice",
      "pasta",
      "meat",
      "pizza",
      "burger",
      "poultry",
      "milk",
      "yogurt",
      "egg",
      "butter",
      "sandwich",
      "chicken",
      "steak",
      "prawn",
      "ham",
      "seafood",
      "bacon",
      "sausage",
      "cream",
      "kebab",
      "tofu",
      "cereal",
      "peanuts",
    ],
  },
  {
    name: "MOVIE",
    image: "assets/category_movie.png",
    words: [
      "your name",
      "narnia",
      "deadpool",
      "avatar",
      "titanic",
      "it",
      "scream",
      "carrie",
      "parasite",
      "jaws",
      "jumanji",
      "rocky",
      "alien",
      "gladiator",
      "twilight",
      "transformers",
      "halloween",
      "seven",
      "juno",
      "inception",
      "watchmen",
      "twins",
      "scarface",
      "psycho",
      "joker",
      "ghostbusters",
      "gremilins",
      "hannibal",
    ],
  },
  {
    name: "MUSIC",
    image: "assets/category_music.png",
    words: [
      "madness",
      "pink",
      "psy",
      "muse",
      "queen",
      "coldplay",
      "lawson",
      "green day",
      "linkin park",
      "wanted",
      "busted",
      "blur",
      "elbow",
      "metalica",
      "blues",
      "chaos",
      "texasss",
      "scorpians",
      "stumble",
      "sideline",
      "scarface",
      "psycho",
      "ghostbusters",
      "gremilins",
      "hannibal",
    ],
  },
  {
    name: "TRANSPORT",
    image: "assets/category_transports.png",
    words: [
      "truck",
      "bus",
      "police",
      "bicycle",
      "ski tow",
      "ambulance",
      "taxi",
      "mixer",
      "helicopter",
      "van",
      "lorry",
      "ship",
      "scooter",
      "excavator",
      "subway",
      "rowboat",
      "tractor",
      "train",
      "bike",
      "jet",
    ],
  },
  {
    name: "VEGETABLE",
    image: "assets/category_vegetables.png",
    words: [
      "spinach",
      "tomato",
      "pumpkin",
      "lettuce",
      "mushrooms",
      "leeks",
      "corn",
      "giner",
      "cucumber",
      "cabbage",
      "carrot",
      "beans",
      "broccoli",
    ],
  },
  {
    name: "ALL CATEGORY",
    image: "assets/category_all.png",
    words: [],
    all: true,
  },
];

//classic settings
var defaultSettings = {
  twoPlayer: false,
  category: true,
  row: 10,
  column: 10,
  words: 15,
};

//custom settings
var customSettings = {
  enable: true,
  twoPlayer: false,
  category: true,
  rowMin: 5,
  rowMax: 15,
  columnMin: 5,
  columnMax: 15,
  wordsMin: 5,
  wordsMax: 25,
};

//game settings
var gameSettings = {
  letters: "abcdefghijklmnopqrstuvwyz",
  orientations: [
    "horizontal",
    "horizontalBack",
    "vertical",
    "verticalUp",
    "diagonal",
    "diagonalUp",
    "diagonalBack",
    "diagonalUpBack",
  ],
  timer: 120000,
  playerTimer: 16000,
  solveButton: true,
};

//puzzle settings
var puzzleSettings = {
  stroke: 30,
  strokeColor: [
    "#FF2626",
    "#FF8000",
    "#00D900",
    "#00D9D9",
    "#5900B2",
    "#0059B2",
    "#B200B2",
  ],
  strokeAlpha: 0.8,
  bgStroke: 10,
  bgStrokeColor: "#001D53",
  bgColor: "#fff",
  bgSpace: 20,
  grid: 45,
  gridStroke: 0,
  gridStrokeColor: "",
  gridColor: "",
  fontSize: 40,
  fontColor: "#000",
  wordFontSize: 20,
  wordFontColor: "#fff",
  wordSpace: 10,
  wordWidth: 540,
  wordSolvedFontColor: "#ccc",
  wordSolvedAlpha: 1,
  wordSolvedStroke: 5,
  wordSolvedStrokeColor: "#B20000",
  wordSolvedStrokePlayersColor: ["#b70f0f", "#129b0e"],
  wordSolvedStrokeAlpha: 1,
  highlightFontSize: 22,
  highlightTextColor: "#fff",
  highlightBgColor: "#17AADD",
  multiplayerStrokeColor: true,
  multiplayerStrokeColors: ["#b70f0f", "#129b0e"],
};

//game text display
var textDisplay = {
  categoryTitle: "Select Category",
  customTitle: "Custom Puzzle",
  customSize: "[COLUMN] x [ROW] size",
  customWin: "[NUMBER] words",
  vs: "VS",
  player1: "Player 1",
  player2: "Player 2",
  playerTurn: "[USER] Turn",
  playerTimer: " sec",
  gameWin: "[NUMBER] Words",
  noWords: "No words to generate puzzle.",
  timeUp: "Time's Up",
  complete: "Complete!",
  over: "Game Over!",
  exitTitle: "Exit Game",
  exitMessage: "Are you sure you want\nto quit game?",
  share: "Share your score:",
  resultTitle: "Game Over",
  resultDesc: "You found [NUMBER] words",
};

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = "Highscore on Word Search is [SCORE]pts"; //social share score title
var shareMessage =
  "[SCORE]pts is mine new highscore on Word Search game! Try it now!"; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = { enable: false };
var playerData = { score: 0, opponentScore: 0 };
var gameData = {
  paused: true,
  moving: false,
  type: "classic",
  strokeCon: false,
  strokeObj: null,
  stroke: [],
  solve: [],
  custom: { row: 0, column: 0, words: 0 },
  settings: {},
  turn: 0,
  player: 0,
  totalPlayers: 1,
  complete: false,
};
var timeData = {
  enable: false,
  startDate: null,
  nowDate: null,
  startPlayerDate: null,
  nowPlayerDate: null,
  timer: 0,
  oldTimer: 0,
};
var tweenData = { score: 0, tweenScore: 0 };
var categoryData = { page: 0, total: 0, thumbs: 4 };

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

  buttonClassic.cursor = "pointer";
  buttonClassic.addEventListener("click", function (evt) {
    playSound("soundButton");
    gameData.type = "classic";
    toggleMainButton("players");
  });

  buttonCustom.cursor = "pointer";
  buttonCustom.addEventListener("click", function (evt) {
    playSound("soundButton");
    gameData.type = "custom";
    toggleMainButton("players");
  });

  buttonOnePlayer.cursor = "pointer";
  buttonOnePlayer.addEventListener("click", function (evt) {
    playSound("soundButton");
    gameData.totalPlayers = 1;
    goPage("category");
  });

  buttonTwoPlayer.cursor = "pointer";
  buttonTwoPlayer.addEventListener("click", function (evt) {
    playSound("soundButton");
    gameData.totalPlayers = 2;
    goPage("category");
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
    buttonPlayerContainer.visible = false;
    buttonLocalContainer.visible = false;
    startPlayerGame();
  });

  buttonStart.cursor = "pointer";
  buttonStart.addEventListener("click", function (evt) {
    playSound("soundButton");
    gameData.type = "custom";
    if (multiplayerSettings.localPlay) {
      toggleMainButton("local");
    } else {
      checkQuickGameMode();
    }
  });

  buttonCategoryL.cursor = "pointer";
  buttonCategoryL.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCategory(false);
  });

  buttonCategoryR.cursor = "pointer";
  buttonCategoryR.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCategory(true);
  });

  for (n = 0; n < categorySettings.length; n++) {
    $.category[n].category = n;
    $.category[n].cursor = "pointer";
    $.category[n].addEventListener("click", function (evt) {
      playSound("soundButton2");

      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        if (socketData.host) {
          gameData.categoryIndex = evt.target.category;
          postSocketUpdate("custom");
        }
      } else {
        gameData.categoryIndex = evt.target.category;
        if (gameData.type == "classic") {
          goPage("game");
        } else {
          goPage("custom");
        }
      }
    });
  }

  buttonRowL.cursor = "pointer";
  buttonRowL.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCustomRow(false);
  });

  buttonRowR.cursor = "pointer";
  buttonRowR.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCustomRow(true);
  });

  buttonColumnL.cursor = "pointer";
  buttonColumnL.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCustomColumn(false);
  });

  buttonColumnR.cursor = "pointer";
  buttonColumnR.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCustomColumn(true);
  });

  buttonWordsL.cursor = "pointer";
  buttonWordsL.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCustomWords(false);
  });

  buttonWordsR.cursor = "pointer";
  buttonWordsR.addEventListener("click", function (evt) {
    playSound("soundButton2");
    toggleCustomWords(true);
  });

  buttonCustomStart.cursor = "pointer";
  buttonCustomStart.addEventListener("click", function (evt) {
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

  buttonSolve.cursor = "pointer";
  buttonSolve.addEventListener("click", function (evt) {
    playSound("soundButton");
    solvePuzzle();
    buttonSolve.visible = false;
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

  gameData.categoryIndex = 0;
  gameData.category = [];
  for (var n = 0; n < categorySettings.length; n++) {
    gameData.category.push({ name: categorySettings[n].name, index: n });
  }

  buildCategory();

  gameData.custom.column = customSettings.columnMin;
  gameData.custom.row = customSettings.rowMin;
  gameData.custom.words = customSettings.wordsMin;
  checkCustomSettings();
  setupStrokeEvents();
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

  buttonStart.visible = false;
  buttonTypeContainer.visible = false;
  buttonPlayerContainer.visible = false;
  buttonLocalContainer.visible = false;

  if (con == "default") {
    buttonTypeContainer.visible = true;
  } else if (con == "start") {
    buttonStart.visible = true;
  } else if (con == "local") {
    buttonLocalContainer.visible = true;
  } else if (con == "players") {
    if (gameData.type == "classic") {
      if (!defaultSettings.twoPlayer) {
        goPage("category");
        return;
      }
    } else {
      if (!customSettings.twoPlayer) {
        goPage("category");
        return;
      }
    }

    buttonPlayerContainer.visible = true;
  }
}

function checkGameType() {
  if (gameData.type == "classic") {
    goPage("game");
  } else {
    goPage("custom");
  }
}

function checkQuickGameMode() {
  socketData.online = true;
  if (!multiplayerSettings.enterName) {
    buttonStart.visible = false;
    buttonTypeContainer.visible = false;
    buttonPlayerContainer.visible = false;
    buttonLocalContainer.visible = false;

    addSocketRandomUser();
  } else {
    goPage("name");
  }
}

/*!
 *
 * SELECT CATEGARY - This is the function that runs to display select category
 *
 */
function buildCategory() {
  categoryData.total = categorySettings.length / categoryData.thumbs;

  if (String(categoryData.total).indexOf(".") > -1) {
    categoryData.total = Math.floor(categoryData.total) + 1;
  }

  categoryData.page = 1;
  selectCategoryPage(categoryData.page);
}

function toggleCategory(con) {
  if (con) {
    categoryData.page++;
    categoryData.page =
      categoryData.page > categoryData.total
        ? categoryData.total
        : categoryData.page;
  } else {
    categoryData.page--;
    categoryData.page = categoryData.page < 0 ? 1 : categoryData.page;
  }

  selectCategoryPage(categoryData.page);
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate("updatecategory", categoryData.page, true);
  }
}

function selectCategoryPage(num) {
  var maxThumbs = categoryData.thumbs;
  var totalPages = categoryData.total;
  categoryData.page = num;

  var startNum = (categoryData.page - 1) * maxThumbs;
  var endNum = startNum + (maxThumbs - 1);

  for (n = 0; n < categorySettings.length; n++) {
    if (n >= startNum && n <= endNum) {
      $.category[n].visible = true;
      $.category[n].x = canvasW / 2;
      $.category[n].y = canvasH / 2;
      $.category["text" + n].visible = true;
    } else {
      $.category[n].visible = false;
      $.category["text" + n].visible = false;
    }
  }

  var showCategoryButton = true;
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (!socketData.host) {
      showCategoryButton = false;
    }
  }

  if (showCategoryButton) {
    if (categoryData.page == 1) {
      buttonCategoryL.visible = false;
    } else {
      buttonCategoryL.visible = true;
    }

    if (categoryData.page == totalPages || totalPages == 1) {
      buttonCategoryR.visible = false;
    } else {
      buttonCategoryR.visible = true;
    }
  }

  resizeCategory();
}

function resizeCategory() {
  categoryTitleTxt.x = canvasW / 2;
  categoryTitleTxt.y = (canvasH / 100) * 25;

  buttonCategoryL.x = canvasW / 2 - 350;
  buttonCategoryL.y = (canvasH / 100) * 75;

  buttonCategoryR.x = canvasW / 2 + 350;
  buttonCategoryR.y = (canvasH / 100) * 75;

  var posIndex = 0;
  var pos = [
    { x: canvasW / 2 - 300, y: canvasH / 2 - 20 },
    { x: canvasW / 2 - 100, y: canvasH / 2 - 20 },
    { x: canvasW / 2 + 100, y: canvasH / 2 - 20 },
    { x: canvasW / 2 + 300, y: canvasH / 2 - 20 },
  ];

  if (!viewport.isLandscape) {
    pos = [
      { x: canvasW / 2 - 100, y: canvasH / 2 - 140 },
      { x: canvasW / 2 + 100, y: canvasH / 2 - 140 },
      { x: canvasW / 2 - 100, y: canvasH / 2 + 140 },
      { x: canvasW / 2 + 100, y: canvasH / 2 + 140 },
    ];

    categoryTitleTxt.x = canvasW / 2;
    categoryTitleTxt.y = (canvasH / 100) * 20;

    buttonCategoryL.x = canvasW / 2 - 230;
    buttonCategoryL.y = (canvasH / 100) * 50;

    buttonCategoryR.x = canvasW / 2 + 230;
    buttonCategoryR.y = (canvasH / 100) * 50;
  }

  for (n = 0; n < categorySettings.length; n++) {
    if ($.category[n].visible) {
      $.category[n].x = pos[posIndex].x;
      $.category[n].y = pos[posIndex].y;
      $.category["text" + n].x = pos[posIndex].x;
      $.category["text" + n].y = pos[posIndex].y + 140;
      posIndex++;
    }
  }
}

/*!
 *
 * SELECT CUSTOM - This is the function that runs to display custom puzzle
 *
 */
function toggleCustomRow(con) {
  if (con) {
    gameData.custom.row++;
    gameData.custom.row =
      gameData.custom.row > customSettings.rowMax
        ? customSettings.rowMax
        : gameData.custom.row;
  } else {
    gameData.custom.row--;
    gameData.custom.row =
      gameData.custom.row < customSettings.rowMin
        ? customSettings.rowMin
        : gameData.custom.row;
  }

  checkCustomSettings();
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate(
      "updatecustom",
      {
        row: gameData.custom.row,
        column: gameData.custom.column,
        words: gameData.custom.words,
      },
      true
    );
  }
}

function toggleCustomColumn(con) {
  if (con) {
    gameData.custom.column++;
    gameData.custom.column =
      gameData.custom.column > customSettings.columnMax
        ? customSettings.columnMax
        : gameData.custom.column;
  } else {
    gameData.custom.column--;
    gameData.custom.column =
      gameData.custom.column < customSettings.columnMin
        ? customSettings.columnMin
        : gameData.custom.column;
  }

  checkCustomSettings();
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate(
      "updatecustom",
      {
        row: gameData.custom.row,
        column: gameData.custom.column,
        words: gameData.custom.words,
      },
      true
    );
  }
}

function toggleCustomWords(con) {
  if (con) {
    gameData.custom.words++;
    gameData.custom.words =
      gameData.custom.words > customSettings.wordsMax
        ? customSettings.wordsMax
        : gameData.custom.words;
  } else {
    gameData.custom.words--;
    gameData.custom.words =
      gameData.custom.words < customSettings.wordsMin
        ? customSettings.wordsMin
        : gameData.custom.words;
  }

  checkCustomSettings();
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate(
      "updatecustom",
      {
        row: gameData.custom.row,
        column: gameData.custom.column,
        words: gameData.custom.words,
      },
      true
    );
  }
}

function checkCustomSettings() {
  var customSize = textDisplay.customSize.replace(
    "[COLUMN]",
    gameData.custom.column
  );
  customSize = customSize.replace("[ROW]", gameData.custom.row);

  sizeTxt.text = customSize;
  wordsTxt.text = textDisplay.customWin.replace(
    "[NUMBER]",
    gameData.custom.words
  );
}

function resizeSocketLog() {
  gameLogsTxt.font = "30px bpreplaybold";
  gameLogsTxt.textAlign = "center";
  gameLogsTxt.color = "#ccc";

  if (curPage == "main") {
    if (viewport.isLandscape) {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 75;
    } else {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 75;
    }
  } else if (curPage == "category" || curPage == "custom") {
    if (viewport.isLandscape) {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 85;
    } else {
      gameLogsTxt.x = canvasW / 2;
      gameLogsTxt.y = (canvasH / 100) * 85;
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
  categoryContainer.visible = false;
  customContainer.visible = false;
  gameContainer.visible = false;
  resultContainer.visible = false;
  playMusicLoop("musicGame");

  var targetContainer = null;
  switch (page) {
    case "main":
      targetContainer = mainContainer;
      if (typeof initSocket == "function" && multiplayerSettings.enable) {
        toggleMainButton("start");
      } else {
        toggleMainButton("default");
      }
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

    case "category":
      targetContainer = categoryContainer;

      buttonCategoryL.visible = false;
      buttonCategoryR.visible = false;

      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        selectCategoryPage(categoryData.page);
      } else {
        if (gameData.type == "classic") {
          if (!defaultSettings.category) {
            checkGameType();
          }
        } else {
          if (!customSettings.category) {
            checkGameType();
          }
        }
        selectCategoryPage(categoryData.page);
      }
      break;

    case "custom":
      targetContainer = customContainer;

      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        buttonCustomStart.visible = false;
        buttonRowL.visible = buttonRowR.visible = false;
        buttonColumnL.visible = buttonColumnR.visible = false;
        buttonWordsL.visible = buttonWordsR.visible = false;

        if (socketData.host) {
          buttonCustomStart.visible = true;
          buttonRowL.visible = buttonRowR.visible = true;
          buttonColumnL.visible = buttonColumnR.visible = true;
          buttonWordsL.visible = buttonWordsR.visible = true;
        }
      }
      break;

    case "game":
      targetContainer = gameContainer;
      stopMusicLoop("musicGame");
      startGame();
      break;

    case "result":
      targetContainer = resultContainer;
      stopGame();
      togglePop(false);

      playSound("soundResult");

      tweenData.tweenScore = 0;
      TweenMax.to(tweenData, 0.5, {
        tweenScore: playerData.score,
        overwrite: true,
        onUpdate: function () {
          resultDescTxt.text = textDisplay.resultDesc.replace(
            "[NUMBER]",
            Math.floor(tweenData.tweenScore)
          );
        },
      });

      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        if (socketData.host) {
          postSocketCloseRoom();
        } else {
          exitSocketRoom();
        }
      }

      saveGame(playerData.score, categorySettings[gameData.categoryIndex].name);
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
  gameData.complete = false;
  gameData.player = randomBoolean() == true ? 1 : 0;
  gameData.strokeCon = false;
  gameData.strokeDrawing = false;
  gameData.stroke = [];
  gameData.solve = [];
  gameData.currentWord = "";

  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    gameData.totalPlayers = 2;
  }

  buildPlayers();
  if (gameData.type == "classic") {
    gameData.settings = {
      row: defaultSettings.row,
      column: defaultSettings.column,
      words: defaultSettings.words,
    };
  } else {
    gameData.settings = {
      row: gameData.custom.row,
      column: gameData.custom.column,
      words: gameData.custom.words,
    };
  }

  timeData.oldTimer = -1;
  timeData.countdown = gameSettings.timer;
  timeData.playerCountdown = gameSettings.playerTimer;
  timeData.startPlayerDate = null;
  timeData.playerTimer = null;
  timerTxt.text = timerRedTxt.text = millisecondsToTimeGame(timeData.countdown);
  timerRedTxt.alpha = 0;

  statusContainer.alpha = 0;

  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (socketData.host) {
      filterCategory();
      buildSearchWord();
      checkPlayerTurn();
      playSound("soundStart");
      toggleGameTimer(true);
    }
  } else {
    filterCategory();
    buildSearchWord();
    checkPlayerTurn();
    playSound("soundStart");
    toggleGameTimer(true);
  }
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
  puzzleTextContainer.removeAllChildren();
  puzzleWordsContainer.removeAllChildren();
  puzzleStrokeContainer.removeAllChildren();

  gameData.paused = true;
  TweenMax.killAll(false, true, false);
}

function saveGame(score, type) {
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
 * BUILD PLAYERS - This is the function that runs to build players
 *
 */
function buildPlayers() {
  for (var n = 0; n < 2; n++) {
    $.players["gameTurn" + n].text = "";
    $.players["gameTimerBg" + n].visible = false;
    $.players["gameTimer" + n].visible = false;

    if (
      typeof initSocket == "function" &&
      multiplayerSettings.enable &&
      socketData.online
    ) {
    } else {
      if (n == 1) {
        if (gameData.ai) {
          $.players["gamePlayer" + 1].text = textDisplay.computer;
        } else {
          $.players["gamePlayer" + 1].text = textDisplay.player2;
        }
      }
    }
  }

  playerData.score = 0;
  playerData.opponentScore = 0;
  displayPlayerScore();

  $.players["gamePlayerContainer" + 0].visible = true;
  $.players["gamePlayerContainer" + 1].visible = true;
  buttonSolve.visible = false;

  if (gameData.totalPlayers == 1) {
    $.players["gamePlayerContainer" + 0].visible = false;
    $.players["gamePlayerContainer" + 1].visible = false;
    if (gameSettings.solveButton) {
      buttonSolve.visible = true;
    }
  }
}

/*!
 *
 * FILTER CATEGORY - This is the function that runs to filter category
 *
 */
function filterCategory() {
  gameData.wordList = [];
  for (var n = 0; n < categorySettings.length; n++) {
    var insertCon = false;
    if (categorySettings[gameData.categoryIndex].all) {
      insertCon = true;
    } else if (gameData.category[gameData.categoryIndex].index == n) {
      insertCon = true;
    }

    if (insertCon) {
      for (var w = 0; w < categorySettings[n].words.length; w++) {
        gameData.wordList.push(categorySettings[n].words[w]);
      }
    }
  }
}

/*!
 *
 * BUILD PUZZLE - This is the function that runs to build puzzle
 *
 */
var orientations = {
  horizontal: function (x, y, i) {
    return { x: x + i, y: y };
  },
  horizontalBack: function (x, y, i) {
    return { x: x - i, y: y };
  },
  vertical: function (x, y, i) {
    return { x: x, y: y + i };
  },
  verticalUp: function (x, y, i) {
    return { x: x, y: y - i };
  },
  diagonal: function (x, y, i) {
    return { x: x + i, y: y + i };
  },
  diagonalBack: function (x, y, i) {
    return { x: x - i, y: y + i };
  },
  diagonalUp: function (x, y, i) {
    return { x: x + i, y: y - i };
  },
  diagonalUpBack: function (x, y, i) {
    return { x: x - i, y: y - i };
  },
};

var checkOrientations = {
  horizontal: function (x, y, h, w, l) {
    return w >= x + l;
  },
  horizontalBack: function (x, y, h, w, l) {
    return x + 1 >= l;
  },
  vertical: function (x, y, h, w, l) {
    return h >= y + l;
  },
  verticalUp: function (x, y, h, w, l) {
    return y + 1 >= l;
  },
  diagonal: function (x, y, h, w, l) {
    return w >= x + l && h >= y + l;
  },
  diagonalBack: function (x, y, h, w, l) {
    return x + 1 >= l && h >= y + l;
  },
  diagonalUp: function (x, y, h, w, l) {
    return w >= x + l && y + 1 >= l;
  },
  diagonalUpBack: function (x, y, h, w, l) {
    return x + 1 >= l && y + 1 >= l;
  },
};

var skipOrientations = {
  horizontal: function (x, y, l) {
    return { x: 0, y: y + 1 };
  },
  horizontalBack: function (x, y, l) {
    return { x: l - 1, y: y };
  },
  vertical: function (x, y, l) {
    return { x: 0, y: y + 100 };
  },
  verticalUp: function (x, y, l) {
    return { x: 0, y: l - 1 };
  },
  diagonal: function (x, y, l) {
    return { x: 0, y: y + 1 };
  },
  diagonalBack: function (x, y, l) {
    return { x: l - 1, y: x >= l - 1 ? y + 1 : y };
  },
  diagonalUp: function (x, y, l) {
    return { x: 0, y: y < l - 1 ? l - 1 : y + 1 };
  },
  diagonalUpBack: function (x, y, l) {
    return { x: l - 1, y: x >= l - 1 ? y + 1 : y };
  },
};

function buildSearchWord() {
  shuffle(gameData.wordList);
  gameData.words = [];
  for (var n = 0; n < gameData.wordList.length; n++) {
    var curWord = gameData.wordList[n];
    if (
      curWord.length <= gameData.settings.row &&
      curWord.length <= gameData.settings.column
    ) {
      gameData.words.push(curWord.toLowerCase());
      if (gameData.words.length >= gameData.settings.words) {
        n = gameData.wordList.length;
      }
    }
  }

  var wordList = gameData.words.slice(0).sort();
  gameData.puzzle = createNewPuzzle(wordList, {
    height: gameData.settings.row,
    width: gameData.settings.column,
    fillBlanks: true,
  });

  drawPuzzle();
  drawPuzzleWords();
  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    postSocketUpdate(
      "updatepuzzle",
      { puzzle: gameData.puzzle, solve: gameData.solve, words: gameData.words },
      true
    );
  }
}

function createNewPuzzle(words, settings) {
  var wordList,
    puzzle,
    attempts = 0,
    opts = settings || {};
  wordList = words.slice(0).sort(function (a, b) {
    return a.length < b.length ? 1 : 0;
  });

  var options = {
    height: opts.height || wordList[0].length,
    width: opts.width || wordList[0].length,
    orientations: opts.orientations || gameSettings.orientations,
    fillBlanks: opts.fillBlanks !== undefined ? opts.fillBlanks : true,
    allowExtraBlanks:
      opts.allowExtraBlanks !== undefined ? opts.allowExtraBlanks : true,
    maxAttempts: opts.maxAttempts || 3,
    preferOverlap: opts.preferOverlap !== undefined ? opts.preferOverlap : true,
  };

  while (!puzzle) {
    while (!puzzle && attempts++ < options.maxAttempts) {
      puzzle = fillPuzzle(wordList, options);
    }
    if (!puzzle) {
      options.height++;
      options.width++;
      attempts = 0;
    }
  }

  if (options.fillBlanks) {
    var lettersToAdd,
      fillingBlanksCount = 0,
      extraLetterGenerator;
    if (typeof options.fillBlanks === "function") {
      extraLetterGenerator = options.fillBlanks;
    } else if (typeof options.fillBlanks === "string") {
      lettersToAdd = options.fillBlanks.toLowerCase().split("");
      extraLetterGenerator = () =>
        lettersToAdd.pop() || (fillingBlanksCount++ && "");
    } else {
      extraLetterGenerator = () =>
        gameSettings.letters[
          Math.floor(Math.random() * gameSettings.letters.length)
        ];
    }
    fillBlanks({ puzzle, extraLetterGenerator: extraLetterGenerator });
  }

  return puzzle;
}

function fillPuzzle(words, options) {
  var puzzle = [],
    i,
    j,
    len;
  for (i = 0; i < options.height; i++) {
    puzzle.push([]);
    for (j = 0; j < options.width; j++) {
      puzzle[i].push("");
    }
  }

  for (i = 0, len = words.length; i < len; i++) {
    if (!placeWordInPuzzle(puzzle, options, words[i])) {
      return null;
    }
  }

  return puzzle;
}

function placeWordInPuzzle(puzzle, options, word) {
  var locations = findBestLocations(puzzle, options, word);
  if (locations.length === 0) {
    return false;
  }

  var sel = locations[Math.floor(Math.random() * locations.length)];
  placeWord(puzzle, word, sel.x, sel.y, orientations[sel.orientation]);
  return true;
}

function findBestLocations(puzzle, options, word) {
  var locations = [],
    height = options.height,
    width = options.width,
    wordLength = word.length,
    maxOverlap = 0;

  for (var k = 0; k < options.orientations.length; k++) {
    var orientation = options.orientations[k],
      check = checkOrientations[orientation],
      next = orientations[orientation],
      skipTo = skipOrientations[orientation],
      x = 0,
      y = 0;

    while (y < height) {
      if (check(x, y, height, width, wordLength)) {
        var overlap = calcOverlap(word, puzzle, x, y, next);
        if (overlap >= maxOverlap || (!options.preferOverlap && overlap > -1)) {
          maxOverlap = overlap;
          locations.push({
            x: x,
            y: y,
            orientation: orientation,
            overlap: overlap,
          });
        }
        x++;
        if (x >= width) {
          x = 0;
          y++;
        }
      } else {
        var nextPossible = skipTo(x, y, wordLength);
        x = nextPossible.x;
        y = nextPossible.y;
      }
    }
  }

  return options.preferOverlap
    ? pruneLocations(locations, maxOverlap)
    : locations;
}

function calcOverlap(word, puzzle, x, y, fnGetSquare) {
  var overlap = 0;
  for (var i = 0; i < word.length; i++) {
    var next = fnGetSquare(x, y, i),
      square = puzzle[next.y][next.x];
    if (square === word[i]) {
      overlap++;
    } else if (square !== "") {
      return -1;
    }
  }
  return overlap;
}

function pruneLocations(locations, overlap) {
  var pruned = [];
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].overlap >= overlap) {
      pruned.push(locations[i]);
    }
  }
  return pruned;
}

function placeWord(puzzle, word, x, y, fnGetSquare) {
  var newWord = word.replace(/\s/g, "");
  var startX, startY, endX, endY;
  for (var i = 0; i < newWord.length; i++) {
    var next = fnGetSquare(x, y, i);
    puzzle[next.y][next.x] = newWord[i];
    if (i == 0) {
      startX = next.x;
      startY = next.y;
    } else {
      endX = next.x;
      endY = next.y;
    }
  }

  var existIndex = gameData.solve.findIndex((x) => x.word === word);
  if (existIndex != -1) {
    gameData.solve.splice(existIndex, 1);
  }
  gameData.solve.push({
    word: word,
    newWord: newWord,
    startX: startX,
    startY: startY,
    endX: endX,
    endY: endY,
  });
}

function fillBlanks({ puzzle, extraLetterGenerator }) {
  var extraLettersCount = 0;
  for (var i = 0; i < puzzle.length; i++) {
    var row = puzzle[i];
    for (var j = 0; j < row.length; j++) {
      if (!puzzle[i][j]) {
        puzzle[i][j] = extraLetterGenerator();
        extraLettersCount++;
      }
    }
  }
  return extraLettersCount;
}

/*!
 *
 * DRAW PUZZLE - This is the function that runs to draw puzzle
 *
 */
function drawPuzzle() {
  puzzleDesignContainer.removeAllChildren();
  puzzleTextContainer.removeAllChildren();

  var pos = { x: 0, y: 0, startX: 0, startY: 0 };
  var puzzleW = gameData.puzzle[0].length * puzzleSettings.grid;
  var puzzleH = gameData.puzzle.length * puzzleSettings.grid;
  pos.startX = -((puzzleW - puzzleSettings.grid) / 2);
  pos.startY = -((puzzleH - puzzleSettings.grid) / 2);

  pos.x = pos.startX;
  pos.y = pos.startY;

  puzzleW += puzzleSettings.bgSpace * 2;
  puzzleH += puzzleSettings.bgSpace * 2;

  gameData.settings.puzzleW = puzzleW;
  gameData.settings.puzzleH = puzzleH;

  var puzzleBg = new createjs.Shape();
  puzzleBg.graphics
    .setStrokeStyle(puzzleSettings.bgStroke)
    .beginStroke(puzzleSettings.bgStrokeColor)
    .beginFill(puzzleSettings.bgColor)
    .drawRect(-(puzzleW / 2), -(puzzleH / 2), puzzleW, puzzleH);
  puzzleDesignContainer.addChild(puzzleBg);

  for (var i = 0, height = gameData.puzzle.length; i < height; i++) {
    var row = gameData.puzzle[i];
    for (var j = 0, width = row.length; j < width; j++) {
      $.puzzle[j + "_" + i] = new createjs.Container();
      $.puzzle[j + "_" + i].x = pos.x;
      $.puzzle[j + "_" + i].y = pos.y;
      $.puzzle[j + "_" + i].pos = [j, i];
      $.puzzle[j + "_" + i].text = row[j];
      $.puzzle[j + "_" + i].hitArea = new createjs.Shape(
        new createjs.Graphics()
          .beginFill("#000")
          .drawRect(
            -(puzzleSettings.grid / 2),
            -(puzzleSettings.grid / 2),
            puzzleSettings.grid,
            puzzleSettings.grid
          )
      );

      var puzzleText = new createjs.Text();
      puzzleText.font = puzzleSettings.fontSize + "px bpreplaybold";
      puzzleText.color = puzzleSettings.fontColor;
      puzzleText.textAlign = "center";
      puzzleText.textBaseline = "middle";
      puzzleText.text = row[j];

      var puzzleBg = new createjs.Shape();
      puzzleBg.graphics
        .setStrokeStyle(puzzleSettings.gridStroke)
        .beginStroke(puzzleSettings.gridStrokeColor)
        .beginFill(puzzleSettings.gridColor)
        .drawRect(
          -(puzzleSettings.grid / 2),
          -(puzzleSettings.grid / 2),
          puzzleSettings.grid,
          puzzleSettings.grid
        );
      puzzleBg.hitArea = new createjs.Shape(
        new createjs.Graphics()
          .beginFill("#000")
          .drawRect(
            -(puzzleSettings.grid / 2),
            -(puzzleSettings.grid / 2),
            puzzleSettings.grid,
            puzzleSettings.grid
          )
      );

      pos.x += puzzleSettings.grid;

      $.puzzle[j + "_" + i].addChild(puzzleBg, puzzleText);
      puzzleTextContainer.addChild($.puzzle[j + "_" + i]);
    }

    pos.x = pos.startX;
    pos.y += puzzleSettings.grid;
  }

  resizePuzzle();
}

function resizePuzzle() {
  puzzleContainer.scaleX = puzzleContainer.scaleY = 1;
  var minPuzzleW = 540;
  var minPuzzleH = 400;
  var boardScaleY = 1,
    boardScaleX = 1;
  if (gameData.totalPlayers == 1 && !viewport.isLandscape) {
    minPuzzleH = 480;
  }
  if (gameData.settings.puzzleH > minPuzzleH) {
    boardScaleY = minPuzzleH / gameData.settings.puzzleH;
  }

  if (gameData.settings.puzzleW > minPuzzleW) {
    boardScaleX = minPuzzleW / gameData.settings.puzzleW;
  }
  puzzleContainer.scaleX = puzzleContainer.scaleY =
    boardScaleX < boardScaleY ? boardScaleX : boardScaleY;

  puzzleContainer.x = canvasW / 2;
  puzzleContainer.y = (canvasH / 100) * 48;
  if (gameData.totalPlayers > 1 && !viewport.isLandscape) {
    puzzleContainer.y = (canvasH / 100) * 35;
  }

  puzzleWordsContainer.x = canvasW / 2;
  puzzleWordsContainer.y =
    puzzleContainer.y +
    (gameData.settings.puzzleH * puzzleContainer.scaleY) / 2 +
    25;

  buttonSolve.y = -(gameData.settings.puzzleH / 2);
  highlightContainer.y = gameData.settings.puzzleH / 2 - 5;
}

function drawPuzzleWords() {
  if (gameData.words.length == 0) {
    $.words[0] = new createjs.Text();
    $.words[0].font = puzzleSettings.wordFontSize + "px bpreplaybold";
    $.words[0].color = puzzleSettings.wordFontColor;
    $.words[0].textAlign = "center";
    $.words[0].textBaseline = "middle";
    $.words[0].text = textDisplay.noWords;
    puzzleWordsContainer.addChild($.words[0]);
  } else {
    for (var n = 0; n < gameData.words.length; n++) {
      $.words[n] = new createjs.Text();
      $.words[n].font = puzzleSettings.wordFontSize + "px bpreplaybold";
      $.words[n].color = puzzleSettings.wordFontColor;
      $.words[n].textAlign = "center";
      $.words[n].textBaseline = "middle";
      $.words[n].text = gameData.words[n];
      $.words[n].active = true;
      $.words[n].tween = { x: 0, y: 0 };
      puzzleWordsContainer.addChild($.words[n]);
    }
  }

  checkWordsMeasure();
}

function checkWordsMeasure() {
  var totalW = 0;
  var wordArray = [];
  var posY = 0;
  var adjust = false;

  for (var n = 0; n < gameData.words.length; n++) {
    adjust = false;
    wordArray.push(n);
    if (n < gameData.words.length - 1) {
      totalW += Math.round($.words[n].getMeasuredWidth() / 2);
      totalW += Math.round($.words[n + 1].getMeasuredWidth() / 2);
      totalW += puzzleSettings.wordSpace;
    }

    if (n == gameData.words.length - 1) {
      adjust = true;
    } else if (totalW > puzzleSettings.wordWidth) {
      adjust = true;
    }

    if (adjust) {
      if (n != gameData.words.length - 1) {
        wordArray.splice(wordArray.length - 1, 1);
      }
      adjustWords(wordArray, posY);

      wordArray = [];
      wordArray.push(n);
      posY += Math.round($.words[n].getMeasuredHeight());

      //reset
      totalW = 0;
      if (n < gameData.words.length - 1) {
        totalW += Math.round($.words[n].getMeasuredWidth() / 2);
        totalW += Math.round($.words[n + 1].getMeasuredWidth() / 2);
        totalW += puzzleSettings.wordSpace;
      }
    }
  }
}

function adjustWords(array, posY) {
  var pos = { x: 0, y: posY };
  var totalW = 0;

  for (var n = 0; n < array.length; n++) {
    if (n == 0) {
      pos.x += Math.round($.words[array[n]].getMeasuredWidth() / 2);
    }
    $.words[array[n]].x = pos.x;
    $.words[array[n]].y = pos.y;

    if (n < array.length - 1) {
      pos.x += Math.round($.words[array[n]].getMeasuredWidth() / 2);
      pos.x += Math.round($.words[array[n + 1]].getMeasuredWidth() / 2);
      pos.x += puzzleSettings.wordSpace;
    }

    if (n == array.length - 1) {
      pos.x += Math.round($.words[array[n]].getMeasuredWidth() / 2);
    }
  }

  totalW = pos.x / 2;
  for (var n = 0; n < array.length; n++) {
    $.words[array[n]].x -= totalW;
  }
}

/*!
 *
 * SETUP STROKE EVENTS - This is the function that runs to setup stage string move
 *
 */
function setupStrokeEvents() {
  stage.addEventListener("mousedown", handlerMoveMethod);
  stage.addEventListener("pressmove", handlerMoveMethod);
  stage.addEventListener("pressup", handlerMoveMethod);
}

function handlerMoveMethod(evt) {
  if (gameData.paused) {
    return;
  }

  if (gameData.complete) {
    return;
  }

  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (!socketData.turn) {
      return;
    }
  }

  switch (evt.type) {
    case "mousedown":
      for (var i = 0, height = gameData.puzzle.length; i < height; i++) {
        var row = gameData.puzzle[i];
        for (var j = 0, width = row.length; j < width; j++) {
          var pt = $.puzzle[j + "_" + i].globalToLocal(
            stage.mouseX,
            stage.mouseY
          );
          if ($.puzzle[j + "_" + i].hitTest(pt.x, pt.y)) {
            gameData.strokeCon = true;
            gameData.strokeDrawing = true;
            gameData.strokeObj = $.puzzle[j + "_" + i];
            gameData.strokeColor =
              puzzleSettings.strokeColor[
                Math.floor(Math.random() * puzzleSettings.strokeColor.length)
              ];
            gameData.strokeStart = $.puzzle[j + "_" + i].pos;

            createNewStroke();
            playSound("soundHover");
            if (
              typeof initSocket == "function" &&
              multiplayerSettings.enable &&
              socketData.online
            ) {
              if (socketData.turn) {
                if (puzzleSettings.multiplayerStrokeColor) {
                  gameData.strokeColor =
                    puzzleSettings.multiplayerStrokeColors[gameData.player];
                }
                postSocketUpdate(
                  "startstroke",
                  { strokeColor: gameData.strokeColor, row: j, column: i },
                  true
                );
              }
            }
          }
        }
      }
      break;

    case "pressmove":
      if (gameData.strokeCon) {
        var pt = puzzleContainer.globalToLocal(stage.mouseX, stage.mouseY);
        var strokeIndex = gameData.stroke.length - 1;
        drawStroke(
          strokeIndex,
          gameData.strokeColor,
          gameData.strokeObj.x,
          gameData.strokeObj.y,
          pt.x,
          pt.y
        );
        loopStrokeLetter(pt.x, pt.y);

        if (
          typeof initSocket == "function" &&
          multiplayerSettings.enable &&
          socketData.online
        ) {
          if (socketData.turn) {
            postSocketUpdate(
              "updatestroke",
              {
                strokeIndex: strokeIndex,
                strokeColor: gameData.strokeColor,
                sx: gameData.strokeObj.x,
                sy: gameData.strokeObj.y,
                ex: pt.x,
                ey: pt.y,
              },
              true
            );
          }
        }
      }
      break;

    case "pressup":
      if (gameData.strokeCon) {
        var removeStroke = true;

        for (var i = 0, height = gameData.puzzle.length; i < height; i++) {
          var row = gameData.puzzle[i];
          for (var j = 0, width = row.length; j < width; j++) {
            var pt = $.puzzle[j + "_" + i].globalToLocal(
              stage.mouseX,
              stage.mouseY
            );
            if ($.puzzle[j + "_" + i].hitTest(pt.x, pt.y)) {
              var curWord = "";
              var widthLength =
                $.puzzle[j + "_" + i].pos[1] - gameData.strokeObj.pos[1];
              var heightLength =
                $.puzzle[j + "_" + i].pos[0] - gameData.strokeObj.pos[0];
              var totalLength =
                Math.abs(widthLength) > Math.abs(heightLength)
                  ? Math.abs(widthLength)
                  : Math.abs(heightLength);

              var hIndex = gameData.strokeObj.pos[0];
              var wIndex = gameData.strokeObj.pos[1];
              var hEndIndex = $.puzzle[j + "_" + i].pos[0];
              var wEndIndex = $.puzzle[j + "_" + i].pos[1];

              var orientationHistory = {
                x: "",
                y: "",
                lastX: "",
                lastY: "",
                skip: false,
              };
              if (Math.abs(heightLength) != 0 && Math.abs(widthLength) != 0) {
                if (Math.abs(heightLength) != Math.abs(widthLength)) {
                  orientationHistory.skip = true;
                }
              }

              for (var t = 0; t < totalLength + 1; t++) {
                curWord += $.puzzle[hIndex + "_" + wIndex].text;
                if (hIndex != hEndIndex) {
                  if (heightLength > 0) {
                    hIndex++;
                  } else {
                    hIndex--;
                  }
                }

                if (wIndex != wEndIndex) {
                  if (widthLength > 0) {
                    wIndex++;
                  } else {
                    wIndex--;
                  }
                }
              }

              if (!orientationHistory.skip) {
                for (var n = 0; n < gameData.words.length; n++) {
                  var newWord = gameData.words[n].replace(/\s/g, "");
                  if (newWord === curWord) {
                    if ($.words[n].active) {
                      removeStroke = false;
                      completeStroke(n, j, i);
                      if (
                        typeof initSocket == "function" &&
                        multiplayerSettings.enable &&
                        socketData.online
                      ) {
                        postSocketUpdate(
                          "completestroke",
                          { wordIndex: n, row: j, column: i },
                          true
                        );
                        postSocketUpdate("updateroundcomplete");
                      }
                    }
                  }
                }
              }
            }
          }
        }

        updateCurWord("");
        if (removeStroke) {
          playSound("soundError");
          stopStroke();

          if (
            typeof initSocket == "function" &&
            multiplayerSettings.enable &&
            socketData.online
          ) {
            if (socketData.turn) {
              postSocketUpdate("removestroke", "", true);
            }
          }
        }
        gameData.strokeCon = false;
      }
      break;
  }
}

function loopStrokeLetter(x, y) {
  var strokeEnd = [];
  var totalLength = 0;

  for (var i = 0, height = gameData.puzzle.length; i < height; i++) {
    var row = gameData.puzzle[i];
    for (var j = 0, width = row.length; j < width; j++) {
      var checkDistance = getDistance(
        $.puzzle[j + "_" + i].x,
        $.puzzle[j + "_" + i].y,
        x,
        y
      );
      if (checkDistance < puzzleSettings.grid / 2) {
        var widthLength =
          $.puzzle[j + "_" + i].pos[1] - gameData.strokeStart[1];
        var heightLength =
          $.puzzle[j + "_" + i].pos[0] - gameData.strokeStart[0];
        var totalLength =
          Math.abs(widthLength) > Math.abs(heightLength)
            ? Math.abs(widthLength)
            : Math.abs(heightLength);

        if (gameData.strokeStart[0] == $.puzzle[j + "_" + i].pos[0]) {
          strokeEnd = $.puzzle[j + "_" + i].pos;
        } else if (gameData.strokeStart[1] == $.puzzle[j + "_" + i].pos[1]) {
          strokeEnd = $.puzzle[j + "_" + i].pos;
        } else {
          if (Math.abs(widthLength) == Math.abs(heightLength)) {
            strokeEnd = $.puzzle[j + "_" + i].pos;
          }
        }
      }
    }
  }

  if (strokeEnd.length > 0) {
    var curWord = "";
    var distanceC = strokeEnd[0] - gameData.strokeStart[0];
    var distanceR = strokeEnd[1] - gameData.strokeStart[1];

    var curC = gameData.strokeStart[0];
    var curR = gameData.strokeStart[1];

    for (var n = 0; n <= totalLength; n++) {
      curWord += $.puzzle[curC + "_" + curR].text;

      if (distanceC != 0) {
        if (distanceC > 0) {
          curC++;
        } else if (distanceC < 0) {
          curC--;
        }
      }

      if (distanceR != 0) {
        if (distanceR > 0) {
          curR++;
        } else if (distanceR < 0) {
          curR--;
        }
      }
    }

    if (gameData.currentWord != curWord) {
      gameData.currentWord = curWord;
      updateCurWord(curWord);
    }
  }
}

function updateCurWord(curWord) {
  highlightTxt.text = curWord;

  var textW = highlightTxt.getMeasuredWidth() + 30;
  var textH = highlightTxt.getMeasuredHeight() + 10;
  var radius = 10;

  bgHighlight.graphics.clear();
  if (curWord.length > 0)
    bgHighlight.graphics
      .clear()
      .beginFill(puzzleSettings.highlightBgColor)
      .drawRoundRectComplex(
        -(textW / 2),
        -(textH / 2),
        textW,
        textH,
        radius,
        radius,
        radius,
        radius
      );
}

function completeStroke(n, j, i) {
  solveWord(n);
  var strokeIndex = gameData.stroke.length - 1;
  drawStroke(
    strokeIndex,
    gameData.strokeColor,
    gameData.strokeObj.x,
    gameData.strokeObj.y,
    $.puzzle[j + "_" + i].x,
    $.puzzle[j + "_" + i].y
  );
  gameData.strokeDrawing = false;
  updateScore();
  playSound("soundCorrect");

  var totalSolved = 0;
  for (var n = 0; n < gameData.words.length; n++) {
    if (!$.words[n].active) {
      totalSolved++;
    }
  }

  if (totalSolved == gameData.words.length) {
    hidePlayerTurn();
    gameData.complete = true;
    TweenMax.to(puzzleContainer, 1, {
      overwrite: true,
      onComplete: function () {
        showGameStatus("complete");
        exitSocketGame("complete", playerData);
        endGame();
      },
    });
  }
}

function stopStroke() {
  updateCurWord("");

  if (gameData.strokeDrawing) {
    gameData.strokeCon = false;
    gameData.strokeDrawing = false;

    var strokeIndex = gameData.stroke.length - 1;
    puzzleStrokeContainer.removeChild(gameData.stroke[strokeIndex]);
    gameData.stroke.splice(strokeIndex, 1);
  }
}

function createNewStroke() {
  var newStroke = new createjs.Shape();
  newStroke.alpha = puzzleSettings.strokeAlpha;
  puzzleStrokeContainer.addChild(newStroke);
  gameData.stroke.push(newStroke);
}

function drawStroke(strokeIndex, strokeColor, sx, sy, ex, ey) {
  if (gameData.stroke[strokeIndex] == undefined) {
    return;
  }

  gameData.stroke[strokeIndex].graphics.clear();
  gameData.stroke[strokeIndex].graphics
    .beginStroke(strokeColor)
    .setStrokeStyle(puzzleSettings.stroke, "round", "round")
    .mt(sx, sy);
  gameData.stroke[strokeIndex].graphics.lt(ex, ey);
}

/*!
 *
 * SOLVE PUZZLE - This is the function that runs to solve puzzle
 *
 */
function solvePuzzle() {
  toggleGameTimer(false);
  var delay = 0;
  for (var n = 0; n < gameData.solve.length; n++) {
    var curWord = gameData.solve[n].newWord;
    for (var w = 0; w < gameData.words.length; w++) {
      if (curWord == gameData.words[w].replace(/\s/g, "")) {
        if ($.words[w].active) {
          solvePuzzleStroke(w, n, delay);
          delay += 0.2;
        }
      }
    }
  }

  hidePlayerTurn();
  TweenMax.to(puzzleContainer, 1, {
    delay: delay,
    overwrite: true,
    onComplete: function () {
      showGameStatus("over");
      exitSocketGame("solve", playerData);
      endGame();
    },
  });
}

function solvePuzzleStroke(w, n, delay) {
  TweenMax.to($.words[w], 0, {
    delay: delay,
    overwrite: true,
    onComplete: function () {
      solveWord(w);
      createNewStroke();
      var strokeIndex = gameData.stroke.length - 1;
      var strokeColor =
        puzzleSettings.strokeColor[
          Math.floor(Math.random() * puzzleSettings.strokeColor.length)
        ];

      var newTween = {
        x: $.puzzle[gameData.solve[n].startX + "_" + gameData.solve[n].startY]
          .x,
        y: $.puzzle[gameData.solve[n].startX + "_" + gameData.solve[n].startY]
          .y,
      };
      var pos = {
        ex: $.puzzle[gameData.solve[n].endX + "_" + gameData.solve[n].endY].x,
        ey: $.puzzle[gameData.solve[n].endX + "_" + gameData.solve[n].endY].y,
      };
      TweenMax.to(newTween, 0.5, {
        x: pos.ex,
        y: pos.ey,
        overwrite: true,
        onUpdate: function () {
          drawStroke(
            strokeIndex,
            strokeColor,
            $.puzzle[gameData.solve[n].startX + "_" + gameData.solve[n].startY]
              .x,
            $.puzzle[gameData.solve[n].startX + "_" + gameData.solve[n].startY]
              .y,
            newTween.x,
            newTween.y
          );
        },
      });
    },
  });
}

function solveWord(index) {
  $.words[index].alpha = puzzleSettings.wordSolvedAlpha;
  $.words[index].color = puzzleSettings.wordSolvedFontColor;
  $.words[index].active = false;

  var wordWidth = $.words[index].getMeasuredWidth() / 2;
  var pos = {
    sx: $.words[index].x - wordWidth,
    sy: $.words[index].y,
    ex: $.words[index].x + wordWidth,
    ey: $.words[index].y,
  };
  var newStroke = new createjs.Shape();
  puzzleWordsContainer.addChild(newStroke);
  newStroke.alpha = puzzleSettings.wordSolvedAlpha;
  $.words[index].tween.x = pos.sx;
  $.words[index].tween.y = pos.sy;

  var strokeColor = puzzleSettings.wordSolvedStrokeColor;
  if (gameData.totalPlayers > 1) {
    strokeColor = puzzleSettings.wordSolvedStrokePlayersColor[gameData.player];
  }

  playSound("soundStroke");
  TweenMax.to($.words[index].tween, 0.5, {
    x: pos.ex,
    y: pos.ey,
    overwrite: true,
    onUpdate: function () {
      newStroke.graphics.clear();
      newStroke.graphics
        .beginStroke(strokeColor)
        .setStrokeStyle(puzzleSettings.wordSolvedStroke, "round", "round")
        .mt(pos.sx, pos.sy);
      newStroke.graphics.lt($.words[index].tween.x, $.words[index].tween.y);
    },
  });
}

/*!
 *
 * DISPLAY PLAYER TURN - This is the function that runs to display playter turn
 *
 */
function displayPlayerTurn() {
  for (var n = 0; n < 2; n++) {
    var playerTurn = "";
    if (n == gameData.player && !gameData.complete) {
      playerTurn = textDisplay.playerTurn.replace(
        "[USER]",
        $.players["gamePlayer" + n].text
      );
    }

    $.players["gameTurn" + n].text = playerTurn;

    TweenMax.killTweensOf($.players["gameTurn" + n]);
    TweenMax.killTweensOf($.players["gamePlayerContainer" + n]);

    $.players["gamePlayerContainer" + n].scaleX = $.players[
      "gamePlayerContainer" + n
    ].scaleY = 1;
    if (playerTurn != "") {
      $.players["gamePlayerContainer" + n].scaleX = $.players[
        "gamePlayerContainer" + n
      ].scaleY = 0.7;
      TweenMax.to($.players["gamePlayerContainer" + n], 1, {
        scaleX: 1,
        scaleY: 1,
        ease: Elastic.easeOut,
        overwrite: true,
      });
      animatePlayerTurn($.players["gameTurn" + n]);
    }
  }
}

function hidePlayerTurn() {
  for (var n = 0; n < 2; n++) {
    $.players["gameTurn" + n].text = "";
    TweenMax.killTweensOf($.players["gameTurn" + n]);
  }
}

function animatePlayerTurn(obj) {
  obj.alpha = 0.3;
  var tweenSpeed = 0.2;
  TweenMax.to(obj, tweenSpeed, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {
      TweenMax.to(obj, tweenSpeed, {
        alpha: 0.3,
        overwrite: true,
        onComplete: animatePlayerTurn,
        onCompleteParams: [obj],
      });
    },
  });
}

function checkPlayerTurn() {
  if (gameData.totalPlayers == 1) {
    return;
  }

  $.players["gameTimerBg" + 0].visible = false;
  $.players["gameTimer" + 0].visible = false;
  $.players["gameTimerBg" + 1].visible = false;
  $.players["gameTimer" + 1].visible = false;

  $.players["gameTimerBg" + gameData.player].visible = true;
  $.players["gameTimer" + gameData.player].visible = true;

  if (
    typeof initSocket == "function" &&
    multiplayerSettings.enable &&
    socketData.online
  ) {
    if (socketData.host) {
      togglePlayerTimer(true);
    }
  } else {
    togglePlayerTimer(true);
  }

  displayPlayerTurn();
}

function togglePlayer() {
  playSound("soundSwitch");
  gameData.player = gameData.player == 0 ? 1 : 0;
  checkPlayerTurn();
}

/*!
 *
 * ANIMATE TIMER - This is the function that runs to animate countdown
 *
 */
function animateTimer() {
  timerRedTxt.alpha = 0;
  TweenMax.to(timerRedTxt, 0.5, { alpha: 1, overwrite: true });
}

/*!
 *
 * GAME STATUS - This is the function that runs to show game status
 *
 */
function showGameStatus(con) {
  playSound("soundStatus");

  if (con == "timer") {
    statusTxt.text = textDisplay.timeUp;
  } else if (con == "complete") {
    statusTxt.text = textDisplay.complete;
  } else if (con == "over") {
    statusTxt.text = textDisplay.over;
  }

  statusContainer.alpha = 0;
  TweenMax.to(statusContainer, 0.5, { alpha: 1, overwrite: true });
}

function updateScore() {
  if (gameData.totalPlayers == 1) {
    playerData.score++;
  } else {
    if (gameData.player == 0) {
      playerData.score++;
    } else {
      playerData.opponentScore++;
    }
    togglePlayer();
  }

  displayPlayerScore();
}

/*!
 *
 * DISPLAY PLAYER SCORE - This is the function that runs to display player score
 *
 */
function displayPlayerScore() {
  for (var n = 0; n < 2; n++) {
    if (n == 0) {
      $.players["gameWords" + n].text = textDisplay.gameWin.replace(
        "[NUMBER]",
        playerData.score
      );
    } else {
      $.players["gameWords" + n].text = textDisplay.gameWin.replace(
        "[NUMBER]",
        playerData.opponentScore
      );
    }
  }
}

/*!
 *
 * GAME TIMER - This is the function that runs for game timer
 *
 */
function toggleGameTimer(con) {
  if (con) {
    timeData.startDate = new Date();
  } else {
  }
  timeData.enable = con;
}

function togglePlayerTimer(con) {
  if (con) {
    timeData.startPlayerDate = new Date();
  }
}

/*!
 *
 * UPDATE GAME - This is the function that runs to loop game update
 *
 */
function updateGame() {
  if (!gameData.paused) {
    if (timeData.enable) {
      timeData.nowDate = new Date();
      timeData.elapsedTime = Math.floor(
        timeData.nowDate.getTime() - timeData.startDate.getTime()
      );
      timeData.timer = Math.floor(timeData.countdown - timeData.elapsedTime);

      //player timer
      if (gameData.totalPlayers > 1 && timeData.startPlayerDate != null) {
        timeData.nowPlayerDate = new Date();
        timeData.elapsedTime = Math.floor(
          timeData.nowPlayerDate.getTime() - timeData.startPlayerDate.getTime()
        );
        timeData.playerTimer = Math.floor(
          timeData.playerCountdown - timeData.elapsedTime
        );
      }

      updateTimer();
      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        postSocketUpdate(
          "updatetimer",
          { timer: timeData.timer, playerTimer: timeData.playerTimer },
          true
        );
      }
    }
  }
}

function updateTimer() {
  if (timeData.oldTimer == -1) {
    timeData.oldTimer = timeData.timer;
  }

  if (timeData.timer <= 0) {
    //stop
    hidePlayerTurn();
    showGameStatus("timer");
    exitSocketGame("timeup", playerData);
    endGame();
  } else {
    if (timeData.oldTimer - timeData.timer > 1000) {
      if (timeData.timer < 1000) {
        animateTimer();
        playSound("soundCountdownEnd");
      } else if (timeData.timer < 6000) {
        animateTimer();
        playSound("soundCountdown");
      }
      timeData.oldTimer = timeData.timer;
    }

    timerTxt.text = timerRedTxt.text = millisecondsToTimeGame(timeData.timer);
  }

  //player timer
  if (gameData.totalPlayers > 1 && timeData.playerTimer != null) {
    $.players["gameTimer" + 0].text = $.players["gameTimer" + 1].text =
      millisecondsToTimePlayer(timeData.playerTimer);

    if (timeData.playerTimer <= 0) {
      if (
        typeof initSocket == "function" &&
        multiplayerSettings.enable &&
        socketData.online
      ) {
        if (socketData.turn) {
          postSocketUpdate("updatemovecomplete");
        }
      } else {
        togglePlayer();
        stopStroke();
      }
    }
  }
}

/*!
 *
 * END GAME - This is the function that runs for game end
 *
 */
function endGame() {
  gameData.paused = true;

  buttonSolve.visible = false;
  toggleGameTimer(false);
  TweenMax.to(gameContainer, 2, {
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

function millisecondsToTimePlayer(milli) {
  var milliseconds = milli % 1000;
  var seconds = Math.floor((milli / 1000) % 60);
  var minutes = Math.floor((milli / (60 * 1000)) % 60);

  return seconds + textDisplay.playerTimer;
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
