import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(userController.createUser);
router.route('/login').get(userController.loginUser);
router.route('/').get(userController.getAllUsers);


export default router;