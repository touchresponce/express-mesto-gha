const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:userId", () => {});
router.post("/users", createUser);

module.exports = router;
