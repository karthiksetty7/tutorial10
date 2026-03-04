import {body} from 'express-validator'

export const createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required'),

  body('priority')
    .optional()
    .isIn(['HIGH', 'MEDIUM', 'LOW'])
    .withMessage('Priority must be HIGH, MEDIUM, or LOW'),

  body('focus_time')
    .optional()
    .isInt({min: 1})
    .withMessage('Focus time must be a positive integer'),
]

export const updateTaskValidation = [
  body().custom(value => {
    if (Object.keys(value).length === 0) {
      throw new Error('At least one field must be provided for update')
    }
    return true
  }),

  body('title')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Title must be a non-empty string'),

  body('priority')
    .optional()
    .isIn(['LOW', 'MEDIUM', 'HIGH'])
    .withMessage('Priority must be LOW, MEDIUM or HIGH'),

  body('focus_time')
    .optional()
    .isInt({gt: 0})
    .withMessage('Focus time must be a positive integer'),

  body('energy_level')
    .optional()
    .isInt({min: 1, max: 5})
    .withMessage('Energy level must be between 1 and 5'),

  body('mood').optional().isString().withMessage('Mood must be a string'),
]
