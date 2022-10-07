const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');
// celebrate
const {
  validationUpdateUser,
  validationUserId,
  validationUpdateAvatar,
} = require('../middlewares/validations');

router.get('/', getUsers); // получить всех юзеров
router.get('/me', getCurrentUser); // инфа по текущему юзеру
router.patch('/me', validationUpdateUser, updateUser); // обновить текущего юзера
router.get('/:userId', validationUserId, getUser); // получить юзера по айди
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar); // обновить аватар текущего юзера

module.exports = router;
