import express from 'express';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

router.route('/').post(blogController.createBlog);
router.route('/').get(blogController.getAllBlogs);
router.route('/update/:id').get(blogController.updateBlog);
router.route('/:id', blogController.getById);

export default router;