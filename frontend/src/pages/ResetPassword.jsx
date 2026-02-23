import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function ResetPassword() {
  const { state } = useLocation()
  const nav = useNavigate()

  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const reset = async () => {
    setLoading(true)
    await api.post("/auth/reset-password", {
      email: state.email,
      otp,
      newPassword
    })
    nav("/login")
    setLoading(false)
  }

  return (
    <Box maxW="sm" mx="auto" mt={20} p={8} bg="gray.800" borderRadius="lg">
      <Heading mb={6}>Reset Password</Heading>

      <VStack spacing={4}>
        <Input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
        <Input type="password" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} />

        <Button colorScheme="green" width="full" onClick={reset} isLoading={loading}>
          Reset Password
        </Button>
      </VStack>
    </Box>
  )
}