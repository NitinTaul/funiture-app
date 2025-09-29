import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Flex,
  HStack,
  InputGroup,
} from "@chakra-ui/react";
import { Link,useNavigate  } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";

export default function HeroBanner() {

  const navigate = useNavigate();

  const handleSearchClick = () => {
    // Example: navigate to a search page
    navigate("/search");
    // or trigger a search function here instead
  };
  return (
    <Box
      bgImage="url('/home/hero/vecteezy_scandinavian-interior-design-sofa-in-white-living-room-with_27941132 1.png')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      h={{ base: "100vh", md: "90vh" }}
      px={4}
    >
      {/* Overlay for text readability */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="rgba(0,0,0,0.35)"
        zIndex={0}
      />

      {/* Content section (aligned to top) */}
      <Flex
        direction="column"
        align="center"
        justify="flex-start"  
        position="relative"
        zIndex={1}
        maxW="900px"
        mx="auto"
        pt={{ base: 8, md: 12 }}  
      >
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }}
          mb={2}
          fontWeight="bold"
          textTransform="uppercase"
          lineHeight="1.2"
          textAlign="center"
          color="white"
        >
          Furniture That Feels Like Home
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          maxW="700px"
          mx="auto"
          mb={5}
          lineHeight="1.6"
          textAlign="center"
          color="white"
        >
          Discover Timeless Designs, Modern Comfort, And Premium Quality – Crafted To
          Transform Every Corner Of Your Space.
        </Text>

        {/* Buttons */}

        <HStack spacing={6} justify="center" mb={10}>
          {/* Shop Now */}
          <Button
            size="lg"
            as={Link}
            to="/shop"
            w={144}
            borderRadius="full"
            bg="brown.600"
            color="white"
            _hover={{ bg: "#13bce2ff" }}
            transition="all 0.2s"
            leftIcon={<FaShoppingCart size={44} />}
          >
            Shop Now
          </Button>


          {/* Know More */}
          <Button
            size="lg"
            as={Link}
            to="/about"
            w={144}
            borderRadius="full"
            bg="brown.600"
            color="white"
            _hover={{ bg: "#14c3ebff" }}
            transition="all 0.2s"
            leftIcon={<FaShoppingCart size={44} />}
          >
            KNOW MORE
          </Button>
        </HStack>


        {/* Search Bar */}
        <InputGroup
          flex="1"
          maxW="400px"
          endElement={<LuSearch color="gray" size={26}  onClick={handleSearchClick}
          _hover={{ color: "#659ca8" }}  cursor="pointer"
          />}
        >
          <Input
            placeholder="Search Here"
            bg="white"
            color="gray.700"
            borderRadius="full"
            size="lg"
            py={6}
            textAlign="start"
            pl={5}
            _placeholder={{ color: "gray.400" }}
          
          />
        </InputGroup>
      </Flex>
    </Box>
  );
}
