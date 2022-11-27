import { KeyedMutator } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "../lib/useUser";
import type { User } from "../pages/api/user";
import { Button } from "./Common";

export const Page: React.FC<{
  user?: User;
  mutateUser?: KeyedMutator<User>;
}> = ({ children, user, mutateUser }) => {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  return (
    <div className="w-full max-w-3xl mx-auto my-6 md:my-16 px-4">
      {!isLoginPage && user && (
        <header className="flex justify-end">
          {user?.isLoggedIn ? (
            <>
              {mutateUser ? (
                <Button
                  color="secondary"
                  onClick={(event) => logout(event, mutateUser)}
                >
                  Logout
                </Button>
              ) : null}
            </>
          ) : (
            <Button color="primary" onClick={() => {}}>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </header>
      )}
      {children}
    </div>
  );
};
