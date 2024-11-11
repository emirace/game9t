import { Server as SocketIOServer, Socket } from 'socket.io';
import { generateCode, getTimeStamp } from '../utils/games';
import GameSession from '../models/gameSession';

let roomSettings = {
  totalRooms: 8, //total rooms
  findPlayer: {
    timeoutTimer: 25000, //connection timeout timer
    connectTimer: 10000, //connection timer to start (must less than timeoutTimer)
  },
  maxPlayers: [
    {
      game: 'connectfour',
      total: 4,
    },
  ],
};

//text settings
let textDisplay = {
  user: 'Player ',
  room: 'Room ',
  minPlayers: 'Minimum 2 players to start game.',
  joinRoom: 'You have connected to [ROOM].',
  joinRoomPublic: '[USER] has join this room.',
  joinPrivateRoom: 'You have connected to room [ROOM].',
  shareCode: 'Share code [ROOM] to friends to join.',
  roomNotFound: 'Private room not found.',
  roomOccupied: 'This room is playing.',
  roomFull: 'This room is full.',
  disconnected: 'You have disconnected [ROOM].',
  disconnectedPublic: '[USER] has disconnected.',
  exitRoom: '[USER] has exit this room',
  nickNames: [
    'Happy',
    'Dragonfly',
    'Mini Me',
    'Flyby',
    'Ringo',
    'Dorito',
    'Donut',
    'Pickle',
    'Skipper',
    'Amour',
  ],
};

let gameType: string;
let maxPlayers: number;
let rooms: {
  nickNamesIndex: number[];

  name: string;
  users: {
    username: any;
    index: any;
    data: never[];
    active: boolean;
    ready?: boolean;
  }[];
  id: number;
  public: boolean;
  play: boolean;
  matching?: boolean;
  userTurn?: number;
  turn?: number;
}[] = [];
let privateRooms: {
  name: string;
  users: {
    username: any;
    index: any;
    data: never[];
    active: boolean;
    ready?: boolean;
  }[];
  id: number;
  public: boolean;
  play: boolean;
  timer: number;
  matching?: boolean;
  nickNamesIndex: number[];
}[] = [];
let userIndex = 0;
let connectInterval: string | number | NodeJS.Timeout | null | undefined = null;

for (let n = 0; n < roomSettings.totalRooms; n++) {
  rooms.push({
    name: textDisplay.room + (n + 1),
    users: [],
    id: n,
    public: true,
    play: false,
    nickNamesIndex: [],
  });
}

export const games = (io: SocketIOServer, socket: Socket) => {
  socket.on('updateGameType', function (game) {
    gameType = game;

    let maxPlayersIndex = roomSettings.maxPlayers.findIndex(
      (x) => x.game === gameType,
    );
    maxPlayers =
      maxPlayersIndex == -1
        ? 2
        : roomSettings.maxPlayers[maxPlayersIndex].total;
  });

  socket.on('adduser', function (username) {
    let enterName = username == undefined ? false : true;
    let newUser =
      username == undefined ? (socket.request as any).user.username : username;
    socket.data = {
      username: newUser,
      entername: enterName,
      index: userIndex,
      room: '',
      roomIndex: '',
    };
    userIndex++;

    if (newUser != undefined) {
      socket.emit('updateSocketUser', 'success', socket.data);
      socket.emit('updateSocketRooms', 'roomlist', rooms);
    }
  });

  socket.on('joinrandomroom', async function (sessionId) {
    //find room and users
    let roomCode: any = -1;

    console.log(sessionId);
    try {
      const gameSession = await GameSession.findOne({
        _id: sessionId,
        players: (socket.request as any).user._id,
        active: true,
      });

      if (!gameSession) {
        socket.broadcast
          .to(socket.data.room)
          .emit('updateSocketRooms', 'nosession');
        return;
      }
    } catch (error) {
      socket.emit('updateSocketRooms', 'nosession');
      socket
        .to(socket.data.room)
        .emit(
          'updateSocketLog',
          getTimeStamp() +
            textDisplay.disconnectedPublic.replace(
              '[USER]',
              socket.data.username,
            ),
        );
      return;
    }

    for (let n = 0; n < privateRooms.length; n++) {
      if (privateRooms[n].matching && !privateRooms[n].play) {
        roomCode = privateRooms[n].name;
      }
    }

    if (roomCode == -1) {
      //create new room if no room found
      for (let n = 0; n < 10; n++) {
        roomCode = generateCode(4);
        let roomIndex = privateRooms.findIndex((x) => x.name === roomCode);
        if (roomIndex == -1) {
          n = 10;
          privateRooms.push({
            name: roomCode,
            users: [],
            id: rooms.length,
            public: false,
            play: false,
            timer: 0,
            matching: true,
            nickNamesIndex: [],
          });
        }
      }

      let roomIndex = privateRooms.length - 1;
      socket.join(privateRooms[roomIndex].name);
      socket.data.room = privateRooms[roomIndex].name;
      socket.data.public = false;

      privateRooms[roomIndex].users.push({
        username: socket.data.username,
        index: socket.data.index,
        data: [],
        active: false,
      });
      togglePrivateTimer();
    } else {
      //join exist room if available
      let getRoomInfo = findSocketRoom(roomCode);
      let roomIndex = getRoomInfo.roomIndex;
      let targetArray = getRoomInfo.targetArray;

      socket.join(targetArray[roomIndex].name);
      socket.data.room = targetArray[roomIndex].name;
      targetArray[roomIndex].users.push({
        username: socket.data.username,
        index: socket.data.index,
        data: [],
        ready: false,
        active: false,
      });

      if (targetArray[roomIndex].users.length >= maxPlayers) {
        targetArray[roomIndex].matching = false;
        socket.broadcast
          .to(socket.data.room)
          .emit('updateSocketRooms', 'matched');
      }
    }
  });

  socket.on('game', function (status, data, others) {
    updateSocketGame(status, data, others);
  });

  socket.on('exitroom', function () {
    leaveSocketRoom();
  });

  socket.on('disconnect', () => {
    if (socket.data != undefined) {
      if (socket.data.room != '') {
        socket.broadcast
          .to(socket.data.room)
          .emit(
            'updateSocketLog',
            getTimeStamp() +
              textDisplay.disconnectedPublic.replace(
                '[USER]',
                socket.data.username,
              ),
          );
        leaveSocketRoom();
      }
    }
  });

  // Functions

  function findSocketRoom(name: string) {
    let targetArray = rooms;
    let roomIndex = rooms.findIndex((x) => x.name === name);
    socket.data.public = true;

    if (roomIndex == -1) {
      //private
      roomIndex = privateRooms.findIndex((x) => x.name === name);
      if (roomIndex != -1) {
        targetArray = privateRooms;
        socket.data.public = false;
      }
    }

    return { roomIndex: roomIndex, targetArray: targetArray };
  }

  function togglePrivateTimer() {
    let startInterval = false;
    for (let n = 0; n < privateRooms.length; n++) {
      if (privateRooms[n].matching == true && !privateRooms[n].play) {
        startInterval = true;
      }
    }

    if (startInterval) {
      if (connectInterval == null) {
        connectInterval = setInterval(privateTimerFunc, 1000);
      }
    } else {
      if (connectInterval != null) {
        clearInterval(connectInterval);
        connectInterval = null;
      }
    }
  }

  function privateTimerFunc() {
    for (let n = 0; n < privateRooms.length; n++) {
      if (privateRooms[n].matching == true && !privateRooms[n].play) {
        privateRooms[n].timer += 1000;

        if (privateRooms[n].timer >= roomSettings.findPlayer.timeoutTimer) {
          if (privateRooms[n].users.length <= 1) {
            privateRooms[n].matching = false;
            io.sockets
              .in(privateRooms[n].name)
              .emit('updateSocketRooms', 'timeout');
          }
        } else if (
          privateRooms[n].timer >= roomSettings.findPlayer.connectTimer
        ) {
          if (privateRooms[n].users.length >= 2) {
            privateRooms[n].matching = false;
            socket.broadcast
              .to(privateRooms[n].name)
              .emit('updateSocketRooms', 'matched');
          }
        }
      }
    }
  }

  function updateSocketGame(status: string, data: any, others: any) {
    let getRoomInfo = findSocketRoom(socket.data.room);
    let roomIndex = getRoomInfo.roomIndex;
    let targetArray = getRoomInfo.targetArray;

    if (
      targetArray[roomIndex] == undefined ||
      targetArray[roomIndex].name == undefined
    ) {
      return;
    }

    if (status == 'init') {
      if (!checkEnoughPlayer(targetArray[roomIndex].users.length)) {
        return;
      }

      for (let n = 0; n < targetArray[roomIndex].users.length; n++) {
        targetArray[roomIndex].users[n].active = true;
      }

      targetArray[roomIndex].play = true;
      io.sockets.emit('updateSocketRooms', 'roomlist', rooms);
      io.sockets
        .in(targetArray[roomIndex].name)
        .emit('updateSocketGame', status, targetArray[roomIndex].users);
      return;
    }

    if (
      gameType == 'tictactoe' ||
      gameType == 'connectfour' ||
      gameType == 'wordsearch'
    ) {
      if (status == 'start') {
        let randomTurn = Math.floor(
          Math.random() * targetArray[roomIndex].users.length,
        );
        targetArray[roomIndex].userTurn = randomTurn;
        targetArray[roomIndex].turn = randomTurn;
        let postData = {
          turn: randomTurn,
          index: targetArray[roomIndex].users[randomTurn].index,
          username: targetArray[roomIndex].users[randomTurn].username,
        };
        io.sockets
          .in(targetArray[roomIndex].name)
          .emit('updateSocketGame', status, postData, getTimeStamp());
        return;
      } else if (status == 'updatemovecomplete') {
        returnUserTurn(getRoomInfo, true, status);
        return;
      } else if (status == 'updateroundcomplete') {
        targetArray[roomIndex].userTurn =
          targetArray[roomIndex].userTurn == 1 ? 0 : 1;
        targetArray[roomIndex].turn =
          targetArray[roomIndex].userTurn == 1 ? 0 : 1;
        returnUserTurn(getRoomInfo, true, status);
        return;
      }
    }

    if (others) {
      socket.broadcast
        .to(targetArray[roomIndex].name)
        .emit('updateSocketGame', status, data, getTimeStamp());
    } else {
      io.sockets
        .in(targetArray[roomIndex].name)
        .emit('updateSocketGame', status, data, getTimeStamp());
    }
  }

  function checkEnoughPlayer(players: number) {
    if (players == 1) {
      socket.emit('updateSocketLog', getTimeStamp() + textDisplay.minPlayers);
      return false;
    } else {
      return true;
    }
  }

  function returnUserTurn(
    getRoomInfo: { roomIndex: any; targetArray: any },
    con: boolean,
    status?: string,
  ) {
    let roomIndex = getRoomInfo.roomIndex;
    let targetArray = getRoomInfo.targetArray;

    if (targetArray[roomIndex].turn != undefined) {
      let turnIncrease = con;
      for (let n = 0; n < maxPlayers; n++) {
        if (turnIncrease) {
          targetArray[roomIndex].turn++;
          targetArray[roomIndex].turn =
            targetArray[roomIndex].turn >
            targetArray[roomIndex].users.length - 1
              ? 0
              : targetArray[roomIndex].turn;
        }

        if (targetArray[roomIndex].users[targetArray[roomIndex].turn].active) {
          n = maxPlayers;
        } else {
          turnIncrease = true;
        }
      }

      let postData = {
        turn: targetArray[roomIndex].turn,
        index: targetArray[roomIndex].users[targetArray[roomIndex].turn].index,
        username:
          targetArray[roomIndex].users[targetArray[roomIndex].turn].username,
      };
      io.sockets
        .in(targetArray[roomIndex].name)
        .emit('updateSocketGame', status, postData, getTimeStamp());
    }
  }

  function leaveSocketRoom() {
    let getRoomInfo = findSocketRoom(socket.data.room);
    let roomIndex = getRoomInfo.roomIndex;
    let targetArray = getRoomInfo.targetArray;

    if (roomIndex == -1) {
      return;
    }

    socket.leave(targetArray[roomIndex].name);
    socket.emit(
      'updateSocketLog',
      getTimeStamp() +
        textDisplay.disconnected.replace('[ROOM]', targetArray[roomIndex].name),
    );
    socket.data.room = '';

    let userIndex = targetArray[roomIndex].users.findIndex(
      (x) => x.index === Number(socket.data.index),
    );
    if (targetArray[roomIndex].play) {
      targetArray[roomIndex].users[userIndex].active = false;
      returnUserTurn(getRoomInfo, false);
    } else {
      targetArray[roomIndex].users.splice(userIndex, 1);

      if (
        !socket.data.enterName &&
        Array.isArray(targetArray[roomIndex].nickNamesIndex)
      ) {
        let thisNickNameIndex = userIndex;
        targetArray[roomIndex]?.nickNamesIndex.splice(userIndex, 1);
        targetArray[roomIndex]?.nickNamesIndex.push(thisNickNameIndex);
      }
    }

    let notiCon = targetArray[roomIndex].play == true ? true : false;
    socket.broadcast
      .to(targetArray[roomIndex].name)
      .emit('updateGameSocketLog', {
        time: getTimeStamp(),
        message: textDisplay.exitRoom.replace('[USER]', socket.data.username),
        noti: notiCon,
      });
    socket.broadcast
      .to(targetArray[roomIndex].name)
      .emit(
        'updateSocketLog',
        getTimeStamp() +
          textDisplay.exitRoom.replace('[USER]', socket.data.username),
      );
    io.sockets
      .in(targetArray[roomIndex].name)
      .emit('updateSocketRooms', 'namelist', targetArray[roomIndex].users);

    socket.emit('updateSocketRooms', 'exit', socket.data);

    //if is host leaving force everyone leave if playing
    if (userIndex == 0 && targetArray[roomIndex].play) {
      targetArray[roomIndex].users.length = 0;
      io.sockets
        .in(targetArray[roomIndex].name)
        .emit('updateSocketRooms', 'leave');
    }

    //clear room
    for (let n = 0; n < rooms.length; n++) {
      if (rooms[n].users.length == 0) {
        rooms[n].play = false;
      }
    }

    for (let n = 0; n < privateRooms.length; n++) {
      if (privateRooms[n].users.length == 0) {
        privateRooms.splice(n, 1);
      }
    }

    togglePrivateTimer();
    io.sockets.emit('updateSocketRooms', 'roomlist', rooms);
  }
};
