const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const UserController = {
  register: async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;

      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.createUser(
        first_name,
        last_name,
        email,
        hashedPassword
      );

      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UserController;

