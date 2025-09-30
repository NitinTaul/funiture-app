//not Fully working
import { Box, Image, Text } from "@chakra-ui/react";

export default function ProductCard({ title, image, price }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={3}>
      <Image src={image} alt={title} />
      <Text fontWeight="bold" mt={2}>{title}</Text>
      <Text color="gray.600">₹{price}</Text>
    </Box>
  );
}
