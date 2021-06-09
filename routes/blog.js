import express from 'express';
import { userById, isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { blogHome, image, update, list, create, blogById, read, remove } from '../controllers/blog';

///
const router = express.Router();


// add blog
router.post('/blog/create/:userId', requireSignin, isAuth, isAdmin, create);
// list blog
router.get('/blogList', list);
// image blog
router.get('/blogList/image/:blogId', image);
// detail blog
router.get('/blog/:blogId', read);
// blog homepage
router.get('/blogHompage', blogHome)
// update blog
router.put('/blog/update/:blogId/:userId', requireSignin, isAuth, isAdmin, update);
// delete blog
router.delete('/blog/delete/:blogId/:userId', requireSignin, isAuth, isAdmin, remove);
//param
router.param('userId', userById)
router.param('blogId', blogById);

module.exports = router;