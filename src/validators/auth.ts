import { body, check } from "express-validator";

const register = [
  body(["name", "profile_picture"]).notEmpty().escape(),
  body("email")
    .isEmail()
    .withMessage("Please provide valid email address")
    .notEmpty()
    .withMessage("Email is required")
    .escape(),
  check("password", "Password is required").notEmpty(),
  check("password", "Must be at least 8 characters long").isLength({ min: 8 }),
  check("confirm_password", "Confirm Password is required").notEmpty(),
  check("confirm_password", "Must be at least 8 characters long").isLength({
    min: 8,
  }),
  check("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password does not match password");
    }
    return true;
  }),
];

export default { register };
