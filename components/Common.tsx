export const Page: React.FC = ({ children }) => (
  <div className="w-full max-w-3xl mx-auto my-16 px-2">{children}</div>
);

export const PageTitle: React.FC = ({ children }) => <h1>{children}</h1>;

export const Card: React.FC = ({ children }) => (
  <div className="p-8 h-40 mb-4 rounded shadow text-xl flex">{children}</div>
);
