const express = require("express");
const Users = require("../models/Users");

const route = express.Router();

route.get("/", (req, res) => {
  Users.getAll((err, result) => {
    if (err) res.json(err);
    else res.json(result);
  });
});

route.post("/", (req, res) => {
  // const user = req.body;
  Users.add(req.body, (err, result) => {
    if (err) res.status(500).json(err);
    else res.json({ message: "User added successfully!", result });
  });
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.delete(id, (err, result) => {
    if (err) res.status(500).json(err);
    else res.json({ msg: "student deleted successful" });
  });
});


// Route to get a user by ID
route.get("/:id", (req, res) => {
  const { id } = req.params;

  // Fetch user by ID from the database
  Users.getById(id, (err, user) => {
    if (err) {
      console.error("Error fetching user by ID:", err);
      return res.status(500).json({ error: "Failed to fetch user data" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  });
});


// route.put("/:id", (req, res) => {
//   const { id } = req.params;

//   Users.update(id, (err, result) => {
//     if (err) res.status(500).json(err);
//     else res.json({ msg: "user updated successfull" }, result);
//   });
// });

// Route (routes.js)
route.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, role, mobile, email, address, gender, dob, profilePicture } = req.body;

  // Log the received data
  console.log("Update Request Body:", req.body);
  console.log("Update ID:", id);

  // Validation
  if (!name || !role || !mobile || !email || !gender || !dob || !profilePicture) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  Users.update(
    id,
    { name, role, mobile, email, address, gender, dob, profilePicture },
    (err, result) => {
      if (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ error: err.message });
      }

      // After successful update, fetch the updated user
      Users.getById(id, (err, user) => {
        if (err) {
          console.error("Fetch Error:", err);
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User updated successfully", user });
      });
    }
  );
});

module.exports = route;
