const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

//middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
  'https://sanglq1255.id.vn',
  'http://localhost:5173',
  'https://webbanhang-lequangsang.vercel.app', // Miền chính
  'https://webbanhang-lequangsang-*.vercel.app' // Miền tạm thời của Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS không được phép từ origin này'));
    }
  },
  credentials: true
}));

//image upload
const uploadImage = require("./src/utils/uploadImage");

// all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewsRoutes = require('./src/reviews/reviews.router');
const ordersRoutes = require('./src/orders/orders.route');
const statsRoutes = require('./src/stats/stats.router');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/stats', statsRoutes);

main().then(() => console.log("Kết nối mongodb thành công."))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get('/', (req, res) => {
    res.send('server đang hoạt động')
  });
}

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => {
      res.send(url)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.listen(port, () => {
  console.log(`cổng http://localhost:${port}`)
});
