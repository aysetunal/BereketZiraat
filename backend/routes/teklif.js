const router = require('express').Router();
const Teklif = require('../models/Teklif');

router.post('/', async function (req, res) {
  try {
    const { ad, telefon, email, gubreTuru, mesaj } = req.body;
    if (!ad || !ad.trim()) return res.status(400).json({ message: 'Ad Soyad zorunludur.' });
    await new Teklif({ ad: ad.trim(), telefon, email, gubreTuru, mesaj }).save();
    res.status(201).json({ message: 'Talebiniz alındı, en kısa sürede size dönüş yapacağız.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
