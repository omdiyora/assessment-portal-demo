const { query } = require("express");
const pool = require("../../../db/connect");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomOtp = require("random-otp");

// Create User
module.exports.createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      role_id,
      createdBy,
    } = req.body;

    const query = `
    INSERT INTO users (username, email, password, first_name, last_name, role_id, createdOn, createdBy)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
    RETURNING *;
  `;

    const result = await pool.query(query, [
      username,
      email,
      password,
      first_name,
      last_name,
      role_id,
      createdBy,
    ]);

    res.status(201).json({
      message: "User Created Successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Users
module.exports.getUser = async (req, res) => {
  try {
    const query = "SELECT * FROM users;";
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User
module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, first_name, last_name, role_id } =
      req.body;

    const query = `
      UPDATE users
      SET 
        username = $1,
        email = $2,
        password = $3,
        first_name = $4,
        last_name = $5,
        role_id = $6
      WHERE id = $7
      RETURNING *;`;

    const result = await pool.query(query, [
      username,
      email,
      password,
      first_name,
      last_name,
      role_id,
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User Updated Successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error Updating User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete User
module.exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;`;

    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User Deleted Successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error Deleting User:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
