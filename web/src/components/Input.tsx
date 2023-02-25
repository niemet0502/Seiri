import React, { ForwardedRef } from "react";

interface IFormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  label?: string;
  value?: any;
  variant?: string;
  render?: (props: any) => JSX.Element;
}

export const FormInput = React.forwardRef(
  (
    {
      label,
      value,
      onChange,
      required,
      name,
      variant = "light",
      type = "text",
      ...props
    }: IFormInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={`flex flex-column gap-2 input-wrapper ${variant}`}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          required={required ? true : false}
          {...props}
          onChange={onChange}
          ref={ref}
        />
      </div>
    );
  }
);
