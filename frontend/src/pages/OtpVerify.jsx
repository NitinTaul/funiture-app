import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text
} from "@chakra-ui/react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function OtpVerify() {
  const { state } = useLocation()
  const nav = useNavigate()

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const verify = async () => {
    setLoading(true)
    try {
      await api.post("/auth/verify-email", {
        email: state.email,
        otp
      })
      nav("/login")
    } catch (err) {
      console.log(err.response?.data?.message)
    }
    setLoading(false)
  }

  return (
    <Box maxW="sm" mx="auto" mt={20} p={8} bg="gray.800" borderRadius="lg">
      <Heading mb={6} textAlign="center">Verify Email</Heading>

      <VStack spacing={4}>
        <Text fontSize="sm">
          Enter OTP sent to {state.email}
        </Text>

        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
        />

        <Button
          colorScheme="green"
          width="full"
          onClick={verify}
          isLoading={loading}
        >
          Verify
        </Button>
      </VStack>
    </Box>
  )
}