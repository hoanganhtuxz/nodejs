import express from 'express';
import { userById, isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { cateHome, update, list, create, categoryById, read, remove } from '../controllers/category';

const router = express.Router();
//list cate
router.get('/categoryList', list);
// cate home
router.get('/cateHome', cateHome)
/// detail cate
router.get('/category/:categoryId', read);
// add cate
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
// delete cate
router.delete('/category/delete/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
/// update cate

router.put('/category/update/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
///
router.param('userId', userById)
router.param('categoryId', categoryById)
module.exports = router;