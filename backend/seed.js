const connectDB = require('./db');
const Product = require('./models/Product');

const products = [
  {
    name: 'Calibre Ca++B',
    brand: 'Calibre',
    category: 'Kalsiyum & Bor',
    shortDesc: 'Kalsiyum ve bor içerikli yaprak gübresi',
    longDesc: 'Calibre Ca++B, bitkinin kritik gelişim dönemlerinde kalsiyum ve bor eksikliğini gidermek için formüle edilmiş yaprak uygulama gübresidir.',
    specs: [
      { label: 'Kalsiyum (CaO)', value: '%15' },
      { label: 'Bor (B)', value: '%0,3' },
    ],
    dose: '200-300 ml / 100 L su',
    packaging: '1 L, 5 L',
    image: '',
    isNewProduct: true,
    inStock: true,
  },
  {
    name: 'Cupra XCu7',
    brand: 'Cupra',
    category: 'Mikro Elementler',
    shortDesc: 'Yüksek konsantrasyonlu bakır yaprak gübresi',
    longDesc: 'Cupra XCu7, bitkisel bakır ihtiyacını karşılamak ve fungisidal destekli etki sağlamak amacıyla geliştirilmiş mikro element gübresidir.',
    specs: [
      { label: 'Bakır (Cu)', value: '%7' },
      { label: 'Formülasyon', value: 'Sıvı' },
    ],
    dose: '150-250 ml / 100 L su',
    packaging: '1 L, 5 L, 20 L',
    image: '',
    isNewProduct: false,
    inStock: true,
  },
  {
    name: 'Ritmo NC',
    brand: 'Ritmo',
    category: 'Azot & Fosfor',
    shortDesc: 'Azot ve fosfor dengeli büyüme gübresi',
    longDesc: 'Ritmo NC, vejetatif büyüme döneminde azot ve fosfor desteği sağlayan, köklendirme ve sürgün gelişimini hızlandıran sıvı gübredir.',
    specs: [
      { label: 'Azot (N)', value: '%8' },
      { label: 'Fosfor (P2O5)', value: '%12' },
    ],
    dose: '3-5 L / dönüm (damla sulama)',
    packaging: '5 L, 20 L',
    image: '',
    isNewProduct: false,
    inStock: true,
  },
  {
    name: 'Ser Phos ZnB',
    brand: 'Ser',
    category: 'Mikro Elementler',
    shortDesc: 'Fosfor, çinko ve bor kombinasyonu',
    longDesc: 'Ser Phos ZnB, fosfor aktivasyonunu artırırken çinko ve bor eksikliğini aynı anda gideren, çiçeklenme ve meyve tutumuna destek veren kompleks bir yaprak gübresidir.',
    specs: [
      { label: 'Fosfor (P2O5)', value: '%20' },
      { label: 'Çinko (Zn)', value: '%2' },
      { label: 'Bor (B)', value: '%0,5' },
    ],
    dose: '250-400 ml / 100 L su',
    packaging: '1 L, 5 L',
    image: '',
    isNewProduct: true,
    inStock: true,
  },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  const inserted = await Product.insertMany(products);
  console.log(`${inserted.length} ürün eklendi:`);
  inserted.forEach(p => console.log(`  - ${p.name} (${p._id})`));
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed hatası:', err);
  process.exit(1);
});
