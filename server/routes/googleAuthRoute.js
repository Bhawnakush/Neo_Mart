// routes/authRoutes.js
import express from 'express';
const router = express.Router();
import {googleAuth,googleAuthCallback,logout, protectedRoute, googleAuthFailure, usercontact } from '../controllers/googleAuthController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);

router.get('/protected', isLoggedIn, protectedRoute);
router.get('/contact', usercontact);
router.get('/logout', logout);
router.get('/google/failure', googleAuthFailure);

export default router
