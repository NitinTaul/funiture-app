import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import sendEmail from "../utils/sendEmail.js";
import TempOtp from "../models/TempOtp.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, surname, email, mobile, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      mobile,
      password: hashedPassword,
      isVerified: true,   // ✅ already verified via OTP before this step
    });

    res.json({ message: "Registered successfully." });

  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};
// VERIFY EMAIL OTP
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ✅ Check TempOtp, NOT User
    const record = await TempOtp.findOne({ email });

    console.log("TempOtp record:", record)  // ← add this to debug
    console.log("OTP received:", otp)       // ← add this to debug

    if (!record || record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (record.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    await TempOtp.deleteOne({ email });

    res.json({ message: "Email verified successfully" });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
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
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
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
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
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

// Store OTPs temporarily in memory (or use Redis/DB for production)
const emailOtpStore = {}

// SEND OTP before registration (just to verify email is real)
export const sendEmailOtpPreRegister = async (req, res) => {
  try {
    const { email } = req.body

    if (!email)
      return res.status(400).json({ message: "Email is required." })

    // Check if already registered
    const existing = await User.findOne({ email })
    if (existing)
      return res.status(400).json({ message: "This email is already registered." })

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });


    // Store OTP with 5 min expiry
    emailOtpStore[email] = {
      otp,
      expiry: Date.now() + 5 * 60 * 1000,
    }

    await sendEmail(email, otp)

    res.json({ message: "OTP sent to email." })
  } catch (err) {
    console.error("sendEmailOtpPreRegister error:", err.message)
    res.status(500).json({ message: "Failed to send OTP. Check your email address." })
  }
}

// VERIFY OTP before registration
export const verifyEmailOtpPreRegister = async (req, res) => {
  try {
    const { email, otp } = req.body

    const record = emailOtpStore[email]

    if (!record)
      return res.status(400).json({ message: "No OTP found. Please request a new one." })

    if (Date.now() > record.expiry) {
      delete emailOtpStore[email]
      return res.status(400).json({ message: "OTP has expired. Please request a new one." })
    }

    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP. Please try again." })

    // OTP correct — clear it
    delete emailOtpStore[email]

    res.json({ message: "Email verified successfully." })
  } catch (err) {
    console.error("verifyEmailOtpPreRegister error:", err.message)
    res.status(500).json({ message: "Verification failed." })
  }
}


// SEND EMAIL OTP ONLY (pre-registration check)
export const sendEmailOtpOnly = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("📧 Sending OTP to:", email)

    const existing = await User.findOne({ email, isVerified: true });
    if (existing)
      return res.status(400).json({ message: "Email already registered." });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    // ✅ Delete old + create fresh — more reliable than findOneAndUpdate
    await TempOtp.deleteOne({ email })
    const newRecord = await TempOtp.create({
      email,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    })

    console.log("✅ TempOtp created:", newRecord)  // must print this

    await sendEmail(email, otp);
    res.json({ message: "OTP sent to email." });

  } catch (err) {
    console.error("❌ SEND OTP ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};