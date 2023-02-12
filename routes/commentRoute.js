import express from 'express';
import * as commentController from '../controllers/commentController.js';

const router = express.Router();

router.route('/').post(commentController.createComment);
router.route('/').get(commentController.getAllComments);


export default router;