var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 600;

var EDGEBOARD_X = 230;
var EDGEBOARD_Y = 50;
var FPS = 30;
var FPS_TIME = 1000 / FPS;
var DISABLE_SOUND_MOBILE = false;

var SOUNDTRACK_VOLUME_IN_GAME = 0.1;

var PRIMARY_FONT = "ihatcs";
var SCORE_ITEM_NAME = "rockpaperscissor_score";
var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 2;
var STATE_GAME = 3;
var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;

var ROCK = 0;
var PAPER = 1;
var SCISSORS = 2;

var THROW_MATCHES = [                   
                        [SCISSORS,PAPER, ROCK],          
                        [ROCK,SCISSORS, PAPER],         
                        [PAPER,ROCK, SCISSORS]          
                    ];
                    
var WIN_INDEX = 0;
var LOSE_INDEX = 1;


var OCCURENCES;
var RAILS_SPEEDS = [6, -9 , 7];
var DUCK_SCORE = [1, 1, 1, -1];
var DUCK_TIME = [100, 100, 100, -100];
var GAME_TIME = 60; //How Many seconds each game should long?
var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
