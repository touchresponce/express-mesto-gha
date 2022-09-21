const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
} = require("../controllers/users");

router.get("/users", getUsers); // получить всех
router.post("/users", createUser); // создать
router.patch("/users/me", updateUser); // обновить по айди
router.get("/users/:userId", getUser); // получить по айди
router.patch("/users/me/avatar", updateAvatar); // обновить аватар

module.exports = router;
