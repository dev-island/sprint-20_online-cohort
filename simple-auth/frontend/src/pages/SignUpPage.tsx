import { Heading, Link, Text, Box } from "@chakra-ui/react";
import SignInForm from "../components/SignIn";
import { FC } from "react";

const SignUpPage: FC = () => {

  const signUp = async () => {
    // TODO: implement sign up
  };

  return (
    <Box maxW="md" mx="auto" mt={8} px={4}>
      <Heading mb={4}>Sign up</Heading>
      <SignInForm ctaText="Sign up" submit={signUp} />
      <Text mt={4}>
        Already have an account? <Link href="/login">Log in</Link>
      </Text>
    </Box>
  );
};

export default SignUpPage;
