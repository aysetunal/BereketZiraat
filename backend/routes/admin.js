const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bereket2025';
const TOKEN = crypto.createHash('sha256').update(ADMIN_USER + ':' + ADMIN_PASS).digest('hex');

const upload = multer({
  storage: multer.memoryStorage(),
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
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'bereket-ziraat', resource_type: 'image' },
    function (error, result) {
      if (error) return res.status(500).json({ message: error.message });
      res.json({ filename: result.secure_url });
    }
  );
  stream.end(req.file.buffer);
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

const Teklif = require('../models/Teklif');

router.get('/teklifler/csv', auth, async function (req, res) {
  try {
    const teklifler = await Teklif.find().sort({ createdAt: -1 });
    const headers = ['Tarih', 'Ad Soyad', 'Telefon', 'E-posta', 'Gübre Türü', 'Mesaj', 'Durum'];
    const rows = teklifler.map(function (t) {
      return [
        new Date(t.createdAt).toLocaleString('tr-TR'),
        t.ad || '',
        t.telefon || '',
        t.email || '',
        t.gubreTuru || '',
        (t.mesaj || '').replace(/[\r\n]+/g, ' '),
        t.okundu ? 'Okundu' : 'Yeni',
      ].map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',');
    });
    const csv = '﻿' + [headers.join(',')].concat(rows).join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="teklifler.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/teklifler', auth, async function (req, res) {
  try {
    const teklifler = await Teklif.find().sort({ createdAt: -1 });
    res.json(teklifler);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/teklifler/:id/oku', auth, async function (req, res) {
  try {
    const t = await Teklif.findByIdAndUpdate(req.params.id, { okundu: true }, { new: true });
    if (!t) return res.status(404).json({ message: 'Teklif bulunamadı' });
    res.json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/teklifler/:id', auth, async function (req, res) {
  try {
    const t = await Teklif.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: 'Teklif bulunamadı' });
    res.json({ message: 'Teklif silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
