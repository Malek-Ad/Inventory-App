const express = require("express");
const cors = require("cors");
const db = require('./database/sequelize/index');
const router =require('./routes/routes')
const PORT = 3000;
const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.use("/api/items",router);
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


