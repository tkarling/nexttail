import React, { useState } from "react";
import useUser from "../lib/useUser";
import { Page } from "../components/Common";
import LoginForm from "../components/LoginForm";
import fetchJson, { FetchError } from "../lib/fetchJson";
import { KeyedMutator } from "swr";

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  mutateUser: KeyedMutator<any>,
  setErrorMsg: (msg: string) => void
) {
  event.preventDefault();

  const body = {
    username: event.currentTarget.username.value,
  };

  try {
    mutateUser(
      await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      false
    );
    setErrorMsg("");
  } catch (error) {
    if (error instanceof FetchError) {
      setErrorMsg(error.data.message);
    } else {
      console.error("An unexpected error happened:", error);
    }
  }
}

// auth from https://github.com/vvo/iron-session/tree/main/examples/next.js-typescript
export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/profile-sg",
    redirectIfFound: true,
  });
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Page>
      <LoginForm
        errorMessage={errorMsg}
        onSubmit={(event) => handleSubmit(event, mutateUser, setErrorMsg)}
      />
    </Page>
  );
}
