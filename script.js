const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Dummy search endpoint
app.get('/search', (req, res) => {
  const query = req.query.q;
  // Simulated response based on the query
  const results = [
    { content: `Result for "${query}"`, image: 'path/to/image.jpg' }
  ];
  res.json(results);
});

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  console.log('Uploaded file:', req.file);
  // Simulated response for uploaded image processing
  res.json({ success: true, searchQuery: 'Processed image result' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
