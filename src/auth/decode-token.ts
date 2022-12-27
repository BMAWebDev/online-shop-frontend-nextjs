import jwt from "jsonwebtoken";

import { IDecodedToken } from "src/types";

const decodeToken = (token: string): IDecodedToken => {
  return jwt.decode(token) as IDecodedToken;
};

export default decodeToken;
