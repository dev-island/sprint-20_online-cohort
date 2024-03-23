import Form from "../components/Form";
import useLogin from "../hooks/useLogin";
import { LoginFormData } from "../types";

const initState = {
  username: "",
  password: "",
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
];

const Login = () => {
  const { loading, login } = useLogin();

  const handleLogin = async ({ username, password }: LoginFormData) => {
    await login({ username, password });

  };

  return (
    <Form
      title="Login"
      subTitle="Welcome back! 👋"
      inputs={inputs}
      loading={loading}
      submit={handleLogin}
      initState={initState}
      cta="Login"
      link="/register"
      linkPrompt="Don't have an account?"
      linkText="Sign up"
    />
  );
};

export default Login;
