export const Loader: React.FC<{ width?: string; height?: string }> = ({
  width = "35px",
  height = "35px",
}) => {
  return (
    <span style={{ width, height }} className="loader align-self-center"></span>
  );
};
