import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
import {validationResult} from 'express-validator'
import {getDB} from '../config/db.js'

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key'

// REGISTER
export const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {name, email, password} = req.body
  const db = getDB()

  const existingUser = await db.get(`SELECT id FROM users WHERE email = ?`, [
    email,
  ])

  if (existingUser) {
    return res.status(400).json({message: 'Email already exists'})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.run(
    `INSERT INTO users (id, name, email, password)
     VALUES (?, ?, ?, ?)`,
    [uuidv4(), name, email, hashedPassword],
  )

  res.status(201).json({message: 'User registered successfully'})
}

// LOGIN
export const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {email, password} = req.body
  const db = getDB()

  const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email])

  if (!user) {
    return res.status(401).json({message: 'Invalid credentials'})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({message: 'Invalid credentials'})
  }

  const token = jwt.sign({userId: user.id}, JWT_SECRET, {
    expiresIn: '24h',
  })

  // ✅ IMPORTANT CHANGE: send user also
  res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  })
}
