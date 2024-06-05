const express = require('express');
const multer = require('multer');
const supabase = require('./supabaseClient');
const { BUCKET_NAME } = require('./constants');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`public/images/${originalname}`, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: req.file.mimetype
      });

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'File uploaded successfully', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
