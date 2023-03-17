import React, { MouseEventHandler } from "react";

export const Button: React.FC<{
  type?: "button" | "submit" | "reset";
  children?: any;
  variant?: string;
  handler?: MouseEventHandler;
}> = ({ type, children, variant, handler }) => {
  return (
    <button
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
}> = ({ children, handler, active, ...props }) => {
  return (
    <button className={`icon-c ${active}`} onClick={handler} {...props}>
      {children}
    </button>
  );
};
