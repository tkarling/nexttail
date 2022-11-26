import { KeyedMutator } from "swr";
import { logout } from "../lib/useUser";
import { User } from "../pages/api/user";
import { Button } from "./Common";

export const Page: React.FC<{
  user?: User;
  mutateUser?: KeyedMutator<any>;
}> = ({ children, user, mutateUser }) => (
  <div className="w-full max-w-3xl mx-auto my-6 md:my-16 px-4">
    <header className="flex justify-end">
      {user?.isLoggedIn && mutateUser && (
        <Button
          color="secondary"
          onClick={(event) => logout(event, mutateUser)}
        >
          Logout
        </Button>
      )}
    </header>
    {children}
  </div>
);
