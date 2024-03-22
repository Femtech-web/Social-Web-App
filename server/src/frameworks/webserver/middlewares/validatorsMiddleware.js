import { check } from "express-validator";
import userDbRepository from "../../../application/repositories/userDbRepository";
import userDbRepositoryImpl from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import authServiceImpl from "../../services/authService";
import authServiceInterface from "../../../application/services/authServiceInterface";
import AppError from "../../services/appError";

const userRepository = userDbRepository(userDbRepositoryImpl());
const authService = authServiceInterface(authServiceImpl());

module.exports = {
  requireFullname: check("fullname")
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage("Must be a character between 5 and 40"),

  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        throw new AppError("Email in use", 403);
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),

  requirePasswordConfirmation: check("confirmPassword")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom(async (confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new AppError("passwords must match", 401);
      }
    }),

  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new AppError("Email not found", 404);
      }
    }),

  requirePasswordExists: check("password")
    .trim()
    .custom(async (password, { req }) => {
      userRepository
        .findByEmail(req.body.email)
        .then((user) => {
          if (!user) {
            throw new AppError("Invalid password", 400);
          }

          return authService.comparePasswords(user.password, password);
        })
        .then((isValidPassword) => {
          if (!isValidPassword) {
            throw new AppError("Invalid password", 400);
          }
        });
    }),
};
