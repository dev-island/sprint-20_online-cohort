import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import * as api from "../api/auth";
import getErrorMessage from "../utils/getErrorMessage";
import { RegisterFormData } from "../types";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown | null>(null);

  const register = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    setLoading(true);
    try {
      const res = await api.register({ username, password, confirmPassword });
      setData(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("failed to register", err);
      const error = getErrorMessage(err);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        isClosable: true,
      });
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error, toast]);

  return { loading, error, data, register };
};

export default useRegister;
