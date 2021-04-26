// use express module
const express = require('express');
const app = express();
const multer = require('multer')
const isAuth = require('../middleware/is-auth');
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
const {aboutValidator, portfolioValidator, employeeValidator} = require('../middleware/validator')

// crud dashboard
router.get("/", isAuth, getIndex);
router.get('/addabout', isAuth, getAddAbout)
router.get('/editabout/:id', isAuth, getEditAbout)
router.get('/addportfolio', isAuth, getAddPortfolio)
router.get('/editportfolio/:id', isAuth, portfolioValidator, getEditPortfolio)
router.get('/addemployee', isAuth, getAddEmployee)
router.get('/editemployee/:id', isAuth, getEditEmployee)

router.post('/posteditabout/:id',isAuth, aboutValidator, postEditAbout)
router.post('/posteditportfolio/:id', isAuth, portfolioValidator, postEditPortfolio)
router.post('/posteditemployee/:id', isAuth, employeeValidator, postEditEmployee)

router.post('/postaddabout', isAuth, aboutValidator, postAddAbout)
router.post('/postaddportfolio', isAuth, portfolioValidator, postAddPortfolio)
router.post('/postaddemployee', isAuth, employeeValidator, postAddEmployee)

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