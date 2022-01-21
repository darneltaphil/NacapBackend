const { Route } = require("express");
const express = require("express");
const Router = express.Router();

const casesControllers = require('../controllers/cases')


Router.get('/report/',casesControllers.getCaseReporters)

Router.get('/:id', casesControllers.getCaseById)

Router.get("/", casesControllers.getAllCases)

Router.delete('/:id', casesControllers.deleteCase)

Router.post('/',casesControllers.addCase)

module.exports = Router; 