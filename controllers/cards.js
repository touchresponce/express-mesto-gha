const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const BadRequest = require("../errors/BadRequest");
const ForbiddenError = require("../errors/ForbiddenError");

// создать
module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(
        new BadRequest("Переданы некорректные данные при создании карточки.")
      );
    }
    next(err);
  }
};

// получить все
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// удаление
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new Error("NotFound"))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        card.remove();
        res.send({ message: "Карточка удалена" });
      } else {
        throw new Error("AccessError");
      }
    })
    .catch((err) => {
      if (err.message === "NotFound") {
        next(new NotFoundError("Карточка с указанным _id не найдена"));
      }
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      }
      if (err.message === "AccessError") {
        next(new ForbiddenError("Вы не можете удалить чужую карточку"));
      }
      next(err);
    });
};

// лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => new Error("NotFound"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === "NotFound") {
        next(new NotFoundError("Передан несуществующий id карточки"));
      }
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      }
      next(err);
    });
};

// дизлайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => new Error("NotFound"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === "NotFound") {
        next(new NotFoundError("Передан несуществующий id карточки"));
      }
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      }
      next(err);
    });
};
