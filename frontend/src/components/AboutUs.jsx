import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";

import AboutImg from "../assets/AboutUs/9ef0f359d15e70edef176fd43fb6eb7c1a0b2440.jpg";

const AboutUs = () => {
  return (
    <Box bg="#FCEFE9" py={16} px={{ base: 4, md: 12, lg: 20 }}>
      {/* Heading */}
      <Heading
        as="h2"
        textAlign="center"
        mb={2}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color="#61392f"
      >
        ABOUT US
      </Heading>
      <Text
        textAlign="center"
        fontWeight="bold"
        mb={10}
        fontSize={{ base: "sm", md: "md" }}
        color="#61392f"
      >
        “CRAFTING COMFORT, ONE PIECE AT A TIME.”
      </Text>

      {/* Content Section */}
      <Flex
        bg="white"
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
        direction={{ base: "column", md: "row" }}
        align="stretch"
        p="0"
      >
        {/* Left Side - Text */}
        <VStack
          align="start"
          spacing={6}
          p={{ base: 4, md: 8 }}
          pr={{ md: 10 }}
          flex={{ base: "1", md: "0.6" }} 
          textAlign="left"
        >
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
            At Ask Me Furniture, we believe furniture isn’t just about utility –
            it’s about creating spaces that inspire, relax, and connect people.
            Our collections blend fine craftsmanship, durable materials, and
            modern design to give your furniture that lasts a lifetime.
          </Text>

          <Text fontSize={{ base: "sm", md: "md" }} color="gray.700">
            With years of expertise, we curate and design pieces that adapt to
            your lifestyle – whether it’s a cozy home, a chic apartment, or a
            professional workspace.
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color="brown.600"
          >
            “FURNITURE IS THE BACKBONE OF A BEAUTIFUL HOME – STRONG, SUPPORTIVE,
            AND FULL OF CHARACTER.”
          </Text>

          <Button
            size="md"
            colorScheme="brown"
            bg="#61392f"
            color="white"
            borderRadius="full"
            px={6}
            _hover={{ bg: "#fceee8", color: "brown" }}
          >
            Know More
          </Button>
        </VStack>

        {/* Right Side - Image */}
        <Box
          flex={{ base: "1", md: "0.4" }} 
          m="0"
          p="0"
          display="flex"
          alignItems="stretch"
        >
          <Image
            src={AboutImg}
            alt="Family sitting on a sofa"
            objectFit="cover"
            w="100%"
            h="100%"
            m="0"
            p="0"
            display="block"          
            verticalAlign="middle"   
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutUs;
