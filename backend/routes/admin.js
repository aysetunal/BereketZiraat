const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const Product = require('../models/Product');

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bereket2025';
const TOKEN = crypto.createHash('sha256').update(ADMIN_USER + ':' + ADMIN_PASS).digest('hex');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../brand_assets/images'),
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + ext);
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Sadece görsel dosyası kabul edilir'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

function auth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.replace('Bearer ', '');
  if (token === TOKEN) return next();
  res.status(401).json({ message: 'Yetkisiz erişim' });
}

router.post('/login', function (req, res) {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ token: TOKEN });
  }
  res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
});

router.post('/upload', auth, upload.single('image'), function (req, res) {
  if (!req.file) return res.status(400).json({ message: 'Dosya yüklenemedi' });
  res.json({ filename: req.file.filename });
});

router.post('/products', auth, async function (req, res) {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/products/:id', auth, async function (req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/products/:id', auth, async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });
    res.json({ message: 'Ürün silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
