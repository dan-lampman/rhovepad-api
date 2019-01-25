const express = require('express');
const app = express();
const Admin = require('./routes/admin');
const Status = require('./routes/status');
const UserRoutes = require('./routes/user');
const MusicRoutes = require('./routes/music');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = process.env.PORT || 3000;
const secretKey = 'zKFcLgp9qMkrDRQB';

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
    key: 'user_sid',
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// routes
app.use('/rhovepad-api', Admin);
app.use('/rhovepad-api/status', Status);
app.use('/rhovepad-api/user', UserRoutes);
app.use('/rhovepad-api/music', MusicRoutes);

app.get('/', (req, res) => {
    res.send('Hello! rhovepad-api is at ' + req.get('host') + '/rhovepad-api');
});

app.listen(port, () => {
    console.log('rhovepad-api listening on: ' + port);
});

module.exports = app;