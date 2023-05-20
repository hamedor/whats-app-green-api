import Input from "./input";
import Button from "./button";
import { useRef } from 'react';
import { Dispatch, SetStateAction } from "react";

interface FormProps {
  name: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClick: () => void;
}

const Form = ({ setValue, name, onClick }: FormProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleClick = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
        onClick();
      }

  return (
    <form  ref={formRef} style={{ width: "100%", display: "flex", marginTop: "0.48rem" }}>
      <Input setValue={setValue} name={name} />
      <Button onClick={handleClick} />
    </form>
  );
};

export default Form;
