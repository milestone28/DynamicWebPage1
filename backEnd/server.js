require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json()); //it will look any data or body requestose

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listend for request
    app.listen(PORT, () => {
      console.log(`connected to DB & listenning on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
