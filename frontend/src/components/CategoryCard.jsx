// src/components/CategoryCard.jsx
import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'

export default function CategoryCard({ item }) {
  return (
    <Box textAlign="center" p={3} borderRadius="md" bg="white" boxShadow="sm">
      <Image src={item.image} alt={item.name} height="120px" mx="auto" objectFit="cover" />
      <Text mt={2}>{item.name}</Text>
    </Box>
  )
}
