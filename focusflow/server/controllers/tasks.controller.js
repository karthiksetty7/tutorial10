import {v4 as uuidv4} from 'uuid'
import {getDB} from '../config/db.js'

// CREATE TASK
export const createTask = async (req, res) => {
  const {
    title,
    description = '',
    energy_level = 'MEDIUM',
    mood = 'LOGICAL',
    priority = 'MEDIUM',
    focus_time = 25,
  } = req.body

  try {
    const db = getDB()
    const id = uuidv4()

    await db.run(
      `
      INSERT INTO tasks (
        id, title, description, energy_level, mood, priority, focus_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [id, title, description, energy_level, mood, priority, focus_time],
    )

    const newTask = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id])
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error'})
  }
}

// GET TASKS
export const getTasks = async (req, res) => {
  const db = getDB()
  const tasks = await db.all(
    `SELECT * FROM tasks WHERE is_deleted = 0 ORDER BY created_at DESC`,
  )
  res.json(tasks)
}

// UPDATE TASK
export const updateTaskById = async (req, res) => {
  const {id} = req.params
  const updates = req.body
  const db = getDB()

  const existing = await db.get(
    `SELECT * FROM tasks WHERE id = ? AND is_deleted = 0`,
    [id],
  )

  if (!existing) return res.status(404).json({message: 'Task not found'})

  await db.run(
    `
    UPDATE tasks SET
      title = ?,
      description = ?,
      energy_level = ?,
      mood = ?,
      priority = ?,
      focus_time = ?,
      completed = ?,
      delay_count = ?,
      completion_time = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [
      updates.title ?? existing.title,
      updates.description ?? existing.description,
      updates.energy_level ?? existing.energy_level,
      updates.mood ?? existing.mood,
      updates.priority ?? existing.priority,
      updates.focus_time ?? existing.focus_time,
      updates.completed ?? existing.completed,
      updates.delay_count ?? existing.delay_count,
      updates.completion_time ?? existing.completion_time,
      id,
    ],
  )

  const updated = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id])
  res.json(updated)
}

// DELETE
export const deleteTaskById = async (req, res) => {
  const {id} = req.params
  const db = getDB()
  await db.run(`UPDATE tasks SET is_deleted = 1 WHERE id = ?`, [id])
  res.json({message: 'Deleted'})
}

// ENERGY BASED SUGGESTION
export const suggestTaskByEnergy = async (req, res) => {
  try {
    const {energy, mood, priority} = req.query
    const db = getDB()

    const task = await db.get(
      `
  SELECT * FROM tasks
  WHERE energy_level = ?
  AND mood = ?
  AND priority = ?
  AND completed = 0
  AND is_deleted = 0
  ORDER BY created_at ASC
  LIMIT 1
  `,
      [energy, mood, priority],
    )

    res.json(task || null)
  } catch (error) {
    console.error('Suggest Task Error:', error)
    res.status(500).json({message: 'Internal Server Error'})
  }
}

// ---------------- GET TASK BY ID ----------------
export const getTaskById = async (req, res) => {
  // STEP 5 → UUID format validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {id} = req.params

  try {
    const db = getDB()

    // STEP 4 → DB existence check
    const task = await db.get(
      `SELECT * FROM tasks WHERE id = ? AND is_deleted = 0`,
      [id],
    )

    if (!task) {
      return res.status(404).json({message: 'Task not found'})
    }

    return res.status(200).json(task)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Internal Server Error'})
  }
}
