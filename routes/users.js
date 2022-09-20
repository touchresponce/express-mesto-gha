const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers); // все
router.post("/users", createUser); // создать
router.patch("/users/me"); // обновить по айди
router.get("/users/:userId", getUser); // по айди
router.patch("/users/me/avatar", updateAvatar); // обновить аватар

module.exports = router;
