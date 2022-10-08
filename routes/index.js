const router = require('express').Router();
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validations');

router.post('/signin', validationLogin, login); // вход
router.post('/signup', validationCreateUser, createUser); // регистрация
// защита авторизацией
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не существует'));
});
router.use(errors());
router.use(handleError);

module.exports = router;
