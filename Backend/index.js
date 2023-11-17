const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));
dotenv.config();







const PORT = 3500;
  //CONNECT TO THE DB HERE
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connected successfuly'))
  .catch((err) => {
    console.log(err)
  })

  app.use(express.json());
  app.use('/', require('./routes/register'))
  app.use('/', require('./routes/auth'))

  app.listen(PORT, () => {
    console.log("Backend server is running!");
  });