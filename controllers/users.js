const connection = require("../database/dbconfig");

const loginUser = async (req, res) => {
  const { staffId, password } = req.body;

  try {
    connection.query(
      // "SELECT * FROM user_role WHERE staff_id=? AND user_password = ?",
      "SELECT user_name, user_role, user_staff_id FROM users WHERE user_staff_id=? AND user_pwd=?",
      [staffId, password],
      (err, rows) => {
        if (!err) {
          //console.log(rows);
          //checke if the result is empty
          if (rows.length == 0) {
            res.send({ status: true, message: "User does not exist" });
          } else {
            res.send({
              status: true,
              message: "user authenticated",
              //data: [rows["role_name"], rows["user_role"], rows["staff_if"]],
              data: {
                name: rows[0].user_name,
                role: rows[0].user_role,
                id: rows[0].user_staff_id,
              },
            });
          }
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
