
import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  VStack,
  Button,
  Center,
} from "@chakra-ui/react";
// import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function ShopByRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/rooms`).then((res) => setRooms(res.data));
  }, []);

  return (
    <Box my={0} bg="#FFF5F2">
      <Center>
        <VStack spacing={2} pt={20} >
          <Text fontSize="4xl" fontWeight="bold" color="#61392f">
            SHOP BY ROOM
          </Text>
          <Text fontSize="md"  fontWeight="bold" color="#61392f">
            “FIND YOUR PERFECT MATCH.”
          </Text>
        </VStack>
      </Center>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10} px={6}>
        {rooms.map((room) => (
          <VStack
            key={room._id}
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            spacing={4}
          >
            <Image
              src={`${API_URL}${room.image}`}
              alt={room.name}
              objectFit="cover"
              w="100%"
              h="250px"
            />
            <VStack spacing={1} pb={4}>
              <Text fontSize="xl" fontWeight="bold">
                {room.name.toUpperCase()}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {room.name === "Living Room" && "“Where Conversations Flow.”"}
                {room.name === "Bed Room" && "“Where Dreams Take Shape.”"}
                {room.name === "Dining Room" && "“Where Every Meal Becomes A Memory.”"}
                {room.name === "Office Furniture" && "“Designed For Work, Built For Comfort.”"}
                {room.name === "Outdoor Furniture" && "“Breathe Fresh, Sit Fresh.”"}
                {room.name === "Decor & Accessories" && "“The Finishing Touches Of Home.”"}
              </Text>

              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="brown"
                variant="outline"
                mt={2}
              >
                BUY NOW
              </Button>
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
