import React, { ForwardedRef } from "react";

interface IFormTextAreaProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "value"> {
  label?: string;
  value?: any;
  variant?: string;
  render?: (props: any) => JSX.Element;
}

export const TextArea = React.forwardRef(
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
    }: IFormTextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className={`flex flex-column gap-2 input-wrapper ${variant}`}>
        <label htmlFor="">{label}</label>
        <textarea
          value={value}
          name={name}
          id={name}
          required={required ? true : false}
          {...props}
          onChange={onChange}
          ref={ref}
        ></textarea>
      </div>
    );
  }
);
