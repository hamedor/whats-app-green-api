import { Dispatch, SetStateAction } from "react";

interface InputProps {
  setValue: Dispatch<SetStateAction<string>>;
  name: string;
}

const Input = ({ setValue, name }: InputProps) => {
  return (
    <input
      style={{
        backgroundColor: "#202c33",
        color: "#fff",
        width: "100%",
        height: "2.6rem",
        fontSize: "1.2rem",
        paddingLeft: "1rem",
        border: "none",
        outline: "none",
        borderTopLeftRadius: "1rem",
        borderBottomLeftRadius: "1rem",
      }}
      onChange={(e) =>
        setValue(
          name === "number" ? String(Number(e.target.value)) : e.target.value
        )
      }
      type="text"
      placeholder={name}
    ></input>
  );
};

export default Input;
