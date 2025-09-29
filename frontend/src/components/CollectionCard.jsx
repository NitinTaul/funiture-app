// src/components/CollectionCard.jsx
import React from 'react'
import { Box, Image, Heading, Text, Button, Flex, IconButton } from '@chakra-ui/react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useLikes } from '../contexts/LikesContext'

export default function CollectionCard({ item }) {
  const nav = useNavigate()
  const { addToCart } = useCart()
  const { likedIds, toggleLike } = useLikes()

  const liked = likedIds.includes(item._id)

  return (
    <Box borderRadius="md" overflow="hidden" bg="white" boxShadow="sm">
      <Image src={item.image} alt={item.title} objectFit="cover" height="220px" width="100%" />
      <Box p={4}>
        <Heading size="sm">{item.title}</Heading>
        <Text>{item.subtitle}</Text>
        <Text fontWeight="bold" mt={2}>₹{item.price}</Text>

        <Flex mt={3} gap={2}>
          <Button size="sm" onClick={() => nav(`/product/${item._id}`)}>View Details</Button>
          <IconButton
            aria-label="add to cart"
            icon={<FiShoppingCart />}
            size="sm"
            onClick={() => addToCart(item)}
          />
          <IconButton
            aria-label="like"
            icon={<FiHeart />}
            size="sm"
            colorScheme={liked ? 'red' : 'gray'}
            onClick={() => toggleLike(item._id)}
          />
        </Flex>
      </Box>
    </Box>
  )
}
