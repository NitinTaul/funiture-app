import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Spacer,
  Badge,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  useDisclosure,
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

  // Controlled open state for Drawer (important)
  const { isOpen, onOpen, onClose } = useDisclosure();
  // helper to close drawer then navigate (use when programmatically navigating)
  const closeAndNav = (path) => {
    setOpen(false);
    nav(path);
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
          <Link as={RouterLink} to="/" _hover={{ color: "#2B6CB0" }}>HOME</Link>
          <Link as={RouterLink} to="/shop" _hover={{ color: "#2B6CB0" }}>SHOP</Link>
          <Link as={RouterLink} to="/about" _hover={{ color: "#2B6CB0" }}>ABOUT US</Link>
          <Link as={RouterLink} to="/contact" _hover={{ color: "#2B6CB0" }}>CONTACT US</Link>
          <Link as={RouterLink} to="/blog" _hover={{ color: "#2B6CB0" }}>BLOG</Link>
        </Flex>

        <Spacer />

        {/* Desktop Icons */}
        <Flex align="center" gap={6} display={{ base: "none", md: "flex" }}>
          <Box position="relative" cursor="pointer" onClick={() => nav("/wishlist")}>
            <Image src={HeartIcon} alt="Likes" boxSize="22px" _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))" }} />
            {likesCount > 0 && (
              <Badge position="absolute" top="-6px" right="-6px" borderRadius="full" colorScheme="red" fontSize="10px">
                {likesCount}
              </Badge>
            )}
          </Box>

          <Box position="relative" cursor="pointer" onClick={() => nav("/cart")}>
            <Image src={CartIcon} alt="Cart" boxSize="28px" _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))" }} />
            {cartCount > 0 && (
              <Badge position="absolute" top="-6px" right="-6px" borderRadius="full" colorScheme="green" fontSize="10px">
                {cartCount}
              </Badge>
            )}
          </Box>

          <Box cursor="pointer" onClick={() => (user ? logout() : nav("/login"))}>
            <Image src={UserIcon} alt="User" boxSize="22px" _hover={{ transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))" }} />
          </Box>
        </Flex>

        {/* Mobile hamburger trigger (Drawer.Trigger will open/close Drawer) */}
        {/* Mobile Menu Button */}
        <Box
          display={{ base: "block", md: "none" }}
          fontSize="28px"
          cursor="pointer"
          onClick={onOpen}
        >
          ☰
        </Box>

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <Flex direction="column" gap={4} fontSize="18px">
                <Box onClick={() => { onClose(); nav("/"); }}>Home</Box>
                <Box onClick={() => { onClose(); nav("/shop"); }}>Shop</Box>
                <Box onClick={() => { onClose(); nav("/about"); }}>About</Box>
                <Box onClick={() => { onClose(); nav("/contact"); }}>Contact</Box>
                <Box onClick={() => { onClose(); nav("/blog"); }}>Blog</Box>

                <Box h="1px" bg="gray.200" my={2}></Box>

                <Box onClick={() => { onClose(); nav("/wishlist"); }}>
                  ❤️ Wishlist ({likesCount})
                </Box>

                <Box onClick={() => { onClose(); nav("/cart"); }}>
                  🛒 Cart ({cartCount})
                </Box>

                <Box onClick={() => {
                  onClose();
                  user ? logout() : nav("/login");
                }}>
                  👤 {user ? "Logout" : "Login"}
                </Box>
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}
