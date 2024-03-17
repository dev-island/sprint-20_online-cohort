import { FC } from "react";

import {
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  logout: () => void;
};

const Navbar: FC<Props> = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
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
    >
      <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
        <Text
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          color={useColorModeValue("gray.800", "white")}
        >
          Home
        </Text>
      </Flex>

      <Stack
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"row"}
        spacing={6}
      >
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          onClick={handleLogout}
          _hover={{
            border: "none",
            outline: "none",
          }}
        >
          Logout
        </Button>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          href={"/profile"}
          _hover={{
            border: "none",
            outline: "none",
          }}
        >
          Profile
        </Button>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          href={"/login"}
          _hover={{
            border: "none",
            outline: "none",
          }}
        >
          Login
        </Button>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"solid"}
          href={"/"}
          bg={"pink.400"}
          color={"white"}
          _hover={{
            bg: "pink.300",
          }}
        >
          Sign up
        </Button>
      </Stack>
    </Flex>
  );
};

export default Navbar;
