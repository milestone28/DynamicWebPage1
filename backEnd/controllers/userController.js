const User = require("../models/user");
const mongoose = require("mongoose");

// create user
const createUser = async (req, res) => {
  const { firstName, lastName, address, email, mobileNumber } = req.body;
  let emptyFields = [];

  //handle front end errors
  if (!firstName) {
    emptyFields.push("First Name");
  }
  if (!lastName) {
    emptyFields.push("Last Name");
  }
  if (!email) {
    emptyFields.push("Email");
  }
  if (!mobileNumber) {
    emptyFields.push("Mobile Number");
  }
  if (!address) {
    emptyFields.push("Address");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const fullnameExist = await User.findOne({firstName, lastName});
  if(fullnameExist)
    return res
      .status(400)
      .json({ error: "User Name already exist."});

  try {
    const user = await User.create({firstName, lastName, address, email, mobileNumber});
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get user
const getUser = async (req, res) => {
  const  id  = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  const id  = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }

   const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update a user
const updateUser = async (req, res) => {
  const id  = req.params.id;
  const { firstName, lastName, address, email, mobileNumber } = req.body;
  let emptyFields = [];

  //handle front end errors
  if (!firstName) {
    emptyFields.push("First Name");
  }
  if (!lastName) {
    emptyFields.push("Last Name");
  }
  if (!email) {
    emptyFields.push("Email");
  }
  if (!mobileNumber) {
    emptyFields.push("Mobile Number");
  }
  if (!address) {
    emptyFields.push("Address");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const fullnameExist = await User.findOne({firstName, lastName});
  if(fullnameExist)
    return res
      .status(400)
      .json({ error: "User Name already exist."});

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body, //this will get all the body request and update example the title, reps,
      }
    );

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }

    return res.status(200).json({firstName, lastName, address, email, mobileNumber});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
}
