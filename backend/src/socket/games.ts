import { Server as SocketIOServer, Socket } from 'socket.io';
import { getScore, getTimeStamp } from '../utils/games';
import GameSession, { IGameSession } from '../models/gameSession';
import Gameplay from '../models/gameplay';
import mongoose from 'mongoose';
import Bet from '../models/bet';
import Wallet from '../models/wallet';
import Transaction from '../models/transaction';
import Game from '../models/game';
import { onlineUsers } from '.';

let roomSettings = {
  totalRooms: 8, //total rooms
  findPlayer: {
    timeoutTimer: 100000, //connection timeout timer
    connectTimer: 10000, //connection timer to start (must less than timeoutTimer)
  },
  maxPlayers: [
    {
      game: 'connectFour',
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

let maxPlayers: number = 2;
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
      gameType: '',
    };
    userIndex++;

    if (newUser != undefined) {
      socket.emit('updateSocketUser', 'success', socket.data);
      socket.emit('updateSocketRooms', 'roomlist', rooms);
    }
  });

  socket.on('joinrandomroom', async function (sessionId) {
    try {
      //find room and users
      let roomCode: any = -1;

      var gameSession: IGameSession | null;
      if (!sessionId) {
        throw 'error';
      }
      gameSession = await GameSession.findOne({
        _id: sessionId,
        players: (socket.request as any).user._id,
        active: true,
      }).populate('initiatedGame', 'slug');

      if (!gameSession) {
        throw 'error';
      }

      socket.data.gameType = (gameSession.initiatedGame as any).slug;

      for (let n = 0; n < privateRooms.length; n++) {
        if (
          privateRooms[n].matching &&
          !privateRooms[n].play &&
          privateRooms[n].name === (gameSession._id as any).toString()
        ) {
          roomCode = privateRooms[n].name;
          break;
        }
      }

      if (roomCode == -1) {
        //create new room if no room found
        for (let n = 0; n < 10; n++) {
          roomCode = (gameSession._id as any).toString();
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
          const gamePlay = await Gameplay.create({
            game: gameSession.initiatedGame,
            player1: {
              userId: gameSession.players[0],
            },
            player2: {
              userId: gameSession.players[1],
            },
            multiplayer: true,
            active: true,
            startTime: Date,
            session: gameSession._id,
          });

          if (gameSession.amount) {
            try {
              // Fetch wallets for both players
              const [wallet1, wallet2] = await Promise.all([
                Wallet.findOne({ user: gameSession.players[0] }),
                Wallet.findOne({ user: gameSession.players[1] }),
              ]);

              // Check wallet existence and sufficient balance
              if (!wallet1 || !wallet2) {
                socket.emit('updateSocketRooms', 'nobalance');
                return;
              }

              if (
                wallet1.balance < gameSession.amount ||
                wallet2.balance < gameSession.amount
              ) {
                socket.emit('updateSocketRooms', 'nobalance');
                return;
              }

              // Deduct balances
              wallet1.balance -= gameSession.amount;
              wallet2.balance -= gameSession.amount;

              // Save updated wallet balances
              await Promise.all([wallet1.save(), wallet2.save()]);

              // Create a new Bet record
              const bet = await Bet.create({
                game: gamePlay._id,
                session: gameSession._id,
                amount: gameSession.amount,
                status: 'ongoing',
              });

              // Associate the bet with the gameplay
              gamePlay.bet = bet._id as mongoose.Types.ObjectId;
              await gamePlay.save();

              // Create transactions for both players
              const transactions = [
                new Transaction({
                  type: 'Bet',
                  user: gameSession.players[0],
                  amount: gameSession.amount,
                  status: 'Completed',
                  paymentMethod: 'Wallet',
                  transactionType: 'debit',
                }),
                new Transaction({
                  type: 'Bet',
                  user: gameSession.players[1],
                  amount: gameSession.amount,
                  status: 'Completed',
                  paymentMethod: 'Wallet',
                  transactionType: 'debit',
                }),
              ];

              await Transaction.insertMany(transactions);

              console.log('Bet and wallet transactions processed successfully');
            } catch (error) {
              console.error(
                'Error processing bet or wallet transactions:',
                error,
              );
              socket.emit('updateSocketRooms', 'error');
              socket.emit('updateSocketRooms', 'nosession');
              return;
            }
          }

          gameSession.active = false;
          await gameSession.save();

          targetArray[roomIndex].matching = false;
          socket.broadcast
            .to(socket.data.room)
            .emit('updateSocketRooms', 'matched');
        }
      }
    } catch (error) {
      socket.emit('updateSocketRooms', 'nosession');
      console.log(error);
    }
  });

  socket.on('game', function (status, data, others) {
    updateSocketGame(status, data, others);
  });

  socket.on('startLocalGame', async function (gameId, selectedAmount) {
    console.log(gameId, selectedAmount);
    const userId = (socket.request as any).user._id;
    try {
      socket
        .to(onlineUsers.get(userId.toString())?.socketId.game!)
        .emit('creatingChallenge');
      const game = await Game.findById(gameId);
      if (!game) {
        socket
          .to(onlineUsers.get(userId.toString())?.socketId.game!)
          .emit('updateSocketRooms', 'nosession');
        return;
      }

      if (selectedAmount) {
        const wallet = await Wallet.findOne({ user: userId });
        if (selectedAmount > (wallet?.balance || 0)) {
          socket
            .to(onlineUsers.get(userId.toString())?.socketId.game!)
            .emit('updateSocketRooms', 'nobalance');
          return;
        }
      }

      const gameSession = await GameSession.create({
        players: [userId],
        active: true,
        initiatedGame: game._id,
        amount: selectedAmount,
        private: true,
      });

      socket.data.room = gameSession._id!.toString();

      const gamePlay = await Gameplay.create({
        game: game._id,
        player1: {
          userId,
        },
        multiplayer: false,
        active: true,
        startTime: Date,
        session: gameSession._id,
      });

      if (selectedAmount && gameSession.amount) {
        const wallet = await Wallet.findOne({ user: userId });

        // Check wallet existence and sufficient balance
        if (!wallet) {
          socket
            .to(onlineUsers.get(userId.toString())?.socketId.game!)
            .emit('updateSocketRooms', 'nobalance');
          return;
        }

        if (wallet.balance < gameSession.amount) {
          socket
            .to(onlineUsers.get(userId.toString())?.socketId.game!)
            .emit('updateSocketRooms', 'nobalance');
          return;
        }

        // Deduct balances
        wallet.balance -= gameSession.amount;

        await wallet.save();

        const bet = await Bet.create({
          game: gamePlay._id,
          session: gameSession._id,
          amount: gameSession.amount,
          status: 'ongoing',
        });

        // Associate the bet with the gameplay
        gamePlay.bet = bet._id as mongoose.Types.ObjectId;
        await gamePlay.save();
      }
      socket.emit('updateGamesession', { gameSession });
      socket
        .to(onlineUsers.get(userId.toString())?.socketId.game!)
        .emit('startLocalGame');
    } catch (error) {
      console.log(error);
      socket
        .to(onlineUsers.get(userId.toString())?.socketId.game!)
        .emit('updateSocketRooms', 'nosession');
    }
  });

  socket.on('exitroom', function () {
    leaveSocketRoom();
  });

  socket.on('exitGame', async function ({ status, score, sessionId, host }) {
    const userId = (socket.request as any).user._id;
    console.log(status, score, sessionId, host);
    // if (!host) {
    //   socket
    //     .to(onlineUsers.get(userId.toString())?.socketId.main!)
    //     .emit('updateGamesession', {
    //       gameSession: null,
    //     });
    //   return;
    // }
    try {
      const gameplay = await Gameplay.findOne({
        session: socket.data.room || sessionId,
        active: true,
      });

      if (!gameplay) {
        console.log('No active gameplay found for this session');
        return;
      }

      gameplay.active = false;

      const userScore = getScore(host, score);
      const opponentScore = getScore(!host, score);

      console.log(userScore, opponentScore); // Debugging statement

      // Update scores based on the player who exited
      gameplay.player2 = gameplay.player2 || { score: 0 };
      if (gameplay.player1.userId.toString() === userId.toString()) {
        // Player 1's logic
        if (status === 'left') {
          gameplay.player1.score = 0;
          gameplay.player2.score = 1;
        } else {
          gameplay.player1.score = userScore;
          gameplay.player2.score = opponentScore;
        }
      } else if (
        gameplay?.player2?.userId &&
        gameplay.player2.userId.toString() === userId.toString()
      ) {
        // Player 2's logic
        if (status === 'left') {
          gameplay.player2.score = 0;
          gameplay.player1.score = 1;
        } else {
          gameplay.player2.score = userScore;
          gameplay.player1.score = opponentScore;
        }
      }
      console.log('players', gameplay.player1.score, gameplay.player2.score);
      // Determine winner
      if (gameplay.player1.score > gameplay.player2.score) {
        gameplay.winner = gameplay.player1.userId; // player1 is the winner
      } else if (gameplay.player2.score > gameplay.player1.score) {
        gameplay.winner = gameplay.player2.userId; // player2 is the winner
      }

      const bet = await Bet.findOne({
        session: gameplay.session,
        status: 'ongoing',
      });
      if (bet) {
        bet.status = 'pending';
        if (gameplay.player1.score > gameplay.player2.score) {
          bet.winner = gameplay.player1.userId; // player1 is the winner
        } else if (gameplay.player2.score > gameplay.player1.score) {
          bet.winner =
            gameplay.player2.userId ||
            ('675c2244ae296dd02fd27858' as unknown as mongoose.Types.ObjectId); // player2 is the winner
        }
        await bet.save();
      }
      console.log(bet);

      // Save the updated gameplay record
      await gameplay.save();
      socket
        .to(onlineUsers.get(userId.toString())?.socketId.main!)
        .emit('updateGamesession', {
          gameSession: null,
        });
      socket
        .to(
          onlineUsers.get(gameplay?.player1?.userId.toString())?.socketId.main!,
        )
        .emit('updateGamesession', {
          gameSession: null,
        });
      gameplay?.player2?.userId &&
        socket
          .to(
            onlineUsers.get(gameplay?.player2?.userId.toString())?.socketId
              .main!,
          )
          .emit('updateGamesession', {
            gameSession: null,
          });
      if (bet) {
        socket
          .to(
            onlineUsers.get(gameplay?.player1?.userId.toString())?.socketId
              .main!,
          )
          .emit('gameOver', {
            winner: gameplay.winner,
            amount: bet?.amount,
          });
        gameplay?.player2?.userId &&
          socket
            .to(
              onlineUsers.get(gameplay?.player2?.userId.toString())?.socketId
                .main!,
            )
            .emit('gameOver', {
              winner: gameplay.winner,
              amount: bet?.amount,
            });
      }

      console.log('Game exited and updated successfully');
    } catch (error) {
      console.error('Error exiting game:', error);
    }
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

  async function updateSocketGame(status: string, data: any, others: any) {
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
      socket.data.gameType == 'tictactoe' ||
      socket.data.gameType == 'connectFour' ||
      socket.data.gameType == 'wordsearch'
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
    } else if (socket.data.gameType == 'snakesandladders') {
      if (status == 'start') {
        let randomTurn = Math.floor(
          Math.random() * targetArray[roomIndex].users.length,
        );
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
      } else if (status == 'nextplayer') {
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

    if (userIndex >= 0) {
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
    // for (let n = 0; n < rooms.length; n++) {
    //   if (rooms[n].users.length == 0) {
    //     rooms[n].play = false;
    //   }
    // }

    // for (let n = 0; n < privateRooms.length; n++) {
    //   if (privateRooms[n].users.length == 0) {
    //     privateRooms.splice(n, 1);
    //   }
    // }

    togglePrivateTimer();
    io.sockets.emit('updateSocketRooms', 'roomlist', rooms);
  }
};
