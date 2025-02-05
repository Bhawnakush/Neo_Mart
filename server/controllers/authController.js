import * as driver from '../neo4j/neo4j.js'; 
import setTokensCookies from '../utils/setTokenCookies.js';
import generateTokens from '../utils/generatetokens.js';
import refreshAccessToken from '../utils/refreshAcessToken.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
import dotenv from 'dotenv';
dotenv.config();

// Register a new user
export const registerController = async (req, res) => {

  const { name, email, password, confirmPassword } = req.body;
  
  // Check if all required fields are provided
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ status: "failed", message: "All fields are required" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ status: "failed", message: "Password and Confirm Password don't match" });
  }
  
  const session = driver.getDriver().session(); // Create a new session for Neo4j queries
 
  try {
      // Check if user already exists
      const result = await session.run(
        'MATCH (u:User) WHERE toLower(u.email) = toLower($email) RETURN u',
        { email }
      );

      if (result.records.length > 0) {
        return res.status(400).json({ status: "failed", message: 'User already exists' });
      }

      // Hash the password before storing it
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password,salt);

      // Create the new user in the database
      await session.run(
        'CREATE (u:User {id: $id, name: $name, email: toLower($email), password: $password})',
        { id: uuidv4(), name, email, password: hashedPassword }
      );


      res.status(201).json({
        status: "success",
        message: "User registered successfully",
      });

      console.log("User registered successfully");

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({status: "failed", message: "unable to Register, please try again later"});
  }finally {
    session.close(); // Close the session after use
  }
};


//User Login using acess token and refresh token

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({status: "failed", message: 'Email and password are required' });
  }

  const session = driver.getDriver().session(); // Create a new session for Neo4j queries
  try {
    // Fetch user by email
    const result = await session.run(
      'MATCH (u:User) WHERE toLower(u.email) = toLower($email) RETURN u',
      { email }
    );

    if (result.records.length === 0) {
      return res.status(404).json({ status: "failed", message: 'User not found' });
    }

    // Get user properties
    const user = result.records[0].get('u').properties;

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({status: "failed",  message: 'Invalid credentials' });
    }

    // Generate JWT token
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);

     // Set Cookies
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp)
    
    
    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name},
      status: "success",
      message: "Login successful",
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_exp: accessTokenExp,
    });

    console.log("User login succesful")

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: "failed", message: 'Error logging in' });
  } finally {
    session.close(); // Close the session after use
  }
};

//Get new acess token or refresh token 

export const  getNewAccessToken = async (req, res) => {
    try {
      // Get new access token using Refresh Token
      const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res)

      // Set New Tokens to Cookie
      setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp)

      res.status(200).send({
        status: "success",
        message: "New tokens generated",
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        access_token_exp: newAccessTokenExp
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failed", message: "Unable to generate new token, please try again later" });
    }
  }

    // Profile OR Logged in User
export const userProfile = async (req, res) => {
    res.send({ "user": req.user })
}


  //logout
export const userLogout = async (req, res) => {
  try {

    // Optionally, you can blacklist the refresh token in the database
    // const refreshToken = req.cookies.refreshToken;
    // await UserRefreshTokenModel.findOneAndUpdate(
    //   { token: refreshToken },
    //   { $set: { blacklisted: true } }
    // );

    //clear access token and refresh token cookies
    res.clearCookie('accesToken');
    res.clearCookie('refreshToken');
    res.clearCookie('is_auth');

    console.log("User logout successful")
    res.status(200).json({ status: "success", message: "Logout successful" });
    
  }catch(error){
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to logout, please try again later" });
  }
}
