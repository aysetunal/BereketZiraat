require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const productRoutes = require('./routes/products');
const adminRoutes   = require('./routes/admin');
const teklifRoutes  = require('./routes/teklif');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teklif', teklifRoutes);

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err.message);
    process.exit(1);
  }
})();
