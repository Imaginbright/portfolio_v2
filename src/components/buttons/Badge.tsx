import Image from "next/image";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode | string; // Can be a URL string or a Component
  width: number;
  height: number;
  px?: string; // Changed to string to allow tailwind classes like "px-6"
}

const Badge = ({
  className,
  children,
  icon,
  width,
  height,
  px,
  type = "button",
  ...rest
}: Props) => {
  // Base classes with rounded-full for pill shape and flex for layout
  const classes = `
    relative inline-flex items-center justify-center 
    h-[33px] font-mono shadow-sharp rounded-full
    bg-gray-300 text-black border border-black 
    ${px || "px-3"} 
    ${className || ""}
  `;

  return (
    <button type={type} className={classes} {...rest}>
      {/* Icon Rendering Logic */}
      {icon && (
        <span className="mr-3 flex items-center justify-center">
          {typeof icon === "string" ? (
            <Image
              src={icon}
              width={width}
              height={height}
              alt=""
              className="w-5 h-5 object-contain"
            />
          ) : (
            icon
          )}
        </span>
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Badge;
