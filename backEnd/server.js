require('dotenv').config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json()); //it will look any data or body requestose
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/",(req,res) => {
  res.send('This is API for The Contacts')
})
app.use("/api", userRoutes);

// connect to DB
mongoose
  .connect(process.env.FB_DATABASE_URL)
  .then(() => {
    // listend for request
    app.listen(PORT, () => {
      console.log(`connected to DB & listenning on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
