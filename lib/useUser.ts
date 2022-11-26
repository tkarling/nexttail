import React, { useEffect } from "react";
import Router from "next/router";
import useSWR, { KeyedMutator } from "swr";
import fetchJson, { FetchError } from "../lib/fetchJson";
import type { User } from "../pages/api/user";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>(
    "/api/user",
    fetchJson
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

const LOGOUT_URL = "/api/logout";
export async function logout(
  event: React.MouseEvent,
  mutateUser: KeyedMutator<User>
) {
  try {
    mutateUser(
      await fetchJson(LOGOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
      false
    );
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
}

const LOGIN_URL = "/api/login";
export async function login(
  event: React.FormEvent<HTMLFormElement>,
  mutateUser: KeyedMutator<User>,
  setErrorMsg?: (msg: string) => void
) {
  event.preventDefault();

  const username = event.currentTarget.username.value;
  const body = username ? { username } : undefined;
  try {
    mutateUser(
      await fetchJson(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      }),
      false
    );
    setErrorMsg?.("");
  } catch (error) {
    if (error instanceof FetchError) {
      setErrorMsg?.(error.data.message);
    } else {
      console.error("An unexpected error happened:", error);
    }
  }
}
