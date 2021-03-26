import express from 'express';
import { update, list, create, productById, read, remove } from '../controllers/product';
///
const router = express.Router();


// add product
router.post('/productAdd', create);
// list product
router.get('/productList', list);
// detail product
router.get('/product/:productId', read);
// update product
router.put('/productUpdate/:productId', update);
// delete product
router.delete('/productDelete/:productId', remove);
//param
router.param('productId', productById);


module.exports = router;