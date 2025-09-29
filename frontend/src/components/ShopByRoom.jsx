import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Image,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";



export default function ShopByRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`).then((res) => setRooms(res.data));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }


  return (
    <Box  mt={0} >
      {/* ✅ Section Title */}
      <Center p={10}bg="#FFF5F2">
        <VStack spacing={2}>
          <Text fontSize="3xl" fontWeight="bold" color="#61392f">
            SHOP BY ROOM
          </Text>
          <Text fontSize="md" color="#61392f">
            “FIND YOUR PERFECT MATCH.”
          </Text>
        </VStack>
      </Center>

      {/* ✅ Responsive Flex Layout */}
      <Flex
        wrap="wrap"
        justify="center"
        align="start"
        gap={12}
        maxW="1400px"
        w="100%"
        mx="auto"
        mt={10}
        px={{ base: 4, md: 8 }}
        pb={8}
      >
        {rooms.map((room, id) => (
          <VStack
            key={id}
            spacing={0}
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            w="100%"
            maxW="365px"
            h="100%"

            textAlign="left"
            shadow="md"
            _hover={{ shadow: "lg", transform: "translateY(-4px)", transition: "0.3s" }}
          >
            {/*  Room Image */}
            <Box w="100%" h={{ base: "200px", md: "220px" }} overflow="hidden">
              <Image
                src={room.image}
                alt={room.name}
                w="100%"
                h="100%"
                objectFit="cover"
                display="block"
                transition="0.3s"
                borderTopRadius="2xl"
                _hover={{ transform: "scale(1.02)" }}
              />
            </Box>

            {/* Text + Button Section */}
            <Flex
              justify="space-between"
              align="center"
              w="100%"
              px={2}
              py={4}

              flex="1"
            >
              {/* Left Text Section */}
              <VStack align="start" spacing={0} m={0} p={0}>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  color="#61392f"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {room.name}
                </Text>

                <Text fontSize="sm" color="#61392f" fontStyle="italic">
                  {room.slug}
                </Text>
              </VStack>

              {/*  Buy Now VStack */}
              <VStack
                spacing={1}
                align="center"
                justify="center"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                color="#61392f"
                minW="30px"
                m={0}
                p={0}
              >
                <Box _hover={{ transform: "scale(1.2)" }}>
                  <BsArrowUpRightCircleFill size={24} />
                </Box>

                <Text fontSize="sm" fontWeight="semibold">
                  BUY NOW
                </Text>
              </VStack>
            </Flex>

          </VStack>

        ))}
      </Flex>
    </Box>
  );
}
