import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Grid,
  SimpleGrid,
  Image,
  VStack,
  Spinner,
} from "@chakra-ui/react";

const WhyChooseUs = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const url = `/api/whychooseus`;
        console.log("📡 Fetching from:", url);
        const res = await fetch(url);
        const data = await res.json();
        console.log("✅ API response:", data);
        setFeatures(data);
      } catch (err) {
        console.error("❌ Error fetching WhyChooseUs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);


  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg="#f8eae2" py={20} px={{ base: 4, md: 10 }}>
      {/* Heading */}
      <Box textAlign="center" mb={12}>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="brown.700">
          WHY CHOOSE US
        </Text>
        <Text fontSize="md" mt={2} color="gray.600">
          “MORE THAN FURNITURE – A LIFESTYLE UPGRADE.”
        </Text>
      </Box>

      {/* Grid */}
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={8}
      >

        {features.map((item, i) => (
          <VStack
            key={i}
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={4}
            _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
          >
            <Image
              src={item.icon}
              alt={item.title}
              borderRadius="md"
              w="100%"
              h={{ base: "180px", md: "220px" }}
              objectFit="cover"
            />
            <Text fontWeight="bold" fontSize="lg" textAlign="center">
              {item.title}
            </Text>
            <Text fontSize="sm" textAlign="center" color="gray.600">
              {item.desc}
            </Text>
          </VStack>
        ))}
      </Grid>

      {/* <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
  {features.map((item, i) => (
    <VStack key={i} bg="white"
            borderRadius="lg"
            boxShadow="md"
            p={4}
            _hover={{ transform: "scale(1.03)", transition: "0.3s" }}>
      <Image src={item.icon} alt={item.title} />
      <Text fontWeight="bold">{item.title}</Text>
      <Text fontSize="sm" color="gray.600">{item.desc}</Text>
    </VStack>
  ))}
</SimpleGrid> */}

    </Box>
  );
};

export default WhyChooseUs;
