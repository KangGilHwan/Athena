const express = require('express')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

//라우터들
const oauth = require('./routers/oauth')
const group = require('./routers/group')
const room = require('./db/room')()

const app = express();
// const server = require('http').createServer(app);
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const server = app.listen(8080);
// const io = require('socket.io').listen(server);

app.use(express.static('../../public'));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'athena01'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(fileUpload());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Todo: room을 만들면 서버 메모리에 Room, Room안의 user를 저장한 후 메세지는 DB에 저장 후 가져온다.
io.on('connection', (socket) => {
  console.log(`hello ${socket.id}, nickname : ${socket.handshake.query.nickname}`);
  const nickname = socket.handshake.query.nickname;
  socket.on('createRoom', (data) => {
    console.log(`create Room : ${data.name}`);
    console.log(`userId : ${socket.request.user}`);
    room.create(1, data.name, function(err, roomId){
      socket.join(roomId);
      console.log(`create Room : ${roomId}`);
    });
  });

  socket.on('joinRoom', ({roomId}) => {
    socket.join(roomId);
    console.log(`join Room`);
    console.log(`room id : ${roomId}`);
    socket.to(roomId).emit('room', `${nickname} 님이 입장하셨습니다.`);
    socket.emit('room', `${nickname} 님이 입장하셨습니다.`);
  });

  socket.on('inviteRoom', (data) => {
    console.log(`invite Room`);
    console.log(`room id : ${data.roomId}`);
  });

  socket.on('message', ({ roomId, message }) => {
    console.log(`room id : ${roomId}, message : ${message}`);
    socket.to(roomId).emit('room', message);
    socket.emit('room', message);
   });
  });


//라우터 사용 - 앞의 url로 시작하는 요청이 들어오면 뒤의 라우터 사용
app.use('/oauth', oauth);
app.use('/groups', group);

app.get('/profile', function(req, res) {
  console.log("session - " + req.user.id);
  res.send('success');
});

app.use(function(err, req, res, next) {
  console.log(`error occurrence : ${err}`);
  res.status(500).json({
    errorMassage: err,
    success: false
  });
})

server.listen(8080, () => console.log('Listening on port 8080!'));
