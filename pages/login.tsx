import React, { useState } from "react";
import useUser, { login } from "../lib/useUser";
import { Page } from "../components/Page";
import LoginForm from "../components/LoginForm";

// auth from https://github.com/vvo/iron-session/tree/main/examples/next.js-typescript
export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { user, mutateUser } = useUser({
    redirectTo: "/profile-sg",
    redirectIfFound: true,
  });
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Page user={user}>
      <LoginForm
        errorMessage={errorMsg}
        onSubmit={(event) => login(event, mutateUser, setErrorMsg)}
      />
    </Page>
  );
}
