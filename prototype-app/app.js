const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // directory for temporary file storage
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');


const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if MongoDB connection fails
  });



mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML files in the "public" folder)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test-db', async (req, res) => {
  try {
    const testUser = new User({ username: 'testuser1', password: 'testpass' });
    await testUser.save();
    res.json({ message: 'Test user created successfully' });
  } catch (error) {
    console.error('Error during test DB operation:', error);  // Log the error to the console
    res.status(500).json({ error: 'Server error' });
  }
});


// User model
const User = require('./models/User');  

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/signup', async (req, res) => {
  console.log('Headers:', req.headers);  
  console.log('Request body:', req.body);  

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password are required' });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




// user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded.id;  // Attach user ID to request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

//protected route with token
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route, accessible only with a valid token' });
});

app.post('/api/logout', (req, res) => {
  // TODO:Perform any session cleanup if necessary
  res.json({ message: 'User logged out successfully' });
});


app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//test endpoint for wav2lip
app.post('/api/wav2lip', upload.fields([{ name: 'face' }, { name: 'audio' }]), async (req, res) => {
  try {
    const faceFile = req.files['face'][0];
    const audioFile = req.files['audio'][0];

    // form-data to send the files to the Wav2Lip API
    const formData = new FormData();
    formData.append('face', fs.createReadStream(faceFile.path));
    formData.append('audio', fs.createReadStream(audioFile.path));

    // Wav2Lip API
    const response = await axios.post('http://127.0.0.1:8000/generate/', formData, {
      headers: formData.getHeaders()
    });

    // clean temp files
    fs.unlinkSync(faceFile.path);
    fs.unlinkSync(audioFile.path);

    res.json({
      message: 'Inference completed',
      output: response.data.output  // video path returned by the Wav2Lip API?
    });
  } catch (error) {
    console.error('Error calling Wav2Lip API:', error);
    res.status(500).json({ error: 'Error processing the video' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
