const jwt = require("jsonwebtoken");

//generate new token
export const getToken = (id: string, refresh?: boolean) => {
  try {
    let token;
    if (!refresh) {
      token = jwt.sign({ id }, process.env.SECRET_ACCESS_TOKEN_JWT, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      });
    } else {
      token = jwt.sign({ id }, process.env.SECRET_REFRESH_TOKEN_JWT, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      });
    }
    return token;
  } catch (error) {
    console.error(`SOMETHING WENT WRONG ${error}`);
  }
};
