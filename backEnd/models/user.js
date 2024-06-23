const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from both ends of the string
    minlength: 2, // Minimum length of 2 characters
    maxlength: 50, // Maximum length of 50 characters
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); // Regex to allow only letters and spaces
      },
      message: (props) => `${props.value} is not a valid firstName!`,
    },
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); // Regex to allow only letters and spaces
      },
      message: (props) => `${props.value} is not a valid lastName!`,
    },
  },

  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [5, "Address must be at least 5 characters long"],
    maxlength: [100, "Address must be less than 100 characters long"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },

  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    minLength: [9, "Mobile number should have minimum 9 digits"],
    maxLength: [11, "Mobile number should have maximum 11 digits"],
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v);  // Regular expression to match exactly 11 digits
      },
      message: props => `${props.value} is not a valid Mobile number! Must be exactly 11 digits.`
    },
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema);
