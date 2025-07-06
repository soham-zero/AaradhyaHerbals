import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const productsFilePath = path.join(__dirname, 'finalproducts.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
  });
}

const db = admin.firestore();
const productsCollection = db.collection('products');

// Read products from JSON file
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

async function seed() {
  console.log(`🌱 Seeding ${products.length} products...`);

  for (const product of products) {
    try {
      const docRef = await productsCollection.add(product);
      console.log(`✅ Added product with ID: ${docRef.id}`);
    } catch (err) {
      console.error(`❌ Failed to add product:`, err);
    }
  }

  console.log('🌟 Done seeding!');
  process.exit();
}

seed();
