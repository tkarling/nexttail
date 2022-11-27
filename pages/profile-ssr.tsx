import React from "react";
import { Page } from "../components/Page";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import type { User } from "../pages/api/user";

import { InferGetServerSidePropsType } from "next";
import { ServerResponse } from "http";

export default function SsrProfile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page user={user}>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{" "}
        <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">
          Server-side Rendering (SSR)
        </a>{" "}
        and{" "}
        <a href="https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering">
          getServerSideProps
        </a>
      </h2>

      {user?.isLoggedIn && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </Page>
  );
}

const gotoLogin = ({ res }: { res: ServerResponse }) => {
  res.setHeader("location", "/login");
  res.statusCode = 302;
  res.end();
  return {
    props: {
      user: { isLoggedIn: false, login: "" } as User,
    },
  };
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (!user?.isLoggedIn) {
    return gotoLogin({ res });
  }

  return {
    props: { user },
  };
},
sessionOptions);
