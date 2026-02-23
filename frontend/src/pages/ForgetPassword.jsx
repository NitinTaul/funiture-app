import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function ForgotPassword() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    setLoading(true)
    await api.post("/auth/forgot-password", { email })
    nav("/reset-password", { state: { email } })
    setLoading(false)
  }

  return (
    <Box maxW="sm" mx="auto" mt={20} p={8} bg="gray.800" borderRadius="lg">
      <Heading mb={6}>Forgot Password</Heading>

      <VStack spacing={4}>
        <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <Button colorScheme="orange" width="full" onClick={sendOtp} isLoading={loading}>
          Send OTP
        </Button>
      </VStack>
    </Box>
  )
}