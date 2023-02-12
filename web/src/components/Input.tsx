export const FormInput: React.FC<{
  label?: string;
  type?: string;
  variant?: string;
}> = ({ label, type, variant = "light" }) => {
  return (
    <div className={`flex flex-column gap-2 input-wrapper ${variant}`}>
      <label htmlFor="">{label}</label>
      <input type={type || "text"} />
    </div>
  );
};
