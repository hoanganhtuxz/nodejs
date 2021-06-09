import express from 'express';
import { prHome, image, update, list, create, productById, read, remove, prblog } from '../controllers/product';
import { userById, isAdmin, isAuth, requireSignin } from '../controllers/auth'

const router = express.Router();


// add product
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
// list product
router.get('/products', list);
/// image
router.get('/productList/image/:productId', image);
// detail product
router.get('/product/:productId', read);
// product home 
router.get('/productHome', prHome)
///
router.get('/productBlog', prblog)
// update product
router.put('/product/update/:productId/:userId', requireSignin, isAuth, isAdmin, update);
// delete product
router.delete('/product/delete/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
//param
router.param('userId', userById)
router.param('productId', productById);

module.exports = router;