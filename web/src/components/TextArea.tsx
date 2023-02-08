export const TextArea: React.FC<{ variant?: string; label?: string }> = ({
  variant = "light",
  label,
}) => {
  return (
    <div className={`flex flex-column gap-2 input-wrapper ${variant}`}>
      <label htmlFor="">{label}</label>
      <textarea name=""></textarea>
    </div>
  );
};
