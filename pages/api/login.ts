import type { User } from "./user";

// import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
// const octokit = new Octokit();

export default withIronSessionApiRoute(loginRoute, sessionOptions);
const NAMES = ["tkarling", "amyllykoski"];

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;

  try {
    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username });
    if (!NAMES.includes(username)) {
      throw new Error("cannot login");
    }
    const user = { isLoggedIn: true, login: username } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    if (req.session.user) {
      req.session.user = {
        isLoggedIn: false,
        login: "",
      } as User;
      await req.session.save();
    }

    res.status(500).json({ message: (error as Error).message });
  }
}
