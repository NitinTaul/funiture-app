import React from "react";
import {
  Box, Flex, Image, Link, Spacer, Badge, Button,
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader,
  DrawerBody, DrawerFooter, DrawerCloseButton, useDisclosure,
  Popover, PopoverTrigger, PopoverContent, PopoverBody,
  Text, VStack, Avatar, HStack, Divider,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useLikes } from "../contexts/LikesContext";
import Logo from "../assets/Navbar/0c65139e27503d1971895d3c03d34deb1098efb2.png";
import HeartIcon from "../assets/icons/like-icon.svg";
import UserIcon from "../assets/icons/Page-1.svg";
import CartIcon from "../assets/icons/cart-icon.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { likesCount } = useLikes();
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    onClose();
    nav("/login");
  };

  return (
    <Box bg="white" boxShadow="sm" position="sticky" top="0" zIndex="10">
      <Flex align="center" py={3} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">

        {/* Logo */}
        <Link as={RouterLink} to="/">
          <Image src={Logo} alt="Ask Me Furniture" h="50px" />
        </Link>

        <Spacer />

        {/* Desktop Links */}
        <Flex gap={8} fontWeight="500" fontSize="16px" display={{ base: "none", md: "flex" }}>
          <Link as={RouterLink} to="/" _hover={{ color: "#60382f" }}>HOME</Link>
          <Link as={RouterLink} to="/shop" _hover={{ color: "#60382f" }}>SHOP</Link>
          <Link as={RouterLink} to="/about" _hover={{ color: "#60382f" }}>ABOUT US</Link>
          <Link as={RouterLink} to="/contact" _hover={{ color: "#60382f" }}>CONTACT US</Link>
          <Link as={RouterLink} to="/blog" _hover={{ color: "#60382f" }}>BLOG</Link>
        </Flex>

        <Spacer />

        {/* Desktop Icons */}
        <Flex align="center" gap={6} display={{ base: "none", md: "flex" }}>

          {/* Wishlist */}
          <Box position="relative" cursor="pointer" onClick={() => nav("/wishlist")}>
            <Image src={HeartIcon} alt="Likes" boxSize="22px"
              _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))" }} />
            {likesCount > 0 && (
              <Badge position="absolute" top="-6px" right="-6px" borderRadius="full" colorScheme="red" fontSize="10px">
                {likesCount}
              </Badge>
            )}
          </Box>

          {/* Cart */}
          <Box position="relative" cursor="pointer" onClick={() => nav("/cart")}>
            <Image src={CartIcon} alt="Cart" boxSize="28px"
              _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))" }} />
            {cartCount > 0 && (
              <Badge position="absolute" top="-6px" right="-6px" borderRadius="full" colorScheme="green" fontSize="10px">
                {cartCount}
              </Badge>
            )}
          </Box>

          {/* User Icon — shows popover if logged in, goes to login if not */}
          {user ? (
            <Popover trigger="hover" placement="bottom-end">
              <PopoverTrigger>
                <Box cursor="pointer">
                  <HStack spacing={2} align="center">
                    <Avatar
                      size="sm"
                      name={`${user.name} ${user.surname}`}
                      bg="#60382f"
                      color="white"
                    />
                    <Text fontSize="sm" fontWeight="600" color="#60382f">
                      Hi, {user.name}
                    </Text>
                  </HStack>
                </Box>
              </PopoverTrigger>
              <PopoverContent w="180px" boxShadow="lg" borderRadius="lg" _focus={{ outline: "none" }}>
                <PopoverBody p={0}>
                  <VStack spacing={0} align="stretch">
                    <Box px={4} py={3} borderBottom="1px solid" borderColor="gray.100">
                      <Text fontWeight="700" fontSize="sm" color="#60382f">
                        {user.name} {user.surname}
                      </Text>
                      <Text fontSize="xs" color="gray.500" noOfLines={1}>{user.email}</Text>
                    </Box>
                    <Box
                      px={4} py={3} cursor="pointer" fontSize="sm"
                      _hover={{ bg: "red.50", color: "red.500" }}
                      color="gray.700" fontWeight="500"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </Box>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Box cursor="pointer" onClick={() => nav("/login")}>
              <Image src={UserIcon} alt="User" boxSize="22px"
                _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))" }} />
            </Box>
          )}
        </Flex>

        {/* Mobile Hamburger */}
        <Box display={{ base: "block", md: "none" }} fontSize="28px" cursor="pointer" onClick={onOpen}>
          ☰
        </Box>

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottom="1px solid" borderColor="gray.100">
              {user ? (
                <VStack align="start" spacing={0}>
                  <HStack>
                    <Avatar size="sm" name={`${user.name} ${user.surname}`} bg="#60382f" color="white" />
                    <Box>
                      <Text fontSize="sm" fontWeight="700">Hi, {user.name} 👋</Text>
                      <Text fontSize="xs" color="gray.500">{user.email}</Text>
                    </Box>
                  </HStack>
                </VStack>
              ) : (
                "Menu"
              )}
            </DrawerHeader>

            <DrawerBody>
              <Flex direction="column" gap={4} fontSize="18px">
                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/"); }}>🏠 Home</Box>
                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/shop"); }}>🛍️ Shop</Box>
                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/about"); }}>ℹ️ About</Box>
                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/contact"); }}>📞 Contact</Box>
                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/blog"); }}>📝 Blog</Box>

                <Divider />

                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/wishlist"); }}>
                  ❤️ Wishlist {likesCount > 0 && `(${likesCount})`}
                </Box>

                <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/cart"); }}>
                  🛒 Cart {cartCount > 0 && `(${cartCount})`}
                </Box>

                <Divider />

                {user ? (
                  <Box
                    cursor="pointer"
                    color="red.500"
                    fontWeight="600"
                    _hover={{ color: "red.700" }}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </Box>
                ) : (
                  <Box cursor="pointer" _hover={{ color: "#60382f" }} onClick={() => { onClose(); nav("/login"); }}>
                    👤 Login
                  </Box>
                )}
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

      </Flex>
    </Box>
  );
}
