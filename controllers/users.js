const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// создать
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные",
        });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

// получить всех
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res.status(SERVER_ERROR).send({ message: "На сервере произошла ошибка" })
    );
};

// получить определенного
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new Error("NotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      } else if (err.message === "NotFound") {
        res
          .status(NOT_FOUND)
          .send({ message: "Пользователь по указанному _id не найден" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

// обновить определенного
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("NotFound"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      } else if (err.message === "NotFound") {
        res
          .status(NOT_FOUND)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};
