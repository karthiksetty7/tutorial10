import {param} from 'express-validator'

export const uuidParamValidation = [
  param('id').isUUID().withMessage('Invalid task ID format'),
]
