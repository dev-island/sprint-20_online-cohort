import { FC, MouseEvent, useState } from "react";
import Input, { Props as InputProps } from "./Input";
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export type InputItem = Omit<InputProps, "onChange" | "value">;

type Props = {
  inputs: InputItem[];
  title: string;
  subTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: (formData: any) => void;
  initState: Record<string, string>;
  cta: string;
  link?: string;
  linkPrompt?: string;
  linkText?: string;
  loading: boolean;
};

const Form: FC<Props> = ({
  title,
  subTitle,
  inputs,
  submit,
  cta,
  initState,
  linkPrompt,
  link,
  linkText,
  loading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(initState);

  const validate = () => {
    return Object.values(formData).every((val) => val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please fill out all fields");
      return;
    }
    submit(formData);
    setFormData(initState);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"flex-start"}
      justify={"center"}
      mt={8}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{title}</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {subTitle}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {inputs.map((input, idx) => (
              <Input
                key={idx}
                {...input}
                value={formData[input.name]}
                onChange={handleChange}
              />
            ))}
            <Button
              isLoading={loading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              {cta}
            </Button>
          </Stack>
        </Box>
        {linkPrompt && link && linkText && (
          <Stack pt={6}>
            <Text align={"center"}>
              {linkPrompt}{" "}
              <Link href={link} color={"blue.400"}>
                {linkText}
              </Link>
            </Text>
          </Stack>
        )}
      </Stack>
    </Flex>
  );
};

export default Form;
