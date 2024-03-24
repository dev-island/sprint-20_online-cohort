import { FormControl, FormLabel, Input as CInput } from "@chakra-ui/react";
import { FC } from "react";

export type Props = {
  name: string;
  type?: string;
  label: string;
  value: string;
  isRequired?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  name,
  type = "text",
  label,
  value,
  onChange,
  isRequired,
}) => {
  return (
    <FormControl id={name} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <CInput name={name} value={value} onChange={onChange} type={type} />
    </FormControl>
  );
};

export default Input;
