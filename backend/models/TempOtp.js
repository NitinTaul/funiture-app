import mongoose from "mongoose";

const tempOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp:   { type: String, required: true },
  otpExpiry: { type: Date, required: true },
})

export default mongoose.model("TempOtp", tempOtpSchema);