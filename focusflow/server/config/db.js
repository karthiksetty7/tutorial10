import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, '../database/focusflow.db')

let db = null

export const initializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    console.log('Database connected successfully')

    // ================= USERS TABLE =================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // ================= TASKS TABLE =================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        energy_level TEXT,
        mood TEXT,
        priority TEXT,
        focus_time INTEGER,

        completed INTEGER DEFAULT 0,
        delay_count INTEGER DEFAULT 0,
        postpone_count INTEGER DEFAULT 0,
        completion_time INTEGER DEFAULT 0,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_deleted INTEGER DEFAULT 0
      );
    `)

    console.log('Tables verified/created')
  } catch (error) {
    console.error('DB Initialization Error:', error)
    process.exit(1)
  }
}

export const getDB = () => {
  if (!db) throw new Error('Database not initialized')
  return db
}
