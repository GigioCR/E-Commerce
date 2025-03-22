const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./auth/routes/authRoutes');
const productRoutes = require('./products/routes/productRoutes')
const ordersRoutes = require('./orders/routes/orderRoutes');
const paymentRoutes = require('./payment/routes/paymentRoutes');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders',ordersRoutes);
app.use('/payment', paymentRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});