export const Button: React.FC<{
  type?: "button" | "submit" | "reset";
  children?: any;
}> = ({ type, children }) => {
  return (
    <button className="button" type={type}>
      {children}
    </button>
  );
};
