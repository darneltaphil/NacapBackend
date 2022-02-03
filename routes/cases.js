const { Route, application } = require("express");
const express = require("express");
const Router = express.Router();

const casesControllers = require("../controllers/cases");

// Router.get("/forwarded/", casesControllers.getCaseForwarded);

// Router.get("/reviewed/", casesControllers.getCaseReviewed);

// Router.get("/investigated/", casesControllers.getCaseInvestigated);

Router.get("/summary/", casesControllers.getCaseSummary);

Router.get("/:id", casesControllers.getCaseById);

Router.get("/", casesControllers.getAllCases);

Router.delete("/delete/:id", casesControllers.deleteCase);

Router.post("/add/", casesControllers.addCase);

Router.put("/update/", casesControllers.updateCase);

module.exports = Router;
