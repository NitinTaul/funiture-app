import HeroBanner from "../components/HeroBanner";
import NewCollections from "../components/NewCollections";
import AboutUs from "../components/AboutUs"
import WhyChooseUs from "../components/WhyChooseUs";
import ShopByRoom from "../components/ShopByRoom";
import ShopByCategories from "../components/ShopByCategories";
import ReviewCarousel from "../components/ReviewCarousel";
import Banner from "../assets/WEB BANNER 50.png";
import Banner2 from "../assets/banner2.png";

import { Box, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <NewCollections />
      <AboutUs />
      <WhyChooseUs />
      <ShopByRoom />
      <Box w="100%" mt={8} mb={8} overflow="hidden">
        <Image
          src={Banner}
          alt="Web Banner-1"
          w="100%"
          h={{ base: "200px", md: "400px", lg: "500px" }}
          objectFit="cover"
          objectPosition="left"
          display="block"

        />
      </Box>
      <ShopByCategories />
      <Box w="100%" mt={8} mb={8} overflow="hidden">
        <Image
          src={Banner2}
          alt="Web Banner-1"
          w="100%"
          h={{ base: "200px", md: "400px", lg: "100%" }}
          objectFit="cover"
          objectPosition="center center"
          display="block"
        />
      </Box>
      <ReviewCarousel />

    </>
  );
}
