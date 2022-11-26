import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";

import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    // goto recipes as that is the only page
    Router.push("/recipes");
  }, []);

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/recipes">Recipes</Link>
      </li>
    </ul>
  );
};

export default Home;
