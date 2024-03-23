import Form from "../components/Form";
import useRegister from "../hooks/useRegister";
import { RegisterFormData } from "../types";

const initState = {
  username: "",
  password: "",
  confirmPassword: "",
};

const inputs = [
  {
    type: "text",
    name: "username",
    label: "Username",
    isRequired: true,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    isRequired: true,
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    isRequired: true,
  },
];

const Register = () => {
  const { loading, register } = useRegister();

  const handleRegister = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    await register({ username, password, confirmPassword });
  };

  return (
    <Form
      title="Sign up"
      subTitle="Create an account to get started"
      inputs={inputs}
      loading={loading}
      submit={handleRegister}
      initState={initState}
      cta="Register"
      link="/"
      linkPrompt="Already have an account?"
      linkText="Login"
    />
  );
};

export default Register;