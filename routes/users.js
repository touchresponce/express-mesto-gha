const routerUser = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");

routerUser.get("/users", getUsers);
routerUser.get("/users/:userId", () => {});
routerUser.post("/users", createUser);

module.exports = routerUser;
