
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import { findUserByEmail , createUser} from '../neo4j/DBQuery.js';
import generateTokens from '../utils/generatetokens.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback",
//   passReqToCallback: true,
// },
//   async (req, accessToken, refreshToken, profile, done) => {
//     try {
//       // Check if user already exists in the database
//       console.log(profile)
//       console.log(accessToken)
//       const email = profile._json.email
//       let user = await findUserByEmail(email);

//       if (!user) {
//         const lastSixDigitsID = profile.id.substring(profile.id.length - 6);
//         const lastTwoDigitsName = profile._json.name.substring(profile._json.name.length - 2);
//         const newPass = lastTwoDigitsName + lastSixDigitsID
//         // Generate salt and hash password
//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashedPassword = await bcrypt.hash(newPass, salt);

//         user = await createUser(
//           profile.id,
//           profile._json.name,
//           profile._json.email,
//           hashedPassword
//         );
//       }
//       // Generate JWT tokens
//       const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
//       return done(null, {user, accessToken, refreshToken, accessTokenExp, refreshTokenExp });
//     }catch (error) {
//         console.log(error);
//         return done(error)
//     }
//   }
// ));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  accessType: 'offline', // Required for refresh token
  passReqToCallback: true,
},
(req, accessToken, refreshToken, profile, done) => {
  // Store the accessToken to access the People API later
  console.log(accessToken);
  const user = {
    profile: profile,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return done(null, {profile, accessToken, refreshToken});
}));

// Serialize user to session
passport.serializeUser((user, done) => {
done(null, user); // Store googleId in session
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
  // Fetch user from Neo4j using googleId
 done(null, user);
});