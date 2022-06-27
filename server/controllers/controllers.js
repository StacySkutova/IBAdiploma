import bcrypt from "bcryptjs";
import { cookie, validationResult } from "express-validator";
import jwtToken from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config";

import User from "../models/modelUser.js";
import Plan from "../models/modelPlan.js";

const SECRET = "secret";
const HASH_COMPLEXITY_NUMBER = 7;

const transporter = nodemailer.createTransport({
  service: "Mail.ru",
  auth: {
    user: "app.health.and.fitness@mail.ru",
    pass: "P8uFTMBFaYn15hxmLD2d", // AppHAF-2022
  },
});

const mailOptions = {
  from: "app.health.and.fitness@mail.ru",
  to: "app.health.and.fitness@mail.ru",
  // request.body.email,
  subject: "Восстаовление пароля/Password reset",
  html: `<p>Для восстановления пароля, следуйте по <a href='http://localhost:3000/reset-password'>ссылке</a>.</p>
<hr/><p>To reset the password, please follow the <a href='http://localhost:3000/reset-password'>link</a>.</p>`,
};

class controllers {
  async signup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({
          message: "Errors during registration",
          errors: errors.array(),
        });
      }
      const { userName, email, password, confirmPassword } = req.body;
      const candidate = await User.findOne({ userName, email });
      if (candidate) {
        return res.status(300).json({ message: "Such user already exists" });
      }
      if (password !== confirmPassword) {
        return res.status(300).json({ message: "Passwords do not match" });
      }
      const hashPassword = bcrypt.hashSync(password, HASH_COMPLEXITY_NUMBER);
      const hashConfirmPassword = bcrypt.hashSync(
        confirmPassword,
        HASH_COMPLEXITY_NUMBER
      );
      const user = new User({
        userName,
        email,
        password: hashPassword,
        confirmPassword: hashConfirmPassword,
        avatar: "",
        role: "user",
        plan: {},
      });
      await user.save();
      return res.status(200).json({ message: "User has been created" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Errors during registration" });
    }
  }

  async signin(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(500)
          .json({ message: req.t("error_isEmpty"), errors: errors.array() });
      }
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: req.t("error_noSuchUser") });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: req.t("error_incorrectPassword") });
      }
      const token = jwtToken.sign({ userId: user._id }, SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        userId: user._id,
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async forgot(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Errors during email request",
          errors: errors.array(),
        });
      }
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Such user has been not found" });
      }
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res
            .status(500)
            .json({ message: "Errors during email sending" });
        } else {
          return res
            .status(300)
            .json({ message: "Email sent: " + info.response });
        }
      });
      return res.status(200).json({ message: "Mail was sent successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  async reset(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Errors during password reset",
          errors: errors.array(),
        });
      }
      const { email, newPassword, confirmPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Such user has been not found" });
      }
      if (newPassword === confirmPassword) {
        const hashNewPassword = bcrypt.hashSync(
          newPassword,
          HASH_COMPLEXITY_NUMBER
        );
        await User.findOneAndUpdate(
          { email },
          { password: hashNewPassword },
          {
            new: true,
          }
        );
        return res
          .status(200)
          .json({ message: "Password was rest successfully" });
      }
      return res.status(500).json({ message: "Passwords are not the same" });
    } catch (err) {
      console.log(err);
    }
  }

  async updateUserData(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Errors during user data update",
          errors: errors.array(),
        });
      }
      const { userName, email, password } = req.body;
      const user = await User.findOne({ userName });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Such user has been not found" });
      }
      if (email !== "") {
        await User.findOneAndUpdate(
          { userName },
          { email: email },
          {
            new: true,
          }
        );
        return res
          .status(200)
          .json({ message: "Email was reset successfully" });
      }
      if (password !== "") {
        const hashNewPassword = bcrypt.hashSync(
          password,
          HASH_COMPLEXITY_NUMBER
        );
        await User.findOneAndUpdate(
          { userName },
          { password: hashNewPassword },
          {
            new: true,
          }
        );
        return res
          .status(200)
          .json({ message: "Password was reset successfully" });
      }
      return res.status(500).json({ message: "Error" });
    } catch (err) {
      console.log(err);
    }
  }

  async uploadUserAvatar(req, res) {
    try {
      if (req.file) {
        res.json("http://localhost:5000/users-avatars/" + req.file.filename);
        console.log("http://localhost:5000/users-avatars/" + req.file.filename);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async planCreation(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(500).json({
          message: "Errors during plan creation",
          errors: errors.array(),
        });
      }
      console.log(req.body);
      console.log(req.body.survey);
      const { survey, userName } = req.body;
      const { firstQuestion, secondQuestion, thirdQuestion } = survey;
      const plan = await Plan.findOne({
        firstQuestion,
        secondQuestion,
        thirdQuestion,
      });
      if (!plan) {
        return res.status(300).json({ message: "No such plan exists" });
      }
      await User.findOneAndUpdate(
        { userName },
        {
          plan: {
            firstQuestion: plan.firstQuestion,
            secondQuestion: plan.secondQuestion,
            thirdQuestion: plan.secondQuestion,
            workoutType: plan.workoutType,
            perWeekWorkoutNumber: plan.perWeekWorkoutNumber,
            videosWorkout: plan.videosWorkout,
            perDayMealNumber: plan.perDayMealNumber,
            menu: plan.menu,
          },
        },
        {
          new: true,
        }
      );
      return res.json({
        firstQuestion: plan.firstQuestion,
        secondQuestion: plan.secondQuestion,
        thirdQuestion: plan.secondQuestion,
        workoutType: plan.workoutType,
        perWeekWorkoutNumber: plan.perWeekWorkoutNumber,
        videosWorkout: plan.videosWorkout,
        perDayMealNumber: plan.perDayMealNumber,
        menu: plan.menu,
      });
      // для охранения плана - пригодится
      // const user = new Plan({ firstQuestion, secondQuestion, thirdQuestion });
      // await user.save();
      // return res.status(200).json({ message: 'Plan has been created' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Errors during plan creation" });
    }
  }

  async getUser(req, res) {
    try {
      const { userName } = req.params;
      const user = await User.findOne({ userName: userName });
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUser(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(req, res) {
    try {
      const { userName } = req.params;
      await User.findOneAndDelete({ userName: userName });
      console.log(userName);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllPlans(req, res) {
    try {
      const users = await Plan.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

const controller = new controllers();
export default controller;
