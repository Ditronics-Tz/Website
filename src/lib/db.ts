import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

// Database file stored in project root
const dbPath = path.join(process.cwd(), 'data', 'ditronics.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS laptops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'TZS',
    cpu TEXT,
    ram TEXT,
    storage TEXT,
    gpu TEXT,
    display TEXT,
    battery TEXT,
    image TEXT,
    stock_status TEXT DEFAULT 'In Stock',
    condition TEXT DEFAULT 'Brand New',
    notes TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Extended specs
    brand TEXT,
    model_number TEXT,
    os TEXT,
    webcam TEXT,
    ports TEXT,
    wifi TEXT,
    bluetooth TEXT,
    weight TEXT,
    dimensions TEXT,
    color TEXT,
    keyboard TEXT,
    warranty TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Add missing columns if they don't exist (for existing databases)
const columns = db.prepare("PRAGMA table_info(laptops)").all() as { name: string }[];
const columnNames = columns.map(c => c.name);
const newColumns = [
  { name: 'brand', type: 'TEXT' },
  { name: 'model_number', type: 'TEXT' },
  { name: 'os', type: 'TEXT' },
  { name: 'webcam', type: 'TEXT' },
  { name: 'ports', type: 'TEXT' },
  { name: 'wifi', type: 'TEXT' },
  { name: 'bluetooth', type: 'TEXT' },
  { name: 'weight', type: 'TEXT' },
  { name: 'dimensions', type: 'TEXT' },
  { name: 'color', type: 'TEXT' },
  { name: 'keyboard', type: 'TEXT' },
  { name: 'warranty', type: 'TEXT' },
  { name: 'description', type: 'TEXT' },
];

for (const col of newColumns) {
  if (!columnNames.includes(col.name)) {
    db.exec(`ALTER TABLE laptops ADD COLUMN ${col.name} ${col.type}`);
  }
}

// Check if admin exists, if not create default admin
const adminExists = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
if (adminExists.count === 0) {
  // Default admin: username: admin, password: Ditronics@2036 (stored as hash)
  const hashedPassword = bcrypt.hashSync('Ditronics@2036', 10);
  db.prepare('INSERT INTO admin_users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
}

// Initialize default settings
const defaultSettings = [
  { key: 'whatsapp_number', value: '255717321753' },
  { key: 'phone_number', value: '255717321753' },
  { key: 'email', value: 'info@ditronics.co.tz' },
  { key: 'address', value: 'Shangwe Kibada, Tanzania' },
  { key: 'company_name', value: 'Ditronics' },
];

for (const setting of defaultSettings) {
  const exists = db.prepare('SELECT COUNT(*) as count FROM settings WHERE key = ?').get(setting.key) as { count: number };
  if (exists.count === 0) {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(setting.key, setting.value);
  }
}

export default db;

// Laptop types
export interface Laptop {
  id: number;
  name: string;
  slug: string;
  price: number;
  currency: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  battery: string;
  image: string;
  stock_status: string;
  condition: string;
  notes: string;
  featured: number;
  created_at: string;
  updated_at: string;
  // Extended specs
  brand: string;
  model_number: string;
  os: string;
  webcam: string;
  ports: string;
  wifi: string;
  bluetooth: string;
  weight: string;
  dimensions: string;
  color: string;
  keyboard: string;
  warranty: string;
  description: string;
}

// Laptop CRUD operations
export function getAllLaptops(): Laptop[] {
  return db.prepare('SELECT * FROM laptops ORDER BY created_at DESC').all() as Laptop[];
}

export function getLaptopById(id: number): Laptop | undefined {
  return db.prepare('SELECT * FROM laptops WHERE id = ?').get(id) as Laptop | undefined;
}

export function getLaptopBySlug(slug: string): Laptop | undefined {
  return db.prepare('SELECT * FROM laptops WHERE slug = ?').get(slug) as Laptop | undefined;
}

export function getFeaturedLaptops(): Laptop[] {
  return db.prepare('SELECT * FROM laptops WHERE featured = 1 ORDER BY created_at DESC LIMIT 3').all() as Laptop[];
}

export function createLaptop(laptop: Omit<Laptop, 'id' | 'created_at' | 'updated_at'>): number {
  const result = db.prepare(`
    INSERT INTO laptops (name, slug, price, currency, cpu, ram, storage, gpu, display, battery, image, stock_status, condition, notes, featured, brand, model_number, os, webcam, ports, wifi, bluetooth, weight, dimensions, color, keyboard, warranty, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    laptop.name,
    laptop.slug,
    laptop.price,
    laptop.currency,
    laptop.cpu,
    laptop.ram,
    laptop.storage,
    laptop.gpu,
    laptop.display,
    laptop.battery,
    laptop.image,
    laptop.stock_status,
    laptop.condition,
    laptop.notes,
    laptop.featured,
    laptop.brand || null,
    laptop.model_number || null,
    laptop.os || null,
    laptop.webcam || null,
    laptop.ports || null,
    laptop.wifi || null,
    laptop.bluetooth || null,
    laptop.weight || null,
    laptop.dimensions || null,
    laptop.color || null,
    laptop.keyboard || null,
    laptop.warranty || null,
    laptop.description || null
  );
  return result.lastInsertRowid as number;
}

export function updateLaptop(id: number, laptop: Partial<Laptop>): void {
  const fields = Object.keys(laptop).filter(k => k !== 'id' && k !== 'created_at');
  const setClause = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => (laptop as any)[f]);
  
  db.prepare(`UPDATE laptops SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values, id);
}

export function deleteLaptop(id: number): void {
  db.prepare('DELETE FROM laptops WHERE id = ?').run(id);
}

// Admin operations
export function verifyAdmin(username: string, password: string): boolean {
  const admin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as { password: string } | undefined;
  if (!admin) return false;
  return bcrypt.compareSync(password, admin.password);
}

export function changeAdminPassword(username: string, newPassword: string): void {
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE admin_users SET password = ? WHERE username = ?').run(hashedPassword, username);
}

// Settings operations
export interface Setting {
  id: number;
  key: string;
  value: string;
  updated_at: string;
}

export function getAllSettings(): Record<string, string> {
  const settings = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  return settings.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);
}

export function getSetting(key: string): string | null {
  const setting = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as { value: string } | undefined;
  return setting?.value || null;
}

export function updateSetting(key: string, value: string): void {
  const exists = db.prepare('SELECT COUNT(*) as count FROM settings WHERE key = ?').get(key) as { count: number };
  if (exists.count === 0) {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(key, value);
  } else {
    db.prepare('UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').run(value, key);
  }
}

export function updateSettings(settings: Record<string, string>): void {
  for (const [key, value] of Object.entries(settings)) {
    updateSetting(key, value);
  }
}
