const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const handleError = require("./middlewares/handleError");
// celebrate
const {
  validationLogin,
  validationCreateUser,
} = require("./middlewares/validations");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.post("/signin", validationLogin, login); // вход
app.post("/signup", validationCreateUser, createUser); // регистрация

app.use(auth);
app.use(require("./routes"));
app.use(errors()); // celebrate
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
