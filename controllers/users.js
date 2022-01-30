const connection = require("../database/dbconfig");

const loginUser = async (req, res) => {
  const { staffId, password } = req.body;

  try {
    connection.query(
      "SELECT * FROM user_role WHERE staff_id=? AND user_password = ?",
      [staffId, password],
      (err, rows) => {
        if (!err) {
          res.send({
            status: true,
            message: "user authenticated",
            //data: [rows["role_name"], rows["user_role"], rows["staff_if"]],
            data: {
              name: rows[0].role_name,
              role: rows[0].user_role,
              id: rows[0].staff_id,
            },
          });
        } else {
          console.log(err);
        }
      }
    );
  } catch (error) {
    res.send({ status: false, message: "Your Request Failed" });
  }
};
exports.loginUser = loginUser;
