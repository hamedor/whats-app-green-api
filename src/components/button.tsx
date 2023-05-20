interface ButtonProps {
  onClick: () => void;
  label?: string;
}

const Button = ({ onClick, label = "отправить" }: ButtonProps) => {
  return (
    <button
      className="hover"
      style={{
        backgroundColor: "#2a3942",
        border: "1px solid #2a3942",
        color: "#fff",
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "1rem",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
