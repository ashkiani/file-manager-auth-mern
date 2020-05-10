require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const bcrypt = require("bcrypt");

module.exports = function (app) {
  app.get("/api/home", function (req, res) {
    res.send("Welcome!");
  });

  app.get("/api/secret", middleware.withAuth, function (req, res) {
    res.send("The password is potato");
  });

  app.post("/api/register", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const login = { email, password: hashedPassword, first_name: firstName, last_name: lastName };
    let dbUser = await db.User.findOne({ email: email });
    let userExists = dbUser !== null;
    console.log("User Exists?");
    console.log(userExists);
    if (userExists) {
      res.status(400).send("The provided Email already exists.");
    } else {
      try {
        const newUser = new db.User(login);
        const result = await newUser.save();
        res.status(200).send(result);
      } catch (err) {
        res.status(400).send(err);
        console.log(err._message);
      }
    }
  });

  app.post("/api/authenticate", async function (req, res) {
    const { email, password } = req.body;
    try {
      let dbUser = await db.User.findOne({ email });
      let userExists = dbUser !== null;

      if (userExists) {
        console.log("email found.");
        console.log(dbUser);
        if (await bcrypt.compare(password, dbUser.password)) {
          console.log("password matched.");
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: "1h",
          });
          middleware.login(email);
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        } else {
          console.log("password didn't match.");
          res.status(401).json({
            error: "Incorrect email or password",
          });
        }
      } else {
        console.log("email not found.");
        res.status(401).json({
          error: "Incorrect email or password",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    }
  });

  app.get("/checkToken", middleware.withAuth, function (req, res) {
    res.sendStatus(200);
  });

  app.get("/logout", function (req, res) {
    middleware.logout(req.email);
    res.sendStatus(200);
  });

  app.post("/api/files/add", middleware.withAuth, async function (req, res) {
    email = req.email;
    const { fileName } = req.body;
    try {
      let dbUser = await db.User.findOne({ email });
      let userExists = dbUser !== null;

      if (userExists) {
        console.log("email found.");
        console.log(dbUser);
        console.log(dbUser.email);
        console.log(dbUser._id);
        const newFile = new db.File({ name: fileName, owner: dbUser._id });
        try {
          let addFile = await db.File.create(newFile);
          try {
            dbUser = await db.User.findOneAndUpdate(
              { _id: dbUser._id },
              { $push: { files: addFile._id } },
              { new: true }
            );
            res.status(200).send(dbUser);
          } catch (err) {
            res.status(400).send(err);
          }
        } catch (err) {
          res.status(400).send(err);
        }
      } else {
        console.log("email not found.");
        res.status(401).json({
          error: "Incorrect email or password",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    }
  });

  app.delete("/api/files/delete", middleware.withAuth, async function (req, res) {
    console.log("DELETE request...");
    email = req.email;
    const { fileId } = req.body;
    console.log(fileId);
    try {
      let dbFile = await db.File.findOne({ _id: fileId }).populate("owner");
      let fileExists = dbFile !== null;
      if (fileExists) {
        console.log("file found.");
        if (dbFile.owner.email === email) {
          await db.File.deleteOne({ _id: fileId });
          res.status(200).send("Deleted!");
        } else {
          console.log("Invalid owner.");
          res.status(401).json({
            error: "Only the owner of the file can delete it.",
          });
        }
      } else {
        console.log("file not found.");
        res.status(401).json({
          error: "file not found.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    }
  });

  app.get("/api/files", middleware.withAuth, async function (req, res) {
    console.log(req.email);
    const email = req.email;
    console.log("email for getting files");
    console.log(email);
    let dbUser = await db.User.findOne({ email }).populate({
      path: 'files',
      populate: { path: 'owner' }
    });
    let files = dbUser.files
    console.log(files);
    files = files.map(file => { return { id: file._id, name: file.name, owner: file.owner.first_name + " " + file.owner.last_name } });
    console.log(files);
    res.status(200).json(files);
  });
};
