const connection = require("../database/dbconfig");

const getAllCases = async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM cases c \
    LEFT JOIN case_category cat\
    ON c.case_category_id  = cat.case_category_id\
    LEFT JOIN tbl_regions r \
    ON c.case_region_id = r.reg_id\
    LEFT JOIN case_reporters rep\
    ON c.case_reporter_id = rep.case_reporter_id",
      (err, rows) => {
        if (!err) {
          res.send(rows);
        } else {
          res.send({ message: "The system could not load the cases" });
          console.log(err);
        }
      }
    );
  } catch (err) {
    res.send({ message: "Fatal Error: Contact Administrator" });
    console.log(err);
  }
};

const getCaseById = async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "SELECT * FROM cases c \
    LEFT JOIN case_category cat\
    ON c.case_category_id  = cat.case_category_id\
    LEFT JOIN tbl_regions r \
    ON c.case_region_id = r.reg_id\
    LEFT JOIN case_reporters rep\
    ON c.case_reporter_id = rep.case_reporter_id\
     WHERE case_id =?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteCase = async (req, res) => {
  const id = req.params.id;
  try {
    connection.query(
      "DELETE FROM cases WHERE case_id= ?",
      [id],
      (err, rows) => {
        !err
          ? res.send({ status: true, message: "Case deleted succesfully" })
          : res.send(" Somethng went wrong");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const addCase = async (req, res) => {
  const data = req.body;

  //To check if the body contains any data
  const isEmpty = Object.keys(data).length === 0;

  if (isEmpty) {
    res.send({ status: false, message: "No data Received" });
  } else {
    try {
      //Get only the values fron tge data object
      const formData = Object.values(data);
      connection.query(
        "INSERT INTO cases (case_id,\
            case_category_id, \
            case_title,\
            case_details, \
            case_region_id, \
            case_town, \
            case_location, \
            case_reporter_id, \
            case_date, \
            case_time, \
            status,\
            status_fine\
            )     \
            VALUES (NULL,?)",
        [formData],
        (err, rows) => {
          if (!err) {
            res.send({ status: true, message: "Data inserted sucessfully" });
          } else {
            res.send({ status: false, message: "Something went wrong" });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send({ status: false, message: "Your Request Failed" });
    }
  }
};

const updateCase = async (req, res) => {
  const data = req.body;
  const isEmpty = Object.keys(data).length === 0;

  if (isEmpty) {
    res.send({ status: false, message: "No data Received" });
  } else {
    try {
      connection.query(
        "UPDATE  cases SET \
            case_category_id = " +
          data.case_category_id +
          ", \
            case_title='" +
          data.case_title +
          "',\
            case_details='" +
          data.case_details +
          "', \
            case_region_id=" +
          data.case_region_id +
          ", \
            case_town='" +
          data.case_town +
          "', \
            case_location='" +
          data.case_location +
          "', \
            case_reporter_id=" +
          data.case_reporter_id +
          ", \
            case_date='" +
          data.case_date +
          "', \
            case_time='" +
          data.case_time +
          "', \
            status=" +
          data.status +
          ",\
            status_fine=" +
          data.status_fine +
          "\
            WHERE case_id = " +
          data.case_id +
          "",

        (err) => {
          if (!err) {
            res.send({ status: true, message: "Case update sucessfully" });
          } else {
            console.log(err);
            res.send({ status: false, message: "Something went wrong" });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send({ status: false, message: "Your Request Failed" });
    }
  }
};

const getCaseReviewed = async (req, res) => {
  try {
    connection.query(
      "SELECT COUNT(*) as reviewedCases FROM case_review",
      (err, row) => {
        !err
          ? res.send(row)
          : res.send({
              status: false,
              message: "Request could not be completed",
            });
      }
    );
  } catch (error) {}
};

const getCaseInvestigated = async (req, res) => {
  try {
    connection.query(
      "SELECT COUNT(*) as investigatedCases FROM case_investigate",
      (err, row) => {
        !err
          ? res.send(row)
          : res.send({
              status: false,
              message: "Request could not be completed",
            });
      }
    );
  } catch (error) {
    console(error);
  }
};

const getCaseForwarded = async (req, res) => {
  try {
    connection.query(
      "SELECT COUNT(*) as forwardedCases FROM case_forward",
      (err, row) => {
        !err
          ? res.send(row)
          : res.send({
              status: false,
              message: "Request could not be completed",
            });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCases = getAllCases;
exports.getCaseById = getCaseById;
exports.updateCase = updateCase;
exports.deleteCase = deleteCase;
exports.addCase = addCase;
exports.getCaseReviewed = getCaseReviewed;
exports.getCaseInvestigated = getCaseInvestigated;
exports.getCaseForwarded = getCaseForwarded;
