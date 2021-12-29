import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export const Page: React.FC = ({ children }) => (
  <div className="w-full max-w-3xl mx-auto my-16 px-2">{children}</div>
);

export const PageTitle: React.FC = ({ children }) => <h1>{children}</h1>;

export const Spinner: React.FC = () => <div className="p-8">Loading...</div>;

export const Card: React.FC = ({ children }) => (
  <div className="p-8 mb-4 rounded shadow text-xl flex">{children}</div>
);

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button className="bg-indigo-500 text-white p-2 rounded" {...props}>
    {children}
  </button>
);

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  ...props
}) => <input className="w-full p-2" {...props} />;

export const ErrorMessage: React.FC = ({ children }) => (
  <div className="text-red-500">{children}</div>
);
