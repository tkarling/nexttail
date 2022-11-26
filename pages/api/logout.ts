import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = {
    isLoggedIn: false,
    login: "",
  } as User;
  if (req.session.user?.isLoggedIn) {
    req.session.user = user;
    await req.session.save();
  }

  res.json({ user });
}
