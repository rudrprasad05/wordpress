import React from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  name: String;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  name,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-3 items-center group w-full justify-center rounded-md bg-border shadow-sm px-4 py-2 ring-1 ring-inset ring-muted-foreground transition"
    >
      <Icon className="fill-primary" />
      <span className="block md:hidden text-sm">{name}</span>
    </button>
  );
};

export default AuthSocialButton;
