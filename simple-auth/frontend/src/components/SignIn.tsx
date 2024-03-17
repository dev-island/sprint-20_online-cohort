import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState, FC } from "react";
import { AuthFormData } from "../types";

type Props = {
  submit: (data: AuthFormData) => void;
  ctaText: string;
};

const SignInForm: FC<Props> = ({ submit, ctaText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    submit(formData);
    setFormData({ username: "", password: "" });
  };

  return (
    <Stack spacing={4}>
      <Input
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        name="username"
      />
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button onClick={handleSubmit}>{ctaText}</Button>
    </Stack>
  );
};

export default SignInForm;
