const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 3001;


app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);
let pets = {
  list: [
    { id: 1, type: "cat", age: 1, weight: 5, price: 2000 },
    { id: 2, type: "dog", age: 1, weight: 10, price: 3000 },
  ],
};

router
  .route("/user")
  .get((req, res) => {
    res.send(pets);
  })
  .put((req, res) => {
    user.name = req.body.name;
    res.send(user);
  });
app.listen(PORT, () => {
  console.log("Server running port ", PORT);
});

