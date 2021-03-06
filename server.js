const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const knex = require('knex');
/* const bodyParser = require("body-parser"); */
/* const { response } = require("express"); */

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(cors());
/* app.use(bodyParser.json()); */
app.use(express.json());

app.get('/', (req, res) => {
  res.send('it is working');
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleGetProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
