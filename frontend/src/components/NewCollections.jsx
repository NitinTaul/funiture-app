import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useCart } from "../contexts/CartContext";
import { useLikes } from "../contexts/LikesContext";


const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/collections`;

export default function NewCollections() {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
const { addToCart } = useCart();
const { addToLikes } = useLikes();

  

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  return (
    <Box py={10} px={{ base: 4, md: 10 }} bg="white">
      <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" textAlign="center" mb={8} color="#5D4037">
        NEW COLLECTIONS
      </Text>

      <Flex wrap="wrap" justify="center" gap={8}>
        {collections.map((item) => (
          <Box
            key={item._id}
            w="250px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
            textAlign="center"
            bg="white"
            _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
            transition="0.3s"
          >
            {/* 🏷️ Deal Badge - top-left */}
            {item.badges?.[0] && (
              <Text
                bg="#5D4037" // brown badge
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px={3}
                py={1}
                position="absolute"
                top="2"
                left="2"
                borderRadius="full"
                zIndex="2"
              >
                {item.badges[0].toUpperCase()}
              </Text>
            )}

            {/* ❤️ + 🛒 Icons - top-right */}
            <Flex position="absolute" top="1" right="1" gap={0} zIndex="1">
              <Box
                as="button"
                bg="white"
                p={1}
                cursor="pointer"
                onClick={() => addToLikes(item)}
                _hover={{ transform: "scale(1.2)", bg: "brown.50" }}
              >
                <CiHeart color="#5D4037" size="25px" />
              </Box>

              <Box
                as="button"
                bg="white"
                p={1}
                cursor="pointer"
                onClick={() => addToCart(item)}
                _hover={{ transform: "scale(1.2)", bg: "brown.50" }}
              >
                <CiShoppingCart color="#5D4037" size="25px" />
              </Box>
            </Flex>
            {/* 🖼️ Product Image */}
            <Image
              src={item.image}
              alt={item.title}
              w="100%"
              h="200px"
              objectFit="contain"
              bg="white"
              mt={6}
            />

            {/* 📦 Product Info */}
            <VStack spacing={2} px={4} pb={4}>
              <Text fontWeight="bold" fontSize="md">
                {item.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {item.subtitle}
              </Text>

              {/* 💰 Price + Discount */}
              <HStack spacing={2}>
                <Text fontWeight="bold" fontSize="lg" color="#5D4037">
                  ₹{item.price}
                </Text>
                <Text as="s" color="gray.400">
                  ₹{Math.round(item.price / 0.64)}
                </Text>
                <Text color="green.500" fontWeight="bold">
                  36% OFF
                </Text>
              </HStack>

              {/* 🎨 Color Dots */}
              <HStack spacing={2}>
                {item.colors?.map((c, i) => (
                  <Box
                    key={i}
                    w="16px"
                    h="16px"
                    borderRadius="full"
                    bg={c}
                    border="1px solid #ccc"
                  />
                ))}
              </HStack>

              <Text fontSize="xs" color="gray.500">
                🚚 Shipping in 2 Days
              </Text>
            </VStack>
          </Box>
        ))}
      </Flex>

      <Flex justify="center" mt={6}>
        <Button
          bg="#5D4037"
          color="white"
          _hover={{ bg: "#eca190ff" }}
          px={8}
          borderRadius="full"
           onClick={() => navigate("/collections")}
        >
          View All
        </Button>
      </Flex>
    </Box>
  );
}
