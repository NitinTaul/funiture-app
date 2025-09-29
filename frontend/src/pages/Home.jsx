// // src/pages/Home.jsx
// import React, { useEffect, useState } from 'react'
// import { Box, SimpleGrid, Heading, Text, Container } from '@chakra-ui/react'
// import api from '../api/api'
// import CollectionCard from '../components/CollectionCard'
// import CategoryCard from '../components/CategoryCard'
// import ReviewCarousel from '../components/ReviewCarousel'

// export default function Home() {
//   const [collections, setCollections] = useState([])
//   const [why, setWhy] = useState([])
//   const [rooms, setRooms] = useState([])
//   const [categories, setCategories] = useState([])
//   const [reviews, setReviews] = useState([])

//   useEffect(() => {
//     api.get('/collections').then(res => setCollections(res.data)).catch(() => {})
//     api.get('/why').then(res => setWhy(res.data)).catch(() => {})
//     api.get('/rooms').then(res => setRooms(res.data)).catch(() => {})
//     api.get('/categories').then(res => setCategories(res.data)).catch(() => {})
//     api.get('/reviews').then(res => setReviews(res.data)).catch(() => {})
//   }, [])

//   return (
//     <Container className="container">
//       <Box textAlign="center" mb={8}>
//         <Heading>Furniture that feels like home</Heading>
//         <Text>Shop our new collections</Text>
//       </Box>

//       <Box mb={6}>
//         <Heading size="md" mb={4}>New Collections</Heading>
//         <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
//           {collections.map(item => <CollectionCard key={item._id} item={item} />)}
//         </SimpleGrid>
//       </Box>

//       <Box mb={6}>
//         <Heading size="md" mb={4}>Why Choose Us</Heading>
//         <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
//           {why.map(w => <Box key={w._id} p={4} borderRadius="md" bg="white" boxShadow="sm"><Heading size="sm">{w.title}</Heading><Text>{w.description}</Text></Box>)}
//         </SimpleGrid>
//       </Box>

//       <Box mb={6}>
//         <Heading size="md" mb={4}>Shop By Room</Heading>
//         <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
//           {rooms.map(r => <CategoryCard key={r._id} item={{ name: r.name, image: r.image }} />)}
//         </SimpleGrid>
//       </Box>

//       <Box mb={6}>
//         <Heading size="md" mb={4}>Shop By Category</Heading>
//         <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
//           {categories.map(c => <CategoryCard key={c._id} item={c} />)}
//         </SimpleGrid>
//       </Box>

//       <Box mb={6}>
//         <Heading size="md" mb={4}>Customer Reviews</Heading>
//         <ReviewCarousel items={reviews} />
//       </Box>
//     </Container>
//   )
// }
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Image, Text, Heading, SimpleGrid } from "@chakra-ui/react";

// export default function Home() {
//   const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/collections")
//       .then(res => setCollections(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <Box p={8}>
//       <Heading mb={6}>New Collections</Heading>
//       <SimpleGrid columns={[1, 2, 3]} spacing={6}>
//         {collections.map((item) => (
//           <Box key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
//             <Image src={item.image} alt={item.title} />
//             <Box p="6">
//               <Heading size="md">{item.title}</Heading>
//               <Text mt="2">{item.description}</Text>
//             </Box>
//           </Box>
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// }


import React from "react";
import HeroBanner from "../components/HeroBanner";
import NewCollections from "../components/NewCollections";
import WhyChooseUs from "../components/WhyChooseUs";
import ShopByRoom from "../components/ShopByRoom";
import ShopByCategories from "../components/ShopByCategories";
import ReviewCarousel from "../components/ReviewCarousel";


export default function Home() {
  return (
    <>
      <HeroBanner />
      <NewCollections />
      <WhyChooseUs />
      <ShopByRoom />
      <ShopByCategories />
      <ReviewCarousel />
   
    </>
  );
}
