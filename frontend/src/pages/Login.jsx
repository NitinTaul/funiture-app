import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  Link,HStack
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../contexts/AuthContext"

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      login(res.data)
      nav("/")
    } catch (err) {
      console.log(err.response?.data?.message)
    }
    setLoading(false)
  }

  const sendOtp = async () => {
    await api.post("/auth/send-login-otp", { email })
    nav("/verify-login-otp", { state: { email } })
  }

  return (
  <Box
  minH="100vh"
  bg="#60382f"
  display="flex"
  justifyContent="center"
  alignItems="center"
>
  <Box
    w="100%"
    maxW="500px"
    p={8}
    bg="white"
    borderRadius="lg"
    boxShadow="lg"
  >
      <Heading mb={6} textAlign="center">Login</Heading>

      <VStack spacing={4}>
        <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <Button colorScheme="blue" width="full" onClick={handleLogin} isLoading={loading}>
          Login
        </Button>

        <Button variant="outline" width="full" onClick={sendOtp}>
          Login with OTP
        </Button>

        <Text fontSize="sm">
          <Link color="blue.400" onClick={() => nav("/forgot-password")}>
            Forgot Password?
          </Link>
        </Text>

        <HStack justify="center" mt={4}>
          <Text fontSize="sm">Don't have an account?</Text>
          <Link
            color="blue.400"
            fontSize="sm"
            onClick={() => nav("/signup")}
          >
            Register here
          </Link>
        </HStack>
      </VStack>
    </Box>
    </Box>
  )
}