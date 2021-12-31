import type { NextApiRequest } from "next";
import { withSSRContext } from "aws-amplify";

export default function Protected({
  authenticated,
  username,
}: {
  authenticated: boolean;
  username?: string;
}) {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return <h1>Hello {username}</h1>;
}

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { props: { authenticated: true, username: user.username } };
  } catch (error) {
    if (error !== "The user is not authenticated") {
      console.error("Error: ", error);
    }
    return { props: { authenticated: false } };
  }
};
