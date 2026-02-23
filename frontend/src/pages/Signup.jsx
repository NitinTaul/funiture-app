import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  Link, InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function Signup() {
  const nav = useNavigate()

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    setLoading(true)
    try {
      await api.post("/auth/register", form)
      nav("/verify-otp", { state: { email: form.email } })
    } catch (err) {
  alert(err.response?.data?.message || "Registration failed")
}
    setLoading(false)
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
        <Heading mb={6} textAlign="center">Create Account</Heading>

        <VStack spacing={4}>
          <Input name="name" placeholder="First Name" onChange={handleChange} />
          <Input name="surname" placeholder="Surname" onChange={handleChange} />
          <Input name="email" placeholder="Email" onChange={handleChange} />
          <Input name="mobile" placeholder="Mobile" onChange={handleChange} />
          <InputGroup>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label="Toggle password visibility"
              />
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="blue"
            width="full"
            onClick={submit}
            isLoading={loading}
          >
            Register
          </Button>

          <Text fontSize="sm">
            Already have account?{" "}
            <Link color="blue.400" onClick={() => nav("/login")}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}