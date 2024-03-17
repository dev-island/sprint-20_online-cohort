import { Heading, Link, Text, Box } from "@chakra-ui/react";
import SignInForm from "../components/SignIn";
import { FC } from "react";

const LoginPage: FC = () => {
  const login = async () => {
    // TODO: implement login
  };

  return (
    <Box maxW="md" mx="auto" mt={8} px={4}>
      <Heading mb={4}>Login</Heading>
      <SignInForm ctaText="Sign up" submit={login} />
      <Text mt={4}>
        Don't have an account? <Link href="/sign-up">Sign Up</Link>
      </Text>
    </Box>
  );
};

export default LoginPage;
