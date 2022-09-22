const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
} = require("../controllers/users");

router.get("/users", getUsers); // получить всех юзеров
router.post("/users", createUser); // создать юзера
router.patch("/users/me", updateUser); // обновить юзера по айди
router.get("/users/:userId", getUser); // получить юзера по айди
router.patch("/users/me/avatar", updateAvatar); // обновить аватар

module.exports = router;
