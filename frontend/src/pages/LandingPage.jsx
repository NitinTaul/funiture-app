import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function LandingPage() {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav("/login"); 
    }, 10000);
    return () => clearTimeout(timer);
  }, [nav]);

  return (
    <Box textAlign="center" mt={20}>
      <Heading>Welcome to Our App!</Heading>
      <Text mt={4}>Redirecting to login in 10 seconds...</Text>
    </Box>
  );
}