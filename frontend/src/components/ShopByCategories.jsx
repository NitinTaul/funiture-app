import { useEffect, useState } from "react";
import { Box, Grid, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";

const ShopByCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <Box py={10} textAlign="center" bg="#fdf9f6">
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        SHOP BY CATEGORIES
      </Text>
      <Text fontSize="sm" color="gray.600" mb={8}>
        MORE THAN FURNITURE – A LIFESTYLE UPGRADE.
      </Text>

      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)"
        }}
        gap={6}
        maxW="1100px"
        mx="auto"
      >
        {categories.map((cat) => (
          <VStack
            key={cat._id}
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
            p={4}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              boxSize="120px"
              objectFit="contain"
            />
            <Text fontWeight="bold" fontSize="lg" color="brown.700">
              {cat.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {cat.slug}
            </Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopByCategories;
