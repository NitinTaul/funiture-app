import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    surname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message:
          "Mobile number must be 10 digits and start with 6, 7, 8, or 9",
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    otp: String,
    otpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,

    likedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;