import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from 'drizzle-orm/pg-core';

// Phones table - stores all phone data
export const phones = pgTable('phones', {
  id: serial('id').primaryKey(),
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  slug: text('slug').notNull().unique(),
  releaseDate: text('release_date'),
  price: integer('price'),
  imageUrl: text('image_url'),
  
  // Display specs
  displaySize: real('display_size'),
  displayResolution: text('display_resolution'),
  displayType: text('display_type'),
  refreshRate: integer('refresh_rate'),
  brightness: integer('brightness'),
  ppi: integer('ppi'),
  
  // Performance
  chipset: text('chipset'),
  cpu: text('cpu'),
  gpu: text('gpu'),
  ram: integer('ram'),
  storage: integer('storage'),
  antutuScore: integer('antutu_score'),
  
  // Camera
  mainCamera: text('main_camera'),
  selfieCamera: text('selfie_camera'),
  cameraScore: integer('camera_score'),
  videoRecording: text('video_recording'),
  
  // Battery
  batteryCapacity: integer('battery_capacity'),
  fastCharging: integer('fast_charging'),
  wirelessCharging: boolean('wireless_charging'),
  batteryScore: integer('battery_score'),
  
  // Connectivity
  network: text('network'),
  bluetooth: text('bluetooth'),
  wifi: text('wifi'),
  nfc: boolean('nfc'),
  usb: text('usb'),
  
  // Build & Design
  dimensions: text('dimensions'),
  weight: integer('weight'),
  buildMaterial: text('build_material'),
  ipRating: text('ip_rating'),
  colors: text('colors'),
  
  // Features
  fingerprint: text('fingerprint'),
  faceUnlock: boolean('face_unlock'),
  headphoneJack: boolean('headphone_jack'),
  microsd: boolean('microsd'),
  
  // Operating System
  os: text('os'),
  
  // Full specs as JSON
  fullSpecs: jsonb('full_specs'),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Phone comparisons - user saved comparisons
export const comparisons = pgTable('comparisons', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),
  phoneIds: jsonb('phone_ids').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Price history for tracking
export const priceHistory = pgTable('price_history', {
  id: serial('id').primaryKey(),
  phoneId: integer('phone_id').references(() => phones.id),
  price: integer('price').notNull(),
  retailer: text('retailer'),
  recordedAt: timestamp('recorded_at').defaultNow(),
});

// User reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  phoneId: integer('phone_id').references(() => phones.id),
  userId: text('user_id'),
  rating: integer('rating').notNull(),
  title: text('title'),
  content: text('content'),
  prosAndCons: jsonb('pros_and_cons'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Benchmark scores
export const benchmarks = pgTable('benchmarks', {
  id: serial('id').primaryKey(),
  phoneId: integer('phone_id').references(() => phones.id),
  benchmarkType: text('benchmark_type').notNull(), // antutu, geekbench, 3dmark, etc.
  score: integer('score').notNull(),
  details: jsonb('details'),
  recordedAt: timestamp('recorded_at').defaultNow(),
});
