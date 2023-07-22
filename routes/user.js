const express = require("express");
const { User } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("../database/db");
require("dotenv").config();

// Router
const userRouter = express.Router();

// Express validator
const { check, validationResult } = require("express-validator");

// Salt counts
const SALT_COUNT = 10;

// adding middleware
userRouter.use(express.json());
// Use extended so we can use all info in URL
userRouter.use(express.urlencoded({ extended: true }));

// Auth Middleware
const setUser = (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    req.isLogIn = false;
    next();
  } else {
    const [, token] = auth.split(" ");
    try {
      const userObj = jwt.verify(token, process.env.JWT_SECRET);
      req.user = userObj;
      console.log(userObj);
      // Sets the owner id from an authenticated user
      if (!req.params.ownerId) {
        req.params.ownerId = userObj.id;
      }
      // Check if user role is admin with isAdmin custom property
      if (userObj.role === "admin") {
        req.isAdmin = true;
        console.log("Is this the admin:", req.isAdmin);
      } else {
        req.isAdmin = false;
        console.log("Is this the admin:", req.isAdmin);
      }
      req.isLogIn = true;
      next();
    } catch (error) {
      console.error(error.message);
      throw new Error("Invalid token");
    }
  }
};

// Allow user to login
userRouter.post("/login", async (req, res, next) => {
  // User can login with username, password and employee_number

  try {
    const { username, password, employee_number, firstname, lastname } =
      req.body;

    if (!username) {
      return res.status(400).send({ message: "Please enter username!" });
    }

    if (!password) {
      return res.status(400).send({ message: "Please enter password!" });
    }

    if (!employee_number) {
      return res
        .status(400)
        .send({ message: "Please enter your employee number!" });
    }

    // Finding a user
    const foundUser = await User.findOne({
      where: Sequelize.or({ username: username }),
    });

    if (!foundUser) {
      return res
        .status(401)
        .send("Incorrect username, password, or employee Id");
    }

    const loginMessage = `successfully logged in user ${foundUser.firstname} ${foundUser.lastname}`;

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (isMatch) {
      const tokenPayload = {
        id: foundUser.id,
        email: foundUser.email,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        employee_number: foundUser.employee_number,
        role: foundUser.role,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

      res.status(200).send({
        message: loginMessage,
        token,
        firstname: foundUser,
        firstname,
        lastname: foundUser.lastName,
        employee_number: foundUser.employee_number,
      });
    }

    if (!isMatch) {
      const notMatched = `Incorrect username or password`;
      res.status(401).send(notMatched);
    }
  } catch (error) {
    const message = "Incorrect username or password or employee Id";
    res.status(401).send(message);
    next(error);
  }
});

// Get all users if admin
userRouter.get("/users", setUser, async (req, res, next) => {
  const user = req.user;

  // Only admin can see all users
  if (!user.role.isAdmin === false) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.error(error.mesage);
    res.status(500).json({ mesage: "Error" });
    next(error);
  }
});

// Create a user (Employee)
userRouter.post("/register", async (req, res) => {
  /* Takes req.body of {username, password} and creates a new user with the hashed password */
  const {
    username,
    password,
    employee_number,
    firstname,
    lastname,
    email,
    role,
  } = req.body;

  if (!username) {
    return res.status(400).send({ message: "Please enter a username" });
  }
  if (!password) {
    return res.status(400).send({ message: "Please enter a password" });
  }
  if (!employee_number) {
    return res.status(400).send({ message: "Please enter an employeeId" });
  }
  if (!firstname) {
    return res.status(400).send({ message: "Please enter a firstname" });
  }
  if (!lastname) {
    return res.status(400).send({ message: "Please enter a Lastname" });
  }
  if (!email) {
    return res.status(400).send({ message: "Please enter an email" });
  }

  try {
    const hashedPw = await bcrypt.hash(password, SALT_COUNT);
    const createdUser = await User.create({
      username,
      password: hashedPw,
      email,
      firstname,
      lastname,
      role,
      employee_number,
    });

    const token = jwt.sign(
      {
        id: createdUser.id,
        username,
        email,
        firstname,
        lastname,
        role,
        employee_number,
      },
      process.env.JWT_SECRET
    );

    res.send({
      message: "Success, user created!",
      token,
      firstname: createdUser.firstName,
      lastname: createdUser.lastName,
      employee_number: createdUser.employee_number,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Export routes
module.exports = userRouter;
