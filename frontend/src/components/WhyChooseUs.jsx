import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Grid,
  Flex,
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
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/whychooseus`;
        const res = await fetch(url);
        const data = await res.json();
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
    <Box bg="#fceee8"  py={{ base: 2, md: 4 }} px={{ base: 4, md: 10 }} textAlign="center" >
      {/* ✅ Heading */}
      <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="#61392f" mb={3}>
        WHY CHOOSE US
      </Text>
      <Text fontSize="md" fontWeight="bold "color="#61392f" mb={12}>
        “MORE THAN FURNITURE – A LIFESTYLE UPGRADE.”
      </Text>

      {/* ✅ Grid */}
      <Flex
        wrap="wrap"
        justify="center"
        align="start"
        gap={12}
        maxW="1400px"
        w="100%"
        mx="auto"
         px={{ base: 4, md: 8 }}
        pb={8}
      >
        {features.map((item, i) => (
          <VStack
            key={i}
            spacing={3}
            bg="#fceee8"
            borderRadius="2xl"
            overflow="hidden"
            w="100%"
            maxW="365px"
            textAlign="center"
          >
            <Box
              w="100%"
              h={{ base: "200px", md: "220px" }}
              overflow="hidden"
              borderRadius="2xl"
              m="0"
            >
              <Image
                src={item.icon}
                alt={item.title}
                w="100%"
                h="100%"
                objectFit="cover"
                display="block"
                 _hover={{transform: "translateY(4px)" }}
                  transition="0.3s"
              />
            </Box>

            <Text
              fontWeight="bold"
              fontSize="lg"
              color="#61392f"
              textTransform="uppercase"
              mt={2}
            >
              {item.title}
            </Text>

            <Text
              fontSize="sm"
              color="#61392f"
              maxW="90%"
              mx="auto"
              pb={6}
              lineHeight="1.5"
            >
              {item.desc}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default WhyChooseUs;
