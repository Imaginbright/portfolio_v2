import React from "react";

interface Props {
  className?: string;
  href?: string;
  children: React.ReactNode;
  px?: number;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  className,
  href,
  children,
  px,
  type = "button",
  ...rest
}: Props) => {
  const classes = `relative inline-flex items-center justify-center h-[3.375rem] font-mono shadow-sharp ${
    px || "px-7"
  } ${className || ""} 
  hover:null`;
  const spanClass = "relative z-10";

  const renderButton = () => (
    <button type={type} className={classes} {...rest}>
      <span className={spanClass}>{children}</span>
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes} {...rest}>
      <span className={spanClass}>{children}</span>
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
