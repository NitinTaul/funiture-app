// src/pages/Login.jsx
import React, { useState } from 'react'
import { Box, Button, Input, Heading, VStack } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)
    try {
      await login({ email, password })
      setLoading(false)
      nav('/')
    } catch {
      setLoading(false)
    }
  }

  return (
    <Box className="container" maxW="md" mt={10}>
      <Heading mb={6}>Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={submit} isLoading={loading} width="full">Login</Button>
      </VStack>
    </Box>
  )
}
