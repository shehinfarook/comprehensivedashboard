const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/intern_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.get('/', (req, res) => res.send('Intern Dashboard Backend Running'));

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/intern', require('./routes/intern'));
app.use('/api/admin', upload.single('file'), require('./routes/admin'));
app.use('/admin', require('./routes/admin'));
app.use('/api/notification', require('./routes/notification'));
app.use('/api/chat', require('./routes/chat'));

app.listen(5000, () => console.log('Server running on port 5000'));
