import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  HStack,
  Input,
  Button,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { MdOutlineLocationOn, MdEmail } from "react-icons/md";
import Logo from "../assets/Navbar/0c65139e27503d1971895d3c03d34deb1098efb2.png";
import FooterBg from "../assets/Footer/footerbg.png";
import telegram from "../assets/Footer/t1.svg";
import x from "../assets/Footer/x.svg";
import fb from "../assets/Footer/fb.svg"
export default function Footer() {
  return (
    <Box
      as="footer"
      bgImage={`url(${FooterBg})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      color="gray.200"
      py={14}
      px={{ base: 6, md: 16 }}
      w="100%"
      mt={20}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: 6, md: 20 }}
        mb={10}
      >
        <Flex
          direction={{ base: "column", sm: "row" }} 
          justify={{ base: "flex-start", sm: "space-between" }}
          gap={{base: "auto", md: "10"}}
          maxW="1350px"
          align="center"
          w="100%"
        >
          <Image
            src={Logo}
            alt="Ask Me Furniture"
            h={{ base: "68px", md: "85px" }}
            boxSize="227px"
            objectFit="contain"
          />
          <Text
            fontSize="sm"
            lineHeight="1.6"
            color="gray.300"
            fontWeight="bold"
            textAlign={{ base: "center", sm: "left" }}
          >
            Discover Timeless Designs, Modern Comfort, And Premium Quality – Crafted
            To Transform Every Corner Of Your Space.
          </Text>
        </Flex>
      </Flex>

      {/* ✅ Middle Links Section */}
      <Flex
        wrap="wrap"
        justify="space-between"
        gap={{ base: 10, md: 24 }}
        mb={10}
      >
        {/* Top Product */}
        <FooterColumn
          title="Top Product"
          links={["Sofas", "Recliners", "Chairs", "Beds", "Wardrobes"]}
        />

        {/* Shop by Room */}
        <FooterColumn
          title="Shop By Room"
          links={[
            "Living Room",
            "Bedroom",
            "Dining Room",
            "Office Furniture",
            "Outdoor Furniture",
          ]}
        />

        {/* Need Help */}
        <FooterColumn
          title="Need Help"
          links={[
            "Track your order",
            "Feedback",
            "Returns Process",
            "Returns Policy",
          ]}
        />

        {/* Company */}
        <FooterColumn title="Company" links={["About Us", "Contact Us", "FAQs"]} />

        {/* Contact Us */}
        <VStack align="flex-start" spacing={3} maxW="250px">
          <Text fontSize="lg" fontWeight="bold">
            Contact Us
          </Text>
          <HStack align="start">
            <MdOutlineLocationOn size={20} />
            <Text fontSize="sm" maxW="200px">
              Nargis Dutt Rd, Pali Hill, Mumbai, Maharashtra 400050
            </Text>
          </HStack>
          <HStack>
            <MdEmail size={20} />
            <Link fontSize="sm" href="mailto:support@askmefurnitures.com">
              support@askmefurnitures.com
            </Link>
          </HStack>
        </VStack>
      </Flex>

      {/* Custom Line */}
      <Box my={8} h="1px" bg="gray.600" w="100%" />

      {/* ✅ Subscribe + Social */}
      <Flex
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={4}
        mb={8}
      >
        <HStack spacing={4} w="100%" maxW="600px">
          <Text fontWeight="bold" whiteSpace="nowrap">
            Subscribe
          </Text>
          <Input
            placeholder="Enter your email address"
            bg="white"
            color="black"
            _placeholder={{ color: "gray.500" }}
            size="md"
            flex="1"
          />
          <Button colorScheme="orange" px={8}>
            Subscribe
          </Button>
        </HStack>

        <HStack spacing={4} mt={{ base: 6, md: 0 }} maxW="600px">
          <Text fontWeight="bold">Follow us</Text>
          
          <Link href="#" isExternal>
            <Image src={fb} boxSize="22px" alt="Facebook" />
          </Link>
          
          <Link href="#" isExternal>
            <Image src={x} boxSize="22px" alt="X/Twitter" />
          </Link>
          
          <Link href="#" isExternal>
            <Image src={telegram} boxSize="22px" alt="Telegram" />
          </Link>
        </HStack>
      </Flex>

      {/* Custom Line */}
      <Box my={8} h="1px" bg="gray.600" w="100%" />

      {/* ✅ Bottom Links */}
      <Flex
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "initial" }} 
        gap={2}
      >
        <Text fontSize="sm" color="gray.400">
          © 2024 All Rights Reserved
        </Text>
        <HStack
          spacing={18}
          fontSize="sm"
          color="gray.400"
          wrap="wrap"
          justify={{ base: "center", md: "flex-start" }}
        >
          <Link>Privacy Policy</Link>
          <Link>Terms of Use</Link>
          <Link>Sales and Refunds</Link>
          <Link>Legal</Link>
          <Link>Site Map</Link>
        </HStack>
      </Flex>
    </Box>
  );
}

function FooterColumn({ title, links }) {
  return (
    <VStack align="flex-start" spacing={3}>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      {links.map((link) => (
        <Link
          key={link}
          fontSize="sm"
          color="gray.300"
          _hover={{ color: "orange.400", textDecoration: "underline" }}
        >
          {link}
        </Link>
      ))}
    </VStack>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <IconButton
      as={Link}
      href={href}
      aria-label="social"
      icon={icon}
      bg="gray.700"
      _hover={{ bg: "orange.400", transform: "scale(1.1)" }}
      size="md"
      rounded="full"
      transition="0.2s"
    />
  );
}