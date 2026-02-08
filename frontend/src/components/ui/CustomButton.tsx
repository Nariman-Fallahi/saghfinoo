import React from "react";
import { Button, ButtonProps } from "@heroui/button";

const CustomButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Button
      className={`text-tiny h-8 min-w-16 md:min-w-20 md:h-10 md:text-small ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
