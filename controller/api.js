// use express module
const express = require('express');
const app = express();
const {About, Portfolio, Employee} = require('./../model/api')
const multer = require('multer');
// Get request raw json from postman / api
app.use(express.json());
// Get request form form-urlencoded form postman / api
app.use(express.urlencoded({ extended: true }));

// display API for all collections
// display all about entry from database
exports.getAbouts = async (req, res, next) => {
  await About.find().exec((err, about)=>{
    res.json(about)
  })
}

// display all portfolio entry from database
exports.getPortfolios = async (req, res, next) => {
  await Portfolio.find().exec((err, portfolios)=>{
    res.json(portfolios)
  })
}

// display all employees entry from database
exports.getEmployees = async (req, res, next) => {
  await Employee.find().exec((err, employees)=>{
    res.json(employees)
  })
}

//all endpoint for add new data to collections
// add new entry to about collection
exports.addAbout = (multer().none(), async (req, res, next) => {
  const {year, title, description, imageURL} = req.body;
  const newAbout = new About({
    year: year,
    title: title,
    description: description,
    imageURL: imageURL
  })
  newAbout.save((err) => {
    if (err) {
      console.error(err)
    }
  })
})

// add new entry to portfolios collection
exports.addPortfolio = (multer().none(), async (req, res, next) => {
  const {title, description, imageURL} = req.body;
  const newPortfolio = new Portfolio({
    title: title,
    description: description,
    imageURL: imageURL
  })
  newPortfolio.save((err) => {
    if (err) {
      console.error(err)
    }
  })
})

// add new entry to employees collections
exports.addEmployee = (multer().none(), async (req, res, next) => {
  const {fullname, position, imageURL, twitterURL, facebookURL, linkedinURL} = req.body;
  const newEmployee = new Employee({
    fullname: fullname,
    position: position,
    imageURL: imageURL,
    twitterURL: twitterURL,
    facebookURL: facebookURL,
    linkedinURL: linkedinURL,
  })
  newEmployee.save((err) => {
    if (err) {
      console.error(err)
    }
  })
})