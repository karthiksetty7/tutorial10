import {body} from 'express-validator'

export const registerValidation = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({min: 6}),
]

export const loginValidation = [
  body('email').isEmail(),
  body('password').notEmpty(),
]
