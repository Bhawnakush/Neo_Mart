import express from 'express';
const router = express.Router();
import passport from 'passport'

import { login, registerController , getNewAccessToken, userProfile, userLogout} from '../controllers/authController.js';
import { loginValidation, signupValidation } from '../middlewares/authMiddleware.js';
import accessTokenAutoRefresh from '../middlewares/aceessTokenAutoRefresh.js';

//public routes
router.post('/signup/',signupValidation, registerController)
// router.post('/verify-email', verifyEmail)
router.post('/login',loginValidation, login)
router.post('/refresh-token', getNewAccessToken)

//protected Routes

router.get('/profile', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), userProfile)
router.post('/logout', accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), userLogout)

export default router;