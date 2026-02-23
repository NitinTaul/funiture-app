import {
  Box, Button, Input, Heading, VStack, Text, Link,
  HStack, InputGroup, InputLeftElement, InputRightElement,
  IconButton, FormControl, FormErrorMessage, FormHelperText,
  Badge, useToast,
} from "@chakra-ui/react"
import {
  ViewIcon, ViewOffIcon, CheckCircleIcon, EmailIcon, PhoneIcon, LockIcon,
} from "@chakra-ui/icons"
import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

// ─── Allowed Email Domains ───────────────────────────────────────
const ALLOWED_DOMAINS = [
  "gmail.com","yahoo.com","yahoo.in","yahoo.co.in","yahoo.co.uk",
  "hotmail.com","hotmail.in","hotmail.co.uk","outlook.com","outlook.in",
  "icloud.com","protonmail.com","rediffmail.com",
]
const DISPOSABLE_DOMAINS = [
  "mailinator.com","tempmail.com","guerrillamail.com","10minutemail.com",
  "throwam.com","yopmail.com","trashmail.com","fakeinbox.com",
  "sharklasers.com","dispostable.com","maildrop.cc","temp-mail.org",
  "getnada.com","mailnull.com",
]

const validateEmailDomain = (email) => {
  const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formatRegex.test(email)) return { valid: false, message: "Enter a valid email address." }
  const domain = email.split("@")[1]?.toLowerCase()
  if (DISPOSABLE_DOMAINS.includes(domain)) return { valid: false, message: "Disposable emails are not allowed." }
  if (!ALLOWED_DOMAINS.includes(domain)) return { valid: false, message: "Use Gmail, Yahoo, Hotmail or Outlook only." }
  return { valid: true, message: "" }
}

const getPasswordStrength = (password) => {
  if (!password) return null
  if (password.length < 6) return { label: "Too short", color: "red.400", percent: 20 }
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))
    return { label: "Strong", color: "green.500", percent: 100 }
  if (password.length >= 6 && /[0-9]/.test(password))
    return { label: "Medium", color: "orange.400", percent: 60 }
  return { label: "Weak", color: "red.400", percent: 30 }
}

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

export default function Signup() {
  const nav = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState({
    name: "", surname: "", email: "", mobile: "", password: "", confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // OTP state
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("      ")
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [verifyLoading, setVerifyLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === "email") {
      setOtpSent(false); setOtpVerified(false); setOtp("      "); setOtpError("")
      if (value.includes("@")) {
        const { valid, message } = validateEmailDomain(value)
        setErrors((prev) => ({ ...prev, email: valid ? "" : message }))
      } else {
        setErrors((prev) => ({ ...prev, email: "" }))
      }
    }
    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value && value !== form.password ? "Passwords do not match." : "",
      }))
    }
    if (!["email", "confirmPassword"].includes(name))
      setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const sendEmailOtp = async () => {
    const { valid, message } = validateEmailDomain(form.email)
    if (!valid) { setErrors((prev) => ({ ...prev, email: message })); return }
    setOtpLoading(true)
    try {
      await api.post("/auth/send-email-otp", { email: form.email })
      setOtpSent(true)
      setOtp("      ")
      toast({ title: "OTP sent to your email!", status: "success", duration: 3000, isClosable: true })
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: err.response?.data?.message || "Failed to send OTP." }))
    }
    setOtpLoading(false)
  }

  const verifyOtp = async () => {
    const cleanOtp = otp.trim()
    if (cleanOtp.length < 6) { setOtpError("Enter the full 6-digit OTP."); return }
    setVerifyLoading(true)
    try {
      await api.post("/auth/verify-email", { email: form.email, otp: cleanOtp })
      setOtpVerified(true)
      setOtpError("")
      toast({ title: "Email verified! ✅", status: "success", duration: 3000, isClosable: true })
    } catch (err) {
      setOtpError(err.response?.data?.message || "Invalid or expired OTP.")
    }
    setVerifyLoading(false)
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "First name is required."
    if (!form.surname.trim()) newErrors.surname = "Surname is required."
    if (!form.email.trim()) {
      newErrors.email = "Email is required."
    } else {
      const { valid, message } = validateEmailDomain(form.email)
      if (!valid) newErrors.email = message
    }
    if (!otpVerified) newErrors.email = "Please verify your email first."
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required."
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number."
    }
    if (!form.password) {
      newErrors.password = "Password is required."
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters."
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password."
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      await api.post("/auth/register", {
        name: form.name, surname: form.surname,
        email: form.email, mobile: form.mobile, password: form.password,
      })
      toast({ title: "Account created! 🎉", description: "Please login.", status: "success", duration: 3000, isClosable: true })
      nav("/login")
    } catch (err) {
      toast({ title: "Error", description: err.response?.data?.message || "Registration failed", status: "error", duration: 3000 })
    }
    setLoading(false)
  }

  const passwordStrength = getPasswordStrength(form.password)
  const passwordsMatch = form.confirmPassword && form.password === form.confirmPassword

  return (
    <Box minH="100vh" bg="#649ca9" display="flex" justifyContent="center" alignItems="center" py={8} px={4}>
      <Box w="100%" maxW="520px" bg="white" borderRadius="2xl" boxShadow="2xl" overflow="hidden">

        {/* Header */}
        <Box bg="#60382f" py={6} textAlign="center">
          <Heading color="white" fontSize="2xl" letterSpacing="wide">Create Account</Heading>
          <Text color="whiteAlpha.700" fontSize="sm" mt={1}>Join us today — it's free!</Text>
        </Box>

        <Box p={8}>
          <VStack spacing={5}>

            {/* Name + Surname */}
            <HStack spacing={3} w="full">
              <FormControl isInvalid={!!errors.name}>
                <Input name="name" placeholder="First Name" value={form.name}
                  onChange={handleChange} borderRadius="lg" focusBorderColor="#60382f" />
                <FormErrorMessage fontSize="xs">{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.surname}>
                <Input name="surname" placeholder="Surname" value={form.surname}
                  onChange={handleChange} borderRadius="lg" focusBorderColor="#60382f" />
                <FormErrorMessage fontSize="xs">{errors.surname}</FormErrorMessage>
              </FormControl>
            </HStack>

            {/* Email with Verify button */}
            <FormControl isInvalid={!!errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {otpVerified ? <CheckCircleIcon color="green.500" /> : <EmailIcon color="gray.400" />}
                </InputLeftElement>
                <Input name="email" placeholder="Email Address" value={form.email}
                  onChange={handleChange} borderRadius="lg" focusBorderColor="#60382f"
                  isReadOnly={otpVerified} bg={otpVerified ? "green.50" : "white"} pr="90px" />
                <InputRightElement w="85px" pr={1}>
                  {otpVerified ? (
                    <Badge colorScheme="green" borderRadius="md" px={2} py={1} fontSize="xs">✅ Verified</Badge>
                  ) : (
                    <Button size="xs" bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }}
                      borderRadius="md" onClick={sendEmailOtp} isLoading={otpLoading}
                      isDisabled={!form.email || !!errors.email} fontSize="11px" px={3}>
                      {otpSent ? "Resend" : "Verify"}
                    </Button>
                  )}
                </InputRightElement>
              </InputGroup>
              {errors.email ? (
                <FormErrorMessage fontSize="xs">{errors.email}</FormErrorMessage>
              ) : (
                !otpVerified && form.email.includes("@") && !errors.email && (
                  <FormHelperText fontSize="xs" color="green.500">✅ Valid email — click Verify to confirm</FormHelperText>
                )
              )}
            </FormControl>

            {/* OTP Boxes — shown after Send OTP */}
            {otpSent && !otpVerified && (
              <FormControl isInvalid={!!otpError}>
                <Text fontSize="xs" color="gray.500" mb={2} textAlign="center">
                  Enter OTP sent to <b>{form.email}</b>
                </Text>
                <OtpBoxes value={otp} onChange={setOtp} idPrefix="signup-otp" />
                {otpError ? (
                  <FormErrorMessage fontSize="xs" mt={1}>{otpError}</FormErrorMessage>
                ) : (
                  <FormHelperText fontSize="xs" color="gray.500" mt={1}>
                    Check your inbox/spam for the 6-digit OTP
                  </FormHelperText>
                )}
                <Button w="full" mt={3} bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }}
                  borderRadius="lg" onClick={verifyOtp} isLoading={verifyLoading} loadingText="Checking">
                  Confirm OTP
                </Button>
              </FormControl>
            )}

            {/* Mobile */}
            <FormControl isInvalid={!!errors.mobile}>
              <InputGroup>
                <InputLeftElement pointerEvents="none"><PhoneIcon color="gray.400" /></InputLeftElement>
                <Input name="mobile" placeholder="Mobile Number (10 digits)" value={form.mobile}
                  onChange={handleChange} maxLength={10} borderRadius="lg" focusBorderColor="#60382f" />
              </InputGroup>
              <FormErrorMessage fontSize="xs">{errors.mobile}</FormErrorMessage>
            </FormControl>

            {/* Password */}
            <FormControl isInvalid={!!errors.password}>
              <InputGroup>
                <InputLeftElement pointerEvents="none"><LockIcon color="gray.400" /></InputLeftElement>
                <Input name="password" type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 characters)" value={form.password}
                  onChange={handleChange} borderRadius="lg" focusBorderColor="#60382f" pl="40px" />
                <InputRightElement>
                  <IconButton variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} aria-label="Toggle password" />
                </InputRightElement>
              </InputGroup>
              {errors.password ? (
                <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
              ) : (
                passwordStrength && (
                  <Box mt={2}>
                    <Box h="4px" borderRadius="full" bg="gray.100">
                      <Box h="4px" borderRadius="full" bg={passwordStrength.color}
                        w={`${passwordStrength.percent}%`} transition="width 0.3s ease" />
                    </Box>
                    <Text fontSize="xs" color={passwordStrength.color} mt={1} fontWeight="medium">
                      Strength: {passwordStrength.label}
                    </Text>
                  </Box>
                )
              )}
            </FormControl>

            {/* Confirm Password */}
            <FormControl isInvalid={!!errors.confirmPassword}>
              <InputGroup>
                <InputLeftElement pointerEvents="none"><LockIcon color="gray.400" /></InputLeftElement>
                <Input name="confirmPassword" type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password" value={form.confirmPassword}
                  onChange={handleChange} borderRadius="lg" focusBorderColor="#60382f" pl="40px" />
                <InputRightElement>
                  <IconButton variant="ghost" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />} aria-label="Toggle confirm" />
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword ? (
                <FormErrorMessage fontSize="xs">{errors.confirmPassword}</FormErrorMessage>
              ) : (
                passwordsMatch && <FormHelperText fontSize="xs" color="green.500">✅ Passwords match</FormHelperText>
              )}
            </FormControl>

            {/* Submit */}
            <Button w="full" bg="#60382f" color="white" _hover={{ bg: "#7a4a3c" }} borderRadius="lg"
              size="lg" onClick={submit} isLoading={loading} loadingText="Creating Account..." mt={2}>
              Create Account
            </Button>

            <Text fontSize="sm" color="gray.500">
              Already have an account?{" "}
              <Link color="#60382f" fontWeight="semibold" onClick={() => nav("/login")}>Login</Link>
            </Text>

          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
