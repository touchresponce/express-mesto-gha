const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const NotFound = require("../errors/NotFoundError");
const BadRequest = require("../errors/BadRequest");
const ConflictError = require("../errors/ConflictError");

// создать
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequest(
          "Переданы некорректные данные при создании пользователя"
        );
      } else if (err.code === 11000) {
        throw new ConflictError("Пользователь с таким email уже существует");
      }
    })
    .catch(next);
};

// получить всех
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// получить определенного
module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(() => {
      throw new NotFound("Пользователь по указанному _id не найден");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      }
      if (err.message === "NotFound") {
        next(new NotFound("Пользователь по указанному _id не найден"));
      }
      next(err);
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFound("Пользователь с указанным _id не найден");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        throw new BadRequest(
          "Переданы некорректные данные при обновлении аватара"
        );
      }
    })
    .catch(next);
};

// обновить определенного
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFound("Пользователь с указанным _id не найден");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        throw new BadRequest(
          "Переданы некорректные данные при обновлении профиля"
        );
      }
    })
    .catch(next);
};

// логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "yandex-praktikum", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};
