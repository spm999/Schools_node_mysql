const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5172;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/schoolImages', express.static('schoolImages'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'schools',
});
  

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(express.json());

app.post('/add-school', (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const image = req.files.image;
  const uploadPath = path.join(__dirname, 'schoolImages', image.name);

  image.mv(uploadPath, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const sql =
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sql,
      [name, address, city, state, contact, image.name, email_id],
      (dbErr, result) => {
        if (dbErr) {
          console.error('Error adding school to MySQL:', dbErr);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('School added to MySQL:', result);
          res.status(200).json({ message: 'School added successfully' });
        }
      }
    );
  });
});


app.get('/show-school', (req, res) => {
  const sql = 'SELECT * FROM schools';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching schools from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Schools fetched from MySQL:', results);
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
