const express = require('express');
const multer = require('multer');
const path = require('path');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use('/upload', express.static(path.join(__dirname, '../client/public/upload')));


app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend origin
    credentials: true
}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../client/public/upload'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Using path.extname to safely get the file extension
    }
});

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', usersRoutes);



app.listen(8080, () => {
    console.log('server is running on port 8080');
})