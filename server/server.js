// server.js
const express    = require('express');
const cors       = require('cors');
const authMw     = require('./authmid');
const activities = require('./routes/activities');

const app = express();

// 1) Parse JSON bodies
app.use(express.json());

// 2) Allow browser requests from your frontend
app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET','POST','OPTIONS','PATCH','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // <— add Authorization here
  // credentials: true, // only if you’re sending cookies
}));
// 3) Public “root” and health-check routes
app.get('/', (req, res) => {
  res.send('🎉 SkyProd API is up and running! Try GET /api/activities');
});
app.get('/api', (req, res) => {
  res.json({ status: 'OK' });
});

// 4) Protect everything under /api
app.use('/api', authMw);

// 5) Mount your protected resource routes
app.use('/api/activities', activities);

// 6) A convenience endpoint to confirm your token decoding
app.get('/api/me', (req, res) => {
  res.json({ uid: req.uid });
});

// 7) Start the server
app.listen(8080, () => {
  console.log('Server started at port 8080');
});
