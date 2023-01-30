export const Button: React.FC<{
  type?: "button" | "submit" | "reset";
  children?: any;
  variant?: string;
}> = ({ type, children, variant }) => {
  return (
    <button className={`button ${variant || "b-primary"}`} type={type}>
      {children}
    </button>
  );
};
