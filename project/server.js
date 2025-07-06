import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Firestore
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
  });
}

const db = admin.firestore();
const productsCollection = db.collection('products');

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home Page — show first 3 products
app.get('/', async (req, res) => {
  try {
    const snapshot = await productsCollection.limit(3).get();
    const products = snapshot.docs.map(doc => ({ docID: doc.id, ...doc.data() }));
    res.render('index', { 
      title: 'Ayurvedic Wellness - Natural Herbal Medicine',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Products page — show all products
app.get('/products', async (req, res) => {
  try {
    const snapshot = await productsCollection.get();
    const products = snapshot.docs.map(doc => ({ docID: doc.id, ...doc.data() }));
    res.render('products', { 
      title: 'Our Products - Ayurvedic Wellness',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Product detail page
app.get('/products/:id', async (req, res) => {
  try {
    const doc = await productsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).render('404', { title: 'Product Not Found' });
    }
    const product = { id: doc.id, ...doc.data() };
    res.render('product-detail', { 
      title: `${product.productName} - Ayurvedic Wellness`,
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
