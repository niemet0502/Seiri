export const SearchInput: React.FC<{ label?: string; type?: string }> = ({
  label,
  type,
}) => {
  return (
    <div className="flex flex-column gap-2 input-wrapper">
      <label htmlFor="">{label}</label>
      <input type={type || "text"} />
    </div>
  );
};
