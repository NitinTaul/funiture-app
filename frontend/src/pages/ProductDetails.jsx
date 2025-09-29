// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Image, Heading, Text, Button, Flex, IconButton } from '@chakra-ui/react'
import api from '../api/api'
import { useCart } from '../contexts/CartContext'
import { useLikes } from '../contexts/LikesContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const { likedIds, toggleLike } = useLikes()

  useEffect(() => {
    api.get(`/collections/${id}`).then(res => setProduct(res.data)).catch(() => {})
  }, [id])

  if (!product) return <Box className="container" mt={10}>Loading...</Box>

  const liked = likedIds.includes(product._id)

  return (
    <Box className="container" mt={8} bg="white" p={6} borderRadius="md" boxShadow="sm">
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Image src={product.image} alt={product.title} objectFit="cover" maxW="480px" />
        <Box>
          <Heading>{product.title}</Heading>
          <Text mt={2}>{product.subtitle}</Text>
          <Text fontWeight="bold" mt={4}>₹{product.price}</Text>
          <Flex gap={3} mt={6}>
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button colorScheme="teal">Buy Now</Button>
            <IconButton
              aria-label="like"
              icon={<span>♥</span>}
              onClick={() => toggleLike(product._id)}
              colorScheme={liked ? 'red' : 'gray'}
            />
          </Flex>

          <Box mt={6}>
            <Heading size="sm">Description</Heading>
            <Text mt={2}>{product.description || 'No description provided.'}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
