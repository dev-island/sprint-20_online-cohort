import React from "react";
import { Box, VStack, Heading, Text, Avatar } from "@chakra-ui/react";

const ProfilePage: React.FC = () => {
  return (
    <Box maxW="md" mx="auto" mt={8} px={4}>
      <VStack spacing={4} align="center">
        <Avatar size="2xl" name="John Doe" src="https://bit.ly/broken-link" />
        <Heading as="h2" size="lg">
          John Doe
        </Heading>
        <Text>Email: johndoe@example.com</Text>
        <Text>Username: johndoe</Text>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
