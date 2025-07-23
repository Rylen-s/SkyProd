const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:8081"]
}

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({"fruits": ["apple", "banana", "orange"]})

});

app.listen(8080, () => {
    console.log("Server started at port 8080");
});