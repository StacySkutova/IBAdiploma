import express from "express";
import { check } from "express-validator";

import filesMiddleware from "../middleware/files-upload.js";
import controller from "../controllers/controllers.js";

const router = express.Router();

router.post(
  "/sign-up",
  // [
  //   check('userName', 'Username field can not be empty').notEmpty(),
  //   check('email', 'Email field can not be empty').notEmpty().isEmail(),
  //   check(
  //     'password',
  //     'Password field should be at least 6 characters and not more than 10',
  //   ).isLength({ min: 6, max: 10 }),
  //   check(
  //     'confirmPassword',
  //     'Password field should be at least 6 characters and not more than 10',
  //   ).isLength({ min: 6, max: 10 }),
  // ],
  controller.signup
);
router.post(
  "/sign-in",
  [
    check("userName", "Username field can not be empty").notEmpty(),
    check("password", "Password field can not be empty").notEmpty().exists(),
  ],
  controller.signin
);
router.post(
  "/forgot",
  [check("email", "Email field can not be empty").notEmpty().isEmail()],
  controller.forgot
);
router.post(
  "/reset",
  [
    check("email", "Email field can not be empty").notEmpty().isEmail(),
    check("newPassword", "Password field can not be empty").notEmpty().exists(),
    check("confirmPassword", "Password field can not be empty")
      .notEmpty()
      .exists(),
  ],
  controller.reset
);
router.post("/user-data-update", controller.updateUserData);
router.post(
  "/upload-avatar",
  filesMiddleware.single("avatar"),
  controller.uploadUserAvatar
);
router.post("/plan-creation", controller.planCreation);
router.get("/user-find/:userName", controller.getUser);
router.get("/user-find", controller.getAllUser);
router.delete("/user-delete/:userName", controller.deleteUser);
router.get("/plans-find", controller.getAllPlans);

export default router;
