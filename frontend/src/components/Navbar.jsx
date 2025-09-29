import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Spacer,
  Badge,
  Portal,
  Button,
  CloseButton,
  Drawer,
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
  const [open, setOpen] = useState(false);

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
            <Image src={HeartIcon} alt="Likes" boxSize="22px" _hover={{transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"}}/>
            {likesCount > 0 && (
              <Badge position="absolute" top="-6px" right="-6px" borderRadius="full" colorScheme="red" fontSize="10px">
                {likesCount}
              </Badge>
            )}
          </Box>

          <Box position="relative" cursor="pointer" onClick={() => nav("/cart")}>
            <Image src={CartIcon} alt="Cart" boxSize="28px" _hover={{transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"}}/>
            {cartCount > 0 && (
              <Badge position="absolute" top="-6px" right="-6px" borderRadius="full" colorScheme="green" fontSize="10px">
                {cartCount}
              </Badge>
            )}
          </Box>

          <Box cursor="pointer" onClick={() => (user ? logout() : nav("/login"))}>
            <Image src={UserIcon} alt="User" boxSize="22px" _hover={{transform: "scale(1.1)", filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))"}}/>
          </Box>
        </Flex>

        {/* Mobile hamburger trigger (Drawer.Trigger will open/close Drawer) */}
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Drawer.Trigger asChild>
            <Box
              display={{ base: "block", md: "none" }}
              fontSize="28px"
              cursor="pointer"
              aria-label="Open menu"
            >
              ☰
            </Box>
          </Drawer.Trigger>

          {/* Portal + Drawer UI */}
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Menu</Drawer.Title>
                </Drawer.Header>

                <Drawer.Body>
                  <Flex direction="column" gap={4} fontSize="18px">
                    {/* IMPORTANT: Add onClick={() => setOpen(false)} to each link so drawer closes */}
                    {/* <Link as={RouterLink} to="/" onClick={() => setOpen(false)}>HOME</Link>
                    <Link as={RouterLink} to="/shop" onClick={() => setOpen(false)}>SHOP</Link>
                    <Link as={RouterLink} to="/about" onClick={() => setOpen(false)}>ABOUT US</Link>
                    <Link as={RouterLink} to="/contact" onClick={() => setOpen(false)}>CONTACT US</Link>
                    <Link as={RouterLink} to="/blog" onClick={() => setOpen(false)}>BLOG</Link> */}
                    <Box onClick={() => closeAndNav("/")}>Home</Box>
                    <Box onClick={() => closeAndNav("/login")}>Login</Box>
                    <Box onClick={() => closeAndNav("/blog")}>Blog</Box>
                    <Box onClick={() => closeAndNav("/contact")}>Contact</Box>
                    <Box h="1px" bg="gray.200" my={2}></Box>

                    {/* If navigating programmatically, use closeAndNav */}
                    <Box onClick={() => { setOpen(false); nav("/wishlist"); }}>❤️ Wishlist ({likesCount})</Box>
                    <Box onClick={() => { setOpen(false); nav("/cart"); }}>🛒 Cart ({cartCount})</Box>
                    <Box onClick={() => { setOpen(false); user ? logout() : nav("/login"); }}>
                      👤 {user ? "Logout" : "Login"}
                    </Box>
                  </Flex>
                </Drawer.Body>

                <Drawer.Footer>
                  <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Close</Button>
                </Drawer.Footer>

                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" position="absolute" top="4" right="4" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  );
}
