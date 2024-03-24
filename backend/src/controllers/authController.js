import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import user from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

// Helper function to create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Controller function to register users
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await user.findOne({ email });

    if (!name || !email || !password) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    if (exists) {
      throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    const newEntry = await newUser.save();
    const token = createToken(newEntry._id.toString());

    res.status(201).json({
      name: newEntry.name,
      email: newEntry.email,
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        status: "400 Bad Request",
        message: error.message,
      });
    } else {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        status: "500 Internal Server Error",
        message: "Internal Server Error, User not created",
      });
    }
  }
};

// Controller function to log in users
const loginUser = async (req, res) => {
  try {
    const login = await user.findOne({
      email: req.body.email,
    });

    if (!login) {
      res.status(404).json({
        message: "Email not found",
        status: "404 Not Found",
      });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      login.password
    );

    if (!validPassword) {
      res.status(400).json({
        message: "Invalid password",
        status: "400 Bad Request",
      });
      return;
    }

    const token = createToken(login._id.toString());

    res.status(200).json({
      name: login.name,
      email: login.email,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Internal Server Error, User not logged in",
    });
  }
};

export { registerUser, loginUser };
