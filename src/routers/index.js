const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users/users.controller");

// User
router.post("/", createUser);

router.get("/", getUser);

router.put("/update-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUser);

module.exports = router;
