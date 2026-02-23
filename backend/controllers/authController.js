import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import sendEmail from "../utils/sendEmail.js";


// REGISTER
export const register = async (req, res) => {
  const { name, surname, email, mobile, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const user = await User.create({
    name,
    surname,
    email,
    mobile,
    password: hashedPassword,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000,
    isVerified: false,
  });

  await sendEmail(email, otp);

  res.json({ message: "Registered. Verify OTP sent to email." });
};

// VERIFY EMAIL OTP
export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpiry < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({ message: "Email verified successfully" });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "User not found" });

  if (!user.isVerified)
    return res.status(400).json({ message: "Verify email first" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
};

// SEND LOGIN OTP
export const sendLoginOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "User not found" });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendEmail(email, otp);

  res.json({ message: "OTP sent for login" });
};

// VERIFY LOGIN OTP
export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpiry < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({ accessToken, refreshToken });
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "User not found" });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendEmail(email, otp);

  res.json({ message: "OTP sent for password reset" });
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpiry < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  res.json({ message: "Password reset successful" });
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({ refreshToken });
  if (!user)
    return res.status(403).json({ message: "Invalid token" });

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err) => {
    if (err)
      return res.status(403).json({ message: "Token expired" });

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("name surname email mobile");

  res.json(user);
};

