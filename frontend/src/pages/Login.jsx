import {
  Box, Button, Input, Heading, VStack, Text, Link,
  HStack, InputGroup, InputLeftElement, InputRightElement,
  IconButton, FormControl, FormErrorMessage, Divider, useToast,
} from "@chakra-ui/react"
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../contexts/AuthContext"

const OtpBoxes = ({ value, onChange, idPrefix }) => {
  const refs = useRef([])
  return (
    <HStack spacing={2} justify="center" w="full">
      {[0,1,2,3,4,5].map((i) => (
        <Input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          textAlign="center"
          fontSize="xl"
          fontWeight="bold"
          borderRadius="lg"
          focusBorderColor="#60382f"
          h="50px"
          p={0}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "")
            if (!val) return
            const arr = (value + "      ").slice(0, 6).split("")
            arr[i] = val[0]
            onChange(arr.join(""))
            if (i < 5) refs.current[i + 1]?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              const arr = (value + "      ").slice(0, 6).split("")
              arr[i] = " "
              onChange(arr.join(""))
              if (i > 0) refs.current[i - 1]?.focus()
            }
          }}
          onPaste={(e) => {
            e.preventDefault()
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
            onChange(pasted.padEnd(6, " "))
            const lastIndex = Math.min(pasted.length, 5)
            refs.current[lastIndex]?.focus()
          }}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </HStack>
  )
}

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const toast = useToast()

  const [mode, setMode] = useState("password")

  // Password login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // OTP login
  const [otpEmail, setOtpEmail] = useState("")
  const [otp, setOtp] = useState("      ")
  const [otpSent, setOtpSent] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotOtp, setForgotOtp] = useState("      ")
  const [newPassword, setNewPassword] = useState("")
  const [forgotStep, setForgotStep] = useState("email")
  const [forgotLoading, setForgotLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [errors, setErrors] = useState({})

  const handleLogin = async () => {
    const newErrors = {}
    if (!email.trim()) newErrors.email = "Email is required."
    if (!password.trim()) newErrors.password = "Password is required."
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }
    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      login(res.data)
      toast({ title: "Welcome back! 👋", status: "success", duration: 2000 })
      nav("/")
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password."
      toast({ title: "Login Failed", description: msg, status: "error", duration: 3000 })
    }
    setLoading(false)
  }

  const sendLoginOtp = async () => {
    if (!otpEmail.trim()) { setErrors({ otpEmail: "Enter your email." }); return }
    setOtpLoading(true)
    try {
      await api.post("/auth/send-login-otp", { email: otpEmail })
      setOtpSent(true)
      setOtp("      ")
      toast({ title: "OTP sent to your email!", status: "success", duration: 3000 })
    } catch (err) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to send OTP.", status: "error", duration: 3000 })
    }
    setOtpLoading(false)
  }

  const verifyLoginOtp = async () => {
    const cleanOtp = otp.trim()
    if (cleanOtp.length < 6) { setErrors({ otp: "Enter the full 6-digit OTP." }); return }
    setVerifyLoading(true)
    try {
      const res = await api.post("/auth/verify-login-otp", { email: otpEmail, otp: cleanOtp })
      login(res.data)
      toast({ title: "Welcome back! 👋", status: "success", duration: 2000 })
      nav("/")
    } catch (err) {
      setErrors({ otp: err.response?.data?.message || "Invalid or expired OTP." })
    }
    setVerifyLoading(false)
  }

  const sendForgotOtp = async () => {
    if (!forgotEmail.trim()) { setErrors({ forgotEmail: "Enter your email." }); return }
    setForgotLoading(true)
    try {
      await api.post("/auth/forgot-password", { email: forgotEmail })
      setForgotStep("otp")
      toast({ title: "OTP sent to your email!", status: "success", duration: 3000 })
    } catch (err) {
      toast({ title: "Error", description: err.response?.data?.message || "Email not found.", status: "error", duration: 3000 })
    }
    setForgotLoading(false)
  }

  const verifyForgotOtp = () => {
    if (forgotOtp.trim().length < 6) { setErrors({ forgotOtp: "Enter the full 6-digit OTP." }); return }
    setErrors({})
    setForgotStep("reset")
  }

  const resetPassword = async () => {
    if (!newPassword || newPassword.length < 6) { setErrors({ newPassword: "Min 6 characters." }); return }
    setForgotLoading(true)
    try {
      await api.post("/auth/reset-password", { email: forgotEmail, otp: forgotOtp.trim(), newPassword })
      toast({ title: "Password reset successfully! ✅", status: "success", duration: 3000 })
      setMode("password"); setForgotStep("email")
      setForgotEmail(""); setForgotOtp("      "); setNewPassword("")
    } catch (err) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to reset.", status: "error", duration: 3000 })
    }
    setForgotLoading(false)
  }

  const titles = {
    password: ["Welcome Back", "Login to your account"],
    otp:      ["Login with OTP", "We'll send a code to your email"],
    forgot:   ["Reset Password", "Reset your account password"],
  }

  return (
    <Box minH="100vh" bg="#60382f" display="flex" justifyContent="center" alignItems="center" py={8} px={4}>
      <Box w="100%" maxW="460px" bg="white" borderRadius="2xl" boxShadow="2xl" overflow="hidden">

        <Box bg="#60382f" py={6} textAlign="center">
          <Heading color="white" fontSize="2xl" letterSpacing="wide">{titles[mode][0]}</Heading>
          <Text color="whiteAlpha.700" fontSize="sm" mt={1}>{titles[mode][1]}</Text>
        </Box>

        <Box p={8}>
          <VStack spacing={5}>

            {/* ══ PASSWORD LOGIN ══ */}
            {mode === "password" && (<>
              <FormControl isInvalid={!!errors.email}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none"><EmailIcon color="gray.400" /></InputLeftElement>
                  <Input placeholder="Email Address" value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })) }}
                    borderRadius="lg" focusBorderColor="#60382f" />
                </InputGroup>
                <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none"><LockIcon color="gray.400" /></InputLeftElement>
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })) }}
                    borderRadius="lg" focusBorderColor="#60382f" pl="40px" />
                  <InputRightElement>
                    <IconButton variant="ghost" size="sm" aria-label="Toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
              </FormControl>

              <Box w="full" textAlign="right" mt={-2}>
                <Link color="#60382f" fontSize="sm" fontWeight="semibold"
                  onClick={() => { setMode("forgot"); setErrors({}) }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button w="full" bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }} borderRadius="lg"
                size="lg" onClick={handleLogin} isLoading={loading} loadingText="Logging in...">
                Login
              </Button>

              <HStack w="full">
                <Divider /><Text fontSize="xs" color="gray.400" whiteSpace="nowrap" px={2}>OR</Text><Divider />
              </HStack>

              <Button w="full" variant="outline" borderColor="#60382f" color="#60382f"
                _hover={{ bg: "#60382f", color: "white" }} borderRadius="lg" size="lg"
                onClick={() => { setMode("otp"); setErrors({}) }}>
                Login with OTP
              </Button>

              <HStack justify="center">
                <Text fontSize="sm" color="gray.500">Don't have an account?</Text>
                <Link color="#60382f" fontWeight="semibold" fontSize="sm" onClick={() => nav("/signup")}>
                  Register here
                </Link>
              </HStack>
            </>)}

            {/* ══ OTP LOGIN ══ */}
            {mode === "otp" && (<>
              <FormControl isInvalid={!!errors.otpEmail}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none"><EmailIcon color="gray.400" /></InputLeftElement>
                  <Input placeholder="Email Address" value={otpEmail}
                    onChange={(e) => { setOtpEmail(e.target.value); setOtpSent(false); setOtp("      "); setErrors({}) }}
                    borderRadius="lg" focusBorderColor="#60382f"
                    isReadOnly={otpSent} bg={otpSent ? "gray.50" : "white"} pr="95px" />
                  <InputRightElement w="90px" pr={1}>
                    <Button size="xs" bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }}
                      borderRadius="md" onClick={sendLoginOtp} isLoading={otpLoading}
                      isDisabled={!otpEmail} fontSize="11px" px={3}>
                      {otpSent ? "Resend" : "Send OTP"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage fontSize="xs">{errors.otpEmail}</FormErrorMessage>
              </FormControl>

              {otpSent && (<>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Enter OTP sent to <b>{otpEmail}</b>
                </Text>
                <FormControl isInvalid={!!errors.otp}>
                  <OtpBoxes value={otp} onChange={setOtp} idPrefix="login-otp" />
                  <FormErrorMessage fontSize="xs" mt={1}>{errors.otp}</FormErrorMessage>
                </FormControl>
                <Button w="full" bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }} borderRadius="lg"
                  size="lg" onClick={verifyLoginOtp} isLoading={verifyLoading} loadingText="Verifying...">
                  Verify & Login
                </Button>
              </>)}

              <Link color="#60382f" fontSize="sm" fontWeight="semibold"
                onClick={() => { setMode("password"); setErrors({}); setOtpSent(false); setOtp("      ") }}>
                ← Back to Password Login
              </Link>
            </>)}

            {/* ══ FORGOT PASSWORD ══ */}
            {mode === "forgot" && (<>
              {forgotStep === "email" && (
                <FormControl isInvalid={!!errors.forgotEmail}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none"><EmailIcon color="gray.400" /></InputLeftElement>
                    <Input placeholder="Enter your registered email" value={forgotEmail}
                      onChange={(e) => { setForgotEmail(e.target.value); setErrors({}) }}
                      borderRadius="lg" focusBorderColor="#60382f" />
                  </InputGroup>
                  <FormErrorMessage fontSize="xs">{errors.forgotEmail}</FormErrorMessage>
                  <Button w="full" mt={4} bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }}
                    borderRadius="lg" size="lg" onClick={sendForgotOtp}
                    isLoading={forgotLoading} loadingText="Sending OTP...">
                    Send Reset OTP
                  </Button>
                </FormControl>
              )}

              {forgotStep === "otp" && (<>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Enter OTP sent to <b>{forgotEmail}</b>
                </Text>
                <FormControl isInvalid={!!errors.forgotOtp}>
                  <OtpBoxes value={forgotOtp} onChange={setForgotOtp} idPrefix="forgot-otp" />
                  <FormErrorMessage fontSize="xs" mt={1}>{errors.forgotOtp}</FormErrorMessage>
                </FormControl>
                <Button w="full" bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }}
                  borderRadius="lg" size="lg" onClick={verifyForgotOtp}>
                  Verify OTP
                </Button>
              </>)}

              {forgotStep === "reset" && (
                <FormControl isInvalid={!!errors.newPassword}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none"><LockIcon color="gray.400" /></InputLeftElement>
                    <Input type={showNewPassword ? "text" : "password"}
                      placeholder="New password (min 6 chars)" value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setErrors({}) }}
                      borderRadius="lg" focusBorderColor="#60382f" pl="40px" />
                    <InputRightElement>
                      <IconButton variant="ghost" size="sm" aria-label="Toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />} />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontSize="xs">{errors.newPassword}</FormErrorMessage>
                  <Button w="full" mt={4} bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }}
                    borderRadius="lg" size="lg" onClick={resetPassword}
                    isLoading={forgotLoading} loadingText="Resetting...">
                    Reset Password
                  </Button>
                </FormControl>
              )}

              <Link color="#60382f" fontSize="sm" fontWeight="semibold"
                onClick={() => { setMode("password"); setForgotStep("email"); setErrors({}) }}>
                ← Back to Login
              </Link>
            </>)}

          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
