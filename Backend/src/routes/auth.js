const express = require('express')
const { body } = require('express-validator')
const { register, login } = require('../controllers/authController')
const validateRequest = require('../middleware/validateRequest')

const router = express.Router()

router.post(
  '/signup',
  [
    body('userName')
      .trim()
      .notEmpty()
      .withMessage('User name is required')
      .isLength({ min: 2, max: 80 })
      .withMessage('User name must be between 2 and 80 characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[a-zA-Z]/)
      .withMessage('Password should contain letters')
      .matches(/\d/)
      .withMessage('Password should include at least one number')
  ],
  validateRequest,
  register
)

router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  login
)
module.exports = router
