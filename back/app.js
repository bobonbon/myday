const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결!!');
    })
    .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
} else {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: [true, 'http://bobonbon.xyz'],
    credentials: true,  // 쿠키를 같이 전달하고 싶다면 true
}));
//프론트에서 백으로 데이터 보낼 때
app.use(express.json());    // axios로 데이터 보낼 때
app.use(express.urlencoded({ extended: true }));    // 일반 폼(multipart/form-data 아님)으로 데이터 보낼 때
app.use('/', express.static(path.join(__dirname, 'uploads')));   // '/': localhost:3065/ , path.join() 운영체제에 맞게 알아서 경로를 맞춰줌

//쿠키,세션
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.bobonbon.xyz'
    },
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('', (req, res) => {
    res.send('api');
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(80, () => {
    console.log('서버 실행 중');
});