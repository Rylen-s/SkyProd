const express = require('express');
const app = express();
const cors = require('cors');
const authMw  = require('./authMiddleware');
const corsOptions = {
    origin: ["http://localhost:8081"]
}
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', authMw);

// now this will only fire if the user is signed-in
app.get('/api/me', (req, res) => {
  res.json({ uid: req.uid });
});

app.listen(8080, () => {
    console.log("Server started at port 8080");
});