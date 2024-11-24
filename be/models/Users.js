const db = require("../config/db");

const Users = {
  getAll: (e) => {
    const query = "SELECT * FROM users";
    db.query(query, e);
  },
  add: (user, e) => {
    const query = `
    INSERT INTO users (name, role, mobile, email, address, gender, dob, profilePicture)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const { name, role, mobile, email, address, gender, dob, profilePicture } =
      user;
    db.query(
      query,
      [name, role, mobile, email, address, gender, dob, profilePicture],
      e
    );
  },
  delete: (id, e) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], e);
  },



  // update: (id, user, e)=>{
  //      const query = `
  // UPDATE users SET
  // name = ?, role = ?, mobile = ?, email = ?, address = ?, gender = ?, dob = ?, profilePicture = ?
  // WHERE id = ?`;
  // const { name, role, mobile, email, address, gender, dob, profilePicture } = user;
  // db.query(query,[name, role, mobile, email, address, gender, dob, profilePicture, id], e)
  // },

  update: (id, data, callback) => {
    const query = `
            UPDATE users 
            SET name = ?, 
                role = ?, 
                mobile = ?, 
                email = ?, 
                address = ?, 
                gender = ?, 
                dob = ?,
                profilePicture = ?
            WHERE id = ?
        `;

    // Log the query and values
    console.log("Update Query:", query);
    console.log("Update Values:", [
      data.name,
      data.role,
      data.mobile,
      data.email,
      data.address || null,
      data.gender,
      data.dob,
      data.profilePicture,
      id,
    ]);

    db.query(
      query,
      [
        data.name,
        data.role,
        data.mobile,
        data.email,
        data.address || null,
        data.gender,
        data.dob,
        data.profilePicture,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return callback(err);
        }
        callback(null, result);
      }
    );
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return callback(err);
      }
      callback(null, results[0]);
    });
  },

  getAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return callback(err);
      }
      callback(null, results);
    });
  },
};

module.exports = Users;
