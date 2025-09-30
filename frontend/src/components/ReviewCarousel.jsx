// not Fully working
import React from 'react'
import { Box, Avatar, Text, Heading } from '@chakra-ui/react'

export default function ReviewCarousel({ items = [] }) {
  return (
    <Box display="flex" gap={4} overflowX="auto" pb={2}>
      {items.map((r) => (
        <Box key={r._id} minW="260px" p={4} borderRadius="md" bg="white" boxShadow="sm">
          <Avatar name={r.name} src={r.avatar} />
          <Heading size="sm" mt={2}>{r.name}</Heading>
          <Text mt={2}>{r.comment}</Text>
        </Box>
      ))}
    </Box>
  )
}
