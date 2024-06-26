import React, { MouseEventHandler } from "react";

export const Button: React.FC<{
  type?: "button" | "submit" | "reset";
  children?: any;
  variant?: string;
  handler?: MouseEventHandler;
  isDisabled?: boolean;
}> = ({ type = "button", children, variant, handler, isDisabled = false }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={handler}
      className={`btn ${variant || "b-primary"}`}
      type={type}
    >
      {children}
    </button>
  );
};

export const IconButton: React.FC<{
  children: React.ReactNode;
  handler?: MouseEventHandler;
  active?: string | null;
  className?: string;
}> = ({ children, handler, active = null, className = "", ...props }) => {
  return (
    <button
      className={`icon-c ${active && className} ${className}`}
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  );
};
