// Types
import { GetServerSideProps } from "next";
import { IUser } from "src/types";

// Auth
import decodeToken from "./decode-token";

// Functions
import { getUser } from "src/functions";
import { isStaff } from "src/functions";

/**
 * @param {object} context
 * @param {string} redirectDestination - the url to redirect to if the auth doesn't pass
 */
const checkAuth: GetServerSideProps = async (
  context,
  redirectDestination = "/"
) => {
  const cookie = context.req.headers.cookie;

  const redirectOBJ = {
    redirect: {
      destination: redirectDestination,
      permanent: false,
    },
  };

  if (!cookie) return redirectOBJ;

  const token = cookie.split("=")[1];
  const decodedToken = decodeToken(token);

  try {
    const isValidRes = (await getUser(decodedToken.id, token)) as unknown as {
      user: IUser;
    };

    const { user } = isValidRes;

    if (isStaff(user.role))
      return {
        props: {},
      };

    return redirectOBJ;
  } catch (err) {
    return redirectOBJ;
  }
};

export default checkAuth;
