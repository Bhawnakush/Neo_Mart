// import UserModel from "../models/User.js";
import { getRefreshTokenbyUId }from "../models/UserRefreshToken.js";
import { findUserById } from "../neo4j/DBQuery.js";
import generateTokens from "./generatetokens.js";
import verifyRefreshToken from "./verifyRefreshToken.js";

const refreshAccessToken = async (req, res) => {
  try {

    //get token from cookie
    const oldRefreshToken = req.cookies.refreshToken;
    // Verify Refresh Token is valid or not in db
    console.log("oldret", oldRefreshToken)
    const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken)

    if (error) {
      return res.status(401).send({ status: "failed", message: "Invalid refresh token" });
    }
    // Find User based on old Refresh Token detail id in db
    const user = await findUserById(tokenDetails.id)

    if (!user) {
      return res.status(404).send({ status: "failed", message: "User not found" });
    }

    //get  from db from user id 
    const userRefreshToken = await getRefreshTokenbyUId(tokenDetails.id)
    console.log('oldrt', oldRefreshToken)
    console.log('newrt', userRefreshToken)
    if (oldRefreshToken !== userRefreshToken) {
      return res.status(401).send({ status: "failed", message: "Unauthorized access" });
    }

    // Generate new access and refresh tokens
    console.log(user);
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp
    };

  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "failed", message: "Internal server error" });
  }
}

export default refreshAccessToken