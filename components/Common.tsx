import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export const bgColor = {
  PRIMARY: "bg-sky-500",
  SECONDARY: "bg-gray-500",
  DANGER: "bg-red-500",
};

export const borderColor = {
  PRIMARY: "border-sky-500",
  SECONDARY: "border-gray-500",
  DANGER: "border-red-500",
};

export const Page: React.FC = ({ children }) => (
  <div className="w-full max-w-3xl mx-auto my-16 px-2">{children}</div>
);

export const PageTitle: React.FC = ({ children }) => <h1>{children}</h1>;

export const Spinner: React.FC = () => <div className="p-8">Loading...</div>;

export const Card: React.FC = ({ children }) => (
  <div className="p-2 rounded shadow text-xl flex-col">{children}</div>
);

export const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { color?: string }
> = ({ children, color, ...props }) => {
  const myBgColor =
    color === "danger"
      ? `${bgColor.DANGER}`
      : color === "secondary"
      ? `${bgColor.SECONDARY}`
      : `${bgColor.PRIMARY}`;
  return (
    <button
      className={`${myBgColor} text-white px-2 pb-1 rounded-xl text-base`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...props
}) => <input className="w-full p-2" {...props} />;

export const Checkbox: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-sky-500 checked:border-sky-500 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer text-white`}
      type="checkbox"
      {...props}
    />
  );
};

export const ErrorMessage: React.FC = ({ children }) => (
  <div className="text-red-500">{children}</div>
);
