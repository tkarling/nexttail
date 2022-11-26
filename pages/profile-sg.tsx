import React from "react";
import { Page } from "../components/Page";
import useUser from "../lib/useUser";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function SgProfile() {
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });

  return (
    <Page user={user} mutateUser={mutateUser}>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{" "}
        <a href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
          Static Generation (SG)
        </a>{" "}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        and the <a href="/api/user">/api/user</a> route (using{" "}
        <a href="https://github.com/vercel/swr">vercel/SWR</a>)
      </h2>
      {user && (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </Page>
  );
}
