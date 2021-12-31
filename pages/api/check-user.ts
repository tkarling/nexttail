// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSSRContext } from "aws-amplify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    res.status(200).json({ user });
  } catch (error) {
    console.log("🚀 ~ file: check-user.ts ~ line 14 ~ error", error);
    res.status(401).json({ error });
  }
}
