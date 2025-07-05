import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Product data
const products = [
  {
    id: 1,
    name: "Turmeric Golden Milk Powder",
    image: "/images/turmeric-powder.jpg",
    shortDescription: "Anti-inflammatory golden milk blend with organic turmeric",
    description: "Our premium Turmeric Golden Milk Powder combines the ancient wisdom of Ayurveda with modern wellness needs. This carefully crafted blend helps reduce inflammation, supports immune function, and promotes restful sleep.",
    ingredients: ["Organic Turmeric Root", "Ceylon Cinnamon", "Black Pepper", "Ginger Root", "Cardamom", "Ashwagandha"],
    price: "$24.99",
    benefits: ["Reduces inflammation", "Supports immune system", "Promotes better sleep", "Aids digestion"]
  },
  {
    id: 2,
    name: "Ashwagandha Stress Relief Capsules",
    image: "/images/ashwagandha-capsules.jpg",
    shortDescription: "Adaptogenic herb for natural stress management and energy",
    description: "Our Ashwagandha capsules contain pure, high-potency root extract to help your body adapt to stress naturally. Used for centuries in Ayurvedic medicine to promote vitality and mental clarity.",
    ingredients: ["Organic Ashwagandha Root Extract", "Vegetarian Capsule", "Rice Flour"],
    price: "$32.99",
    benefits: ["Reduces stress and anxiety", "Improves energy levels", "Enhances mental clarity", "Supports healthy sleep"]
  },
  {
    id: 3,
    name: "Triphala Digestive Wellness",
    image: "/images/triphala-powder.jpg",
    shortDescription: "Three-fruit blend for digestive health and detoxification",
    description: "Triphala, meaning 'three fruits,' is a cornerstone of Ayurvedic medicine. This powerful blend supports healthy digestion, gentle detoxification, and overall wellness.",
    ingredients: ["Amalaki (Amla)", "Bibhitaki", "Haritaki", "No additives or fillers"],
    price: "$19.99",
    benefits: ["Supports healthy digestion", "Gentle detoxification", "Rich in antioxidants", "Promotes regular elimination"]
  },
  {
    id: 4,
    name: "Brahmi Mind Clarity Tea",
    image: "/images/brahmi-tea.jpg",
    shortDescription: "Nootropic herbal tea for enhanced cognitive function",
    description: "Our Brahmi tea blend is formulated to enhance mental clarity, memory, and focus. This gentle yet effective combination supports cognitive function and nervous system health.",
    ingredients: ["Brahmi (Bacopa Monnieri)", "Gotu Kola", "Tulsi", "Lemon Balm", "Peppermint"],
    price: "$21.99",
    benefits: ["Enhances memory and focus", "Supports nervous system", "Promotes mental clarity", "Reduces mental fatigue"]
  },
  {
    id: 5,
    name: "Neem Skin Purifying Oil",
    image: "/images/neem-oil.jpg",
    shortDescription: "Pure neem oil for natural skin care and purification",
    description: "Cold-pressed from the seeds of the neem tree, this pure oil has been used in Ayurveda for centuries to maintain healthy, clear skin. Rich in fatty acids and antioxidants.",
    ingredients: ["100% Pure Cold-Pressed Neem Oil", "No additives", "Unrefined"],
    price: "$18.99",
    benefits: ["Purifies and cleanses skin", "Natural antibacterial properties", "Moisturizes dry skin", "Supports healthy complexion"]
  },
  {
    id: 6,
    name: "Chyawanprash Immunity Boost",
    image: "/images/chyawanprash.jpg",
    shortDescription: "Traditional Ayurvedic jam with 40+ herbs for immunity",
    description: "Our authentic Chyawanprash is a time-honored Ayurvedic formulation containing over 40 herbs and spices. This nutritious jam supports immunity, vitality, and overall health.",
    ingredients: ["Amla", "Ghee", "Honey", "Ashwagandha", "Shatavari", "Brahmi", "Plus 35+ other herbs"],
    price: "$29.99",
    benefits: ["Boosts immunity", "Increases energy and vitality", "Supports respiratory health", "Rich in antioxidants"]
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Ayurvedic Wellness - Natural Herbal Medicine',
    products: products.slice(0, 3) // Show first 3 products on home page
  });
});

app.get('/products', (req, res) => {
  res.render('products', { 
    title: 'Our Products - Ayurvedic Wellness',
    products: products 
  });
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).render('404', { title: 'Product Not Found' });
  }
  
  res.render('product-detail', { 
    title: `${product.name} - Ayurvedic Wellness`,
    product: product 
  });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});