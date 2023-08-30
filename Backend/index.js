const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // Add this line for bcrypt
const User = require('./user.js')
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

//const SECRET = 'SECr3t';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/signup_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "signup_db"
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(() => {
  console.log("Failed to connect to MongoDB");
});

app.get('/protected',authMiddleware,(req,res)=>{
    res.status(200).json({message:'This is a protected route'});
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h'
        });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
