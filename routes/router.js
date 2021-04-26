// use express module
const express = require('express');
const app = express();
const multer = require('multer')
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator');
const router = express.Router();
// Get request raw json from postman / api
app.use(express.json());
// Get request form form-urlencoded form postman / api
app.use(express.urlencoded({ extended: true }));
const {
  getIndex, getAddAbout, getEditAbout,
  getAddPortfolio, getEditPortfolio,
  getAddEmployee, getEditEmployee,
  postEditAbout, postEditEmployee, postEditPortfolio,
  postAddAbout, postAddEmployee, postAddPortfolio,
  postDeleteAbout, postDeleteEmployee, postDeletePortfolio } = require('./../controller/index');


const { getSignup, postSignup, getLogin, postLogin, postLogout } = require('../controller/auth')

const aboutValidator = [
  body('year')
    .isString()
    .isLength({ min: 3 })
    .withMessage('YEAR MINIMUM IS 5 CHARACTER')
    .trim(),
  body('title')
    .isString()
    .isLength({ min: 3 })
    .withMessage('TITLE MINIMUM IS 3 CHARACTER')
    .trim(),
    body('description')
    .isLength({ min: 5, max: 400 })
    .withMessage('DESCRIPTION MINIMUM IS 5 CHARACTER')
    .trim(),
    body('imageURL')
    .isURL()
    .withMessage('URL INVALID'),
]

// crud dashboard
router.get("/", isAuth, getIndex);
router.get('/addabout', aboutValidator, isAuth, getAddAbout)
router.get('/editabout/:id', isAuth, getEditAbout)
router.get('/addportfolio', isAuth, getAddPortfolio)
router.get('/editportfolio/:id', isAuth, getEditPortfolio)
router.get('/addemployee', isAuth, getAddEmployee)
router.get('/editemployee/:id', isAuth, getEditEmployee)
router.post('/posteditabout/:id', aboutValidator, isAuth, postEditAbout)
router.post('/posteditportfolio/:id', isAuth, postEditPortfolio)
router.post('/posteditemployee/:id', isAuth, postEditEmployee)
router.post('/postaddabout', isAuth, postAddAbout)
router.post('/postaddportfolio', isAuth, postAddPortfolio)
router.post('/postaddemployee', isAuth, postAddEmployee)
router.post('/postdeleteabout/:id', isAuth, postDeleteAbout)
router.post('/postdeleteportfolio/:id', isAuth, postDeletePortfolio)
router.post('/postdeleteemployee/:id', isAuth, postDeleteEmployee)

// login page
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.post('/logout', postLogout);

module.exports = router;