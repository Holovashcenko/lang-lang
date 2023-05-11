import { ButtonTypes, ButtonColors, ButtonSizes } from './types';

type Properties = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: ButtonTypes;
  color?: ButtonColors;
  size?: ButtonSizes;
  disabled?: boolean;
};

export const Button: React.FC<Properties> = ({
  children,
  onClick,
  className,
  type = ButtonTypes.Button,
  color = ButtonColors.Blue,
  size = ButtonSizes.Medium,
  disabled = false,
}) => {
  const buttonStyle = {
    backgroundColor: `var(--${color})`,
    fontSize: `var(--${size})`,
  };

  return (
    <button
      type={type}
      className={`px-3 py-1 text-white rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
