import { Box, Flex, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { isLoading, logout, loginWithRedirect, isAuthenticated } = useAuth0();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkColorHover = useColorModeValue("gray.800", "white");

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"space-between"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          {isAuthenticated && (
            <Box
              as="a"
              p={2}
              href={"/profile"}
              fontSize={"sm"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkColorHover,
              }}
            >
              Profile
            </Box>
          )}
        </Flex>
        {!isLoading ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {isAuthenticated ? (
              <Button
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  onClick={() => loginWithRedirect()}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        ) : null}
      </Flex>
    </Box>
  );
}
